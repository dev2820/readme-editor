import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { nanoid } from 'nanoid';

import { Alert as AlertComponent } from './Alert.jsx';

export const Alert = Node.create({
  name: 'alert',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: 'block+',

  group: 'block',

  defining: true,

  isolating: true,

  addAttributes() {
    return {
      alert: {
        default: 'note',
        parseHTML: (element) => element.getAttribute('data-alert'),
        renderHTML: (attributes) => ({
          'data-alert': attributes.alert,
        }),
      },
      'data-id': {
        default: '',
        rendered: false,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="alert"]' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    node.attrs['data-id'] = nanoid();

    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-id': node.attrs['data-id'],
        'data-type': this.name,
      }),
      ['p', {}, 'Note'],
      0,
    ];
  },

  addCommands() {
    return {
      setAlert:
        (alertType) =>
        ({ commands }) => {
          return commands.wrapIn(this.name, {
            alert: alertType,
          });
        },
      toggleAlert:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name);
        },
      unsetAlert:
        () =>
        ({ commands }) => {
          return commands.lift(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-b': () => this.editor.commands.toggleAlert(),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(AlertComponent);
  },
});
