import { InputRule, Node, mergeAttributes } from '@tiptap/core';
import { nanoid } from 'nanoid';

import { DetailsContent } from './details-content';
import { DetailsSummary } from './details-summary';

export const inputRegex = /^\s*>\s$/;
/**
 * TODO: summary, details의 placeholder를 씌워줘야함
 * summary enter시 다음 줄로 개행 필요
 */
export const Details = Node.create({
  name: 'details',

  addOptions() {
    return {
      HTMLAttributes: {},
      summaryTypeName: 'detailsSummary',
      contentTypeName: 'detailsContent',
    };
  },

  group: 'block',

  addAttributes() {
    return {
      open: {
        default: true,
        parseHTML: (element) => element.getAttribute('data-open'),
        renderHTML: (attributes) => ({
          'data-open': attributes.open,
        }),
      },
      'data-id': {
        default: '',
        rendered: false,
      },
    };
  },
  addCommands() {
    return {
      insertDetails:
        () =>
        ({ commands }) => {
          commands.insertContent({
            type: this.name,
            content: [
              {
                type: DetailsSummary.name,
              },
              {
                type: DetailsContent.name,
                content: [
                  {
                    type: 'paragraph',
                  },
                ],
              },
            ],
          });

          return true;
        },
    };
  },

  content: 'detailsSummary detailsContent',
  isolating: true,

  parseHTML() {
    return [{ tag: 'details', priority: 51 }];
  },

  renderHTML({ node, HTMLAttributes }) {
    node.attrs['data-id'] = nanoid();

    return [
      'div',
      mergeAttributes(
        this.options.HTMLAttributes,
        HTMLAttributes,
        {
          'data-id': node.attrs['data-id'],
          'data-type': this.name,
        },
        {
          open: node.attrs.open ? true : null,
        },
      ),
      ['button', 'toggle'],
      ['div', {}, 0],
    ];
  },

  // addNodeView() {
  //   return ({ node, HTMLAttributes, getPos, editor }) => {
  //     const $details = document.createElement('details');
  //     const $summary = document.createElement('summary');
  //     // const $content = document.createElement('div');

  //     $details.addEventListener('toggle', () => {
  //       const { open } = $details;

  //       if (editor.isEditable && typeof getPos === 'function') {
  //         editor
  //           .chain()
  //           .focus(undefined, { scrollIntoView: true })
  //           .command(({ tr }) => {
  //             const position = getPos();
  //             const currentNode = tr.doc.nodeAt(position);

  //             tr.setNodeMarkup(position, undefined, {
  //               ...currentNode?.attrs,
  //               open,
  //             });

  //             return true;
  //           })
  //           .run();
  //       }
  //     });

  //     // $summary.addEventListener('click', (event) => {
  //     //   event.preventDefault();
  //     // });

  //     Object.entries(this.options.HTMLAttributes).forEach(([key, value]) => {
  //       $details.setAttribute(key, value);
  //     });

  //     $details.dataset.open = node.attrs.open;
  //     if (node.attrs.open) {
  //       $details.setAttribute('open', 'true');
  //     }

  //     $details.append($summary);

  //     Object.entries(HTMLAttributes).forEach(([key, value]) => {
  //       $details.setAttribute(key, value);
  //     });

  //     return {
  //       dom: $details,
  //       contentDom: $summary,
  //       update: (updatedNode) => {
  //         if (updatedNode.type !== this.type) {
  //           return false;
  //         }

  //         $details.dataset.open = updatedNode.attrs.open;
  //         if (updatedNode.attrs.open) {
  //           $details.setAttribute('open', 'true');
  //         } else {
  //           $details.removeAttribute('open');
  //         }

  //         return true;
  //       },
  //     };
  //   };
  // },

  addInputRules() {
    return [
      new InputRule({
        find: inputRegex,
        handler: ({ range, chain, state }) => {
          const parentType = state.selection.$cursor.parent.type.name;
          if (parentType === DetailsSummary.name) {
            return;
          }
          chain().deleteRange(range).insertDetails().focus(range.from).run();
        },
      }),
    ];
  },
});
