import { Node, mergeAttributes, wrappingInputRule } from '@tiptap/core';
import { nanoid } from 'nanoid';

import { ListItem } from './list-item';
import { TextStyle } from './text-style';

export const inputRegex = /^(\d+)\.\s$/;

export const OrderedList = Node.create({
  name: 'orderedList',

  addOptions() {
    return {
      itemTypeName: 'listItem',
      HTMLAttributes: {},
      keepMarks: false,
      keepAttributes: false,
    };
  },

  group: 'block list',

  content() {
    return `${this.options.itemTypeName}+`;
  },

  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (element) => {
          return element.hasAttribute('start')
            ? parseInt(element.getAttribute('start') || '', 10)
            : 1;
        },
      },
      'data-id': {
        default: '',
        rendered: false,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'ol',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    node.attrs['data-id'] = nanoid();

    const { start, ...attributesWithoutStart } = HTMLAttributes;
    const idAttr = {
      'data-id': node.attrs['data-id'],
      'data-type': this.name,
    };
    return start === 1
      ? [
          'ol',
          mergeAttributes(
            this.options.HTMLAttributes,
            attributesWithoutStart,
            idAttr,
          ),
          0,
        ]
      : [
          'ol',
          mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, idAttr),
          0,
        ];
  },

  addCommands() {
    return {
      toggleOrderedList:
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
      'Mod-Shift-7': () => this.editor.commands.toggleOrderedList(),
    };
  },

  addInputRules() {
    let inputRule = wrappingInputRule({
      find: inputRegex,
      type: this.type,
      getAttributes: (match) => ({ start: +match[1] }),
      joinPredicate: (match, node) =>
        node.childCount + node.attrs.start === +match[1],
    });

    if (this.options.keepMarks || this.options.keepAttributes) {
      inputRule = wrappingInputRule({
        find: inputRegex,
        type: this.type,
        keepMarks: this.options.keepMarks,
        keepAttributes: this.options.keepAttributes,
        getAttributes: (match) => ({
          start: +match[1],
          ...this.editor.getAttributes(TextStyle.name),
        }),
        joinPredicate: (match, node) =>
          node.childCount + node.attrs.start === +match[1],
        editor: this.editor,
      });
    }
    return [inputRule];
  },
});
