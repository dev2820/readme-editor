import { BubbleMenu as _BubbleMenu } from '@tiptap/react';
import { useEffect, useState } from 'react';

import { SelectionMenu } from './SelectionMenu';

/**
 * tiptap의 bubble은 tippy.js를 기반으로 만들어졌다.
 * @see https://tiptap.dev/docs/editor/api/extensions/bubble-menu
 */
export function BubbleMenu({ editor, containerRef }) {
  const [selectionType, setSelectionType] = useState(null); // "link"|null

  useEffect(() => {
    if (selectionType !== 'link') setSelectionType(null);
  }, []);

  if (!editor || !containerRef.current) return null;

  return (
    <_BubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        appendTo: containerRef.current,
      }}
      className="bg-white"
    >
      <SelectionMenu
        editor={editor}
        selectionType={selectionType}
        setSelectionType={setSelectionType}
      ></SelectionMenu>
    </_BubbleMenu>
  );
}
