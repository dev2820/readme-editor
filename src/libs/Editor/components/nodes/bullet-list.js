import { Node, mergeAttributes, wrappingInputRule } from '@tiptap/core';
import { nanoid } from 'nanoid';

import { ListItem } from './list-item';
import { TextStyle } from './text-style';

export const inputRegex = /^\s*([-+*])\s$/;

export const BulletList = Node.create({
  name: 'bulletList',

  addOptions() {
    return {
      itemTypeName: 'listItem',
      HTMLAttributes: {},
      keepMarks: false,
      keepAttributes: false,
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
    return [{ tag: 'ul' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    node.attrs['data-id'] = nanoid();

    return [
      'ul',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-id': node.attrs['data-id'],
        'data-type': 'bullet-list',
      }),
      0,
    ];
  },

  addCommands() {
    return {
      toggleBulletList:
        () =>
        ({ commands, chain }) => {
          if (this.options.keepAttributes) {
            return chain()
              .toggleList(
                this.name,
                this.options.itemTypeName,
                this.options.keepMarks,
              )
              .updateAttributes(
                ListItem.name,
                this.editor.getAttributes(TextStyle.name),
              )
              .run();
          }
          return commands.toggleList(
            this.name,
            this.options.itemTypeName,
            this.options.keepMarks,
          );
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-8': () => this.editor.commands.toggleBulletList(),
    };
  },

  addInputRules() {
    let inputRule = wrappingInputRule({
      find: inputRegex,
      type: this.type,
    });

    if (this.options.keepMarks || this.options.keepAttributes) {
      inputRule = wrappingInputRule({
        find: inputRegex,
        type: this.type,
        keepMarks: this.options.keepMarks,
        keepAttributes: this.options.keepAttributes,
        getAttributes: () => {
          return this.editor.getAttributes(TextStyle.name);
        },
        editor: this.editor,
      });
    }
    return [inputRule];
  },
});
