import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';
import { Plugin } from '@tiptap/pm/state';
import { nanoid } from 'nanoid';

import * as ImageStorage from '@/utils/storage';

export const inputRegex =
  /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

/**
 * TODO: Image를 리액트로 삽입하는 코드 작성
 * 이미지를 업로드할 수 있다.
 * 이미지가 업로드 되면 업로드된 이미지를 보여준다.
 * 이미지의 크기를 조절할 수 있다.
 * <img> 태그로 export된다. (혹은 figure?)
 * <p>로 감싸서 export된다. (align이 가능하도록)
 *
 * 참조: https://tiptap.dev/docs/editor/guide/node-views/react
 */
export const InternalImage = Node.create({
  name: 'internalImage',

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? 'inline' : 'block';
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      'data-id': {
        default: '',
        rendered: false,
      },
      'data-image-key': {
        default: '',
        rendered: true,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: this.options.allowBase64
          ? 'img[src]'
          : 'img[src]:not([src^="data:"])',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    node.attrs['data-id'] = nanoid();

    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-id': node.attrs['data-id'],
        'data-type': this.name,
      }),
    ];
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title] = match;

          return { src, alt, title };
        },
      }),
    ];
  },

  addProseMirrorPlugins() {
    // Thanks to
    // https://github.com/ueberdosis/tiptap/issues/2912#issuecomment-1169631614
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            drop(view, event) {
              const hasFiles =
                event.dataTransfer &&
                event.dataTransfer.files &&
                event.dataTransfer.files.length;

              if (!hasFiles) {
                return;
              }

              const images = Array.from(event.dataTransfer.files).filter(
                (file) => /image/i.test(file.type),
              );

              if (images.length === 0) {
                return;
              }

              event.preventDefault();

              images.forEach((image) => {
                const imageKey = Date.now() + image.name;
                // 이미지를 다운로드할 수 있게 업로드한다.
                ImageStorage.uploadImage(imageKey, image);

                const _URL = window.URL || window.webkitURL;
                const url = _URL.createObjectURL(image);
                const { schema } = view.state;
                const coordinates = view.posAtCoords({
                  left: event.clientX,
                  top: event.clientY,
                });
                const node = schema.nodes.internalImage.create({
                  src: url,
                  alt: image.name,
                  title: image.name,
                  'data-image-key': imageKey,
                });
                const transaction = view.state.tr.insert(coordinates.pos, node);
                view.dispatch(transaction);
              });
            },
            paste(view, event) {
              const hasFiles =
                event.clipboardData &&
                event.clipboardData.files &&
                event.clipboardData.files.length;

              if (!hasFiles) {
                return;
              }

              const images = Array.from(event.clipboardData.files).filter(
                (file) => /image/i.test(file.type),
              );

              if (images.length === 0) {
                return;
              }

              event.preventDefault();

              images.forEach((image) => {
                const imageKey = Date.now() + image.name;
                // 이미지를 다운로드할 수 있게 업로드한다.
                ImageStorage.uploadImage(imageKey, image);

                const _URL = window.URL || window.webkitURL;
                const url = _URL.createObjectURL(image);
                const { schema } = view.state;
                const node = schema.nodes.internalImage.create({
                  src: url,
                  alt: image.name,
                  title: image.name,
                  'data-image-key': imageKey,
                });
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
              });
            },
          },
        },
      }),
    ];
  },
});
