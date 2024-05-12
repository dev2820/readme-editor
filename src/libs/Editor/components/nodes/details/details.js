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
    return [{ tag: 'details', priority: 1000 }];
  },

  renderHTML({ node, HTMLAttributes }) {
    node.attrs['data-id'] = nanoid();

    return [
      'details',
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
      0,
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

      $toggle.innerHTML = triangleDown;
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
            $toggle.innerHTML = triangleDown;
            content.contentEditable = true;
          } else {
            $wrapper.removeAttribute('data-open');
            $toggle.innerHTML = triangleRight;
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

const triangleDown = `<span style="pointer-events:none;">
<svg width="14" height="24" viewBox="0 -1 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 11L0.937822 0.5L13.0622 0.5L7 11Z" fill="black"/>
</svg>
</span>
`;
const triangleRight = `<span style="pointer-events:none;"><svg width="11" height="24" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.499998 0.937851L11 7.00003L0.499998 13.0622L0.499998 0.937851Z" fill="black"/>
</svg></span>
`;
