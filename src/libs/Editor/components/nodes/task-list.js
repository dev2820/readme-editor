import { Node, mergeAttributes } from '@tiptap/core';
import { nanoid } from 'nanoid';

export const TaskList = Node.create({
  name: 'taskList',

  addOptions() {
    return {
      itemTypeName: 'taskItem',
      HTMLAttributes: {},
    };
  },

  group: 'block list',

  addAttributes() {
    return {
      'data-id': {
        default: '',
        rendered: false,
      },
    };
  },

  content() {
    return `${this.options.itemTypeName}+`;
  },

  parseHTML() {
    return [
      {
        tag: `ul[data-type="${this.name}"]`,
        priority: 51,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    node.attrs['data-id'] = nanoid();

    return [
      'ul',
      mergeAttributes(
        this.options.HTMLAttributes,
        HTMLAttributes,
        {
          'data-type': this.name,
        },
        {
          'data-id': node.attrs['data-id'],
        },
      ),
      0,
    ];
  },

  addCommands() {
    return {
      toggleTaskList:
        () =>
        ({ commands }) => {
          return commands.toggleList(this.name, this.options.itemTypeName);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-9': () => this.editor.commands.toggleTaskList(),
    };
  },
});
