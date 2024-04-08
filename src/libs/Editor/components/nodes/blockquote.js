import { Node, mergeAttributes, wrappingInputRule } from '@tiptap/core';
import { nanoid } from 'nanoid';

export const inputRegex = /^\s*>\s$/;

export const Blockquote = Node.create({
  name: 'blockquote',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: 'block+',

  group: 'block',

  defining: true,

  addAttributes() {
    return {
      'data-id': {
        default: '',
        rendered: false,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'blockquote' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    node.attrs['data-id'] = nanoid();

    return [
      'blockquote',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-id': node.attrs['data-id'],
        'data-type': this.name,
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setBlockquote:
        () =>
        ({ commands }) => {
          return commands.wrapIn(this.name);
        },
      toggleBlockquote:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name);
        },
      unsetBlockquote:
        () =>
        ({ commands }) => {
          return commands.lift(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-b': () => this.editor.commands.toggleBlockquote(),
    };
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },
});
