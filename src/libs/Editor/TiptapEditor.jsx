import { EditorContent } from '@tiptap/react';
import { useRef } from 'react';

import { BubbleMenu } from './components/BubbleMenu';
import './editor.css';
import { useEditor } from './hooks/use-editor';

export function TiptapEditor({ ...props }) {
  const containerRef = useRef();
  const { editor } = useEditor();

  return (
    <>
      <div ref={containerRef} {...props}>
        <EditorContent editor={editor}></EditorContent>
      </div>
      {editor && (
        <BubbleMenu editor={editor} containerRef={containerRef}></BubbleMenu>
      )}
    </>
  );
}
