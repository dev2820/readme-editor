import { Node, mergeAttributes } from '@tiptap/core';
import { nanoid } from 'nanoid';

export const Paragraph = Node.create({
  name: 'paragraph',

  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: 'block',

  content: 'inline*',

  addAttributes() {
    return {
      'data-id': {
        default: '',
        rendered: false,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'p' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    node.attrs['data-id'] = nanoid();

    return [
      'p',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-id': node.attrs['data-id'],
        'data-type': this.name,
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setParagraph:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-0': () => this.editor.commands.setParagraph(),
    };
  },
});
