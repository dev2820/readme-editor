import { Node, mergeAttributes } from '@tiptap/core';
import { nanoid } from 'nanoid';

export const DetailsContent = Node.create({
  name: 'detailsContent',

  addOptions() {
    return {
      HTMLAttributes: {},
      detailsTypeName: 'details',
    };
  },

  group: 'block',

  content() {
    return 'block+';
  },

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
        tag: `div`,
        priority: 51,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    node.attrs['data-id'] = nanoid();

    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-id': node.attrs['data-id'],
        'data-type': this.name,
      }),
      0,
    ];
  },
});
