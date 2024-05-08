import { BubbleMenu as _BubbleMenu } from '@tiptap/react';

import { SelectionMenu } from './SelectionMenu';

/**
 * tiptap의 bubble은 tippy.js를 기반으로 만들어졌다.
 * @see https://tiptap.dev/docs/editor/api/extensions/bubble-menu
 */
export function BubbleMenu({ editor, containerRef }) {
  if (!editor || !containerRef.current) return null;

  const handleShow = ({ editor }) => {
    if (editor.state.selection.empty) {
      return false;
    }

    if (editor.isActive('codeBlock')) {
      return false;
    }

    return true;
  };

  return (
    <_BubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        appendTo: containerRef.current,
      }}
      shouldShow={handleShow}
      className="border-1 border-grey-200 bg-white shadow-lg rounded-lg"
    >
      <SelectionMenu editor={editor}></SelectionMenu>
    </_BubbleMenu>
  );
}
