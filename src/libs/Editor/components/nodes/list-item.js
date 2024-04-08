import { Node, mergeAttributes } from '@tiptap/core';
import { nanoid } from 'nanoid';

export const ListItem = Node.create({
  name: 'listItem',

  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: 'bulletList',
      orderedListTypeName: 'orderedList',
      taskListTypeName: 'taskList',
    };
  },

  content: 'paragraph block*',

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
    return [
      {
        tag: 'li',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    node.attrs['data-id'] = nanoid();

    return [
      'li',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-id': node.attrs['data-id'],
        'data-type': this.name,
      }),
      0,
    ];
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      'Shift-Tab': () => this.editor.commands.liftListItem(this.name),
    };
  },
});
