import { BubbleMenu as _BubbleMenu } from '@tiptap/react';

import { SelectionMenu } from './SelectionMenu';

/**
 * tiptap의 bubble은 tippy.js를 기반으로 만들어졌다.
 * @see https://tiptap.dev/docs/editor/api/extensions/bubble-menu
 */
export function BubbleMenu({ editor, containerRef }) {
  if (!editor || !containerRef.current) return null;

  return (
    <_BubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        appendTo: containerRef.current,
      }}
      className="bg-white shadow-lg rounded"
    >
      <SelectionMenu editor={editor}></SelectionMenu>
    </_BubbleMenu>
  );
}
