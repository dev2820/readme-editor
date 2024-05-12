import { Node, NodePos, mergeAttributes } from '@tiptap/core';
import { nanoid } from 'nanoid';

export const DetailsSummary = Node.create({
  name: 'detailsSummary',

  addOptions() {
    return {
      HTMLAttributes: {},
      detailsTypeName: 'details',
    };
  },

  group: 'block',

  content: 'inline*',

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
        tag: 'summary',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    node.attrs['data-id'] = nanoid();
    return [
      'summary',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-id': node.attrs['data-id'],
        'data-type': this.name,
      }),
      0,
    ];
  },

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        /**
         * FIXME: split을 통해 summary의 내용이 content로 갈 수 있게 만들 수 있을까?
         */
        const cursor = editor.state.selection.$cursor;

        if (cursor.parent.type.name !== this.name) return false;

        const nodePos = new NodePos(cursor, editor);
        const detail = nodePos.parent.node;
        if (detail.attrs.open) {
          editor.commands.focus(nodePos.after.resolvedPos.pos);
        } else {
          editor.commands.insertContentAt(nodePos.parent.to, {
            type: 'paragraph',
          });
        }
        return true;
      },
    };
  },
});
