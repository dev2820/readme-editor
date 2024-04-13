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

  content: 'block*',

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
      Enter: ({ editor }) => {
        console.log('enter', editor.view.state.selection.empty);
        if (editor.view.state.selection.empty) {
          editor.chain().focus().createParagraphNear().run();
        }
      },
      Backspace: () => {
        console.log('backspace');
        const { empty, $anchor } = this.editor.state.selection;
        const isAtStart = $anchor.pos === 1;

        if (!empty || $anchor.node(-1).type.name !== this.name) {
          return false;
        }

        if (
          isAtStart ||
          ($anchor.node(-1).childCount === 1 &&
            !$anchor.parent.textContent.length)
        ) {
          return this.editor
            .chain()
            .deleteNode($anchor.node(-1).type)
            .focus($anchor.pos - 2)
            .insertContent({ type: 'paragraph' })
            .run();
        }

        return false;
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(AlertComponent);
  },
});
