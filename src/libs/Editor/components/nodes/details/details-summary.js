import { Node, mergeAttributes } from '@tiptap/core';
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
});
