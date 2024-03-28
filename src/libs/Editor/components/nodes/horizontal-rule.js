import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';
import { NodeSelection, TextSelection } from '@tiptap/pm/state';
import { nanoid } from 'nanoid';

export const HorizontalRule = Node.create({
  name: 'horizontalRule',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: 'block',

  addAttributes() {
    return {
      'data-id': {
        default: '',
        rendered: false,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'hr' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    node.attrs['data-id'] = nanoid();

    return [
      'hr',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-id': node.attrs['data-id'],
      }),
    ];
  },

  addCommands() {
    return {
      setHorizontalRule:
        () =>
        ({ chain, state }) => {
          const { $to: $originTo } = state.selection;

          const currentChain = chain();

          if ($originTo.parentOffset === 0) {
            currentChain.insertContentAt(Math.max($originTo.pos - 2, 0), {
              type: this.name,
            });
          } else {
            currentChain.insertContent({ type: this.name });
          }

          return (
            currentChain
              // set cursor after horizontal rule
              .command(({ tr, dispatch }) => {
                if (dispatch) {
                  const { $to } = tr.selection;
                  const posAfter = $to.end();

                  if ($to.nodeAfter) {
                    if ($to.nodeAfter.isTextblock) {
                      tr.setSelection(
                        TextSelection.create(tr.doc, $to.pos + 1),
                      );
                    } else if ($to.nodeAfter.isBlock) {
                      tr.setSelection(NodeSelection.create(tr.doc, $to.pos));
                    } else {
                      tr.setSelection(TextSelection.create(tr.doc, $to.pos));
                    }
                  } else {
                    // add node after horizontal rule if it’s the end of the document
                    const node =
                      $to.parent.type.contentMatch.defaultType?.create();

                    if (node) {
                      tr.insert(posAfter, node);
                      tr.setSelection(
                        TextSelection.create(tr.doc, posAfter + 1),
                      );
                    }
                  }

                  tr.scrollIntoView();
                }

                return true;
              })
              .run()
          );
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type,
      }),
    ];
  },
});
