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
      ['button', '▶'],
      ['div', {}, 0],
    ];
  },

  addNodeView() {
    return ({ HTMLAttributes, getPos, editor }) => {
      const $wrapper = document.createElement('div');
      const $toggle = document.createElement('button');
      const $content = document.createElement('div');

      Object.entries(this.options.HTMLAttributes).forEach(([key, value]) => {
        $wrapper.setAttribute(key, value);
      });

      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        $wrapper.setAttribute(key, value);
      });

      $toggle.addEventListener('click', () => {
        if (editor.isEditable && typeof getPos === 'function') {
          const isOpen = $wrapper.dataset.open === 'true';
          editor
            .chain()
            .focus(undefined, { scrollIntoView: true })
            .command(({ tr }) => {
              const position = getPos();
              const currentNode = tr.doc.nodeAt(position);
              tr.setNodeMarkup(position, undefined, {
                ...currentNode?.attrs,
                open: !isOpen,
              });

              return true;
            })
            .run();
        }
      });

      $toggle.textContent = '▼';
      $toggle.contentEditable = false;
      $wrapper.append($toggle, $content);

      $wrapper.setAttribute('data-id', nanoid());
      $wrapper.setAttribute('data-open', 'true');
      $wrapper.setAttribute('data-type', this.name);

      return {
        dom: $wrapper,
        contentDOM: $content,
        update: (updatedNode) => {
          if (updatedNode.type !== this.type) {
            return false;
          }
          const content = $content.querySelector(
            '[data-type="detailsContent"]',
          );
          if (updatedNode.attrs.open) {
            $wrapper.setAttribute('data-open', 'true');
            $toggle.textContent = '▼';
            content.contentEditable = true;
          } else {
            $wrapper.removeAttribute('data-open');
            $toggle.textContent = '▶';
            content.contentEditable = false;
          }

          return true;
        },
      };
    };
  },

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
