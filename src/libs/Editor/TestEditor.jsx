import Link from '@tiptap/extension-link';
import { EditorContent, FloatingMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRef } from 'react';

import { BubbleMenu } from './components/BubbleMenu';
import './editor.css';

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
  }),
  Link.configure({
    protocols: ['https', 'http'],
  }),
];

const content = '<p>Hello World!</p>';

export function TestEditor({ ...props }) {
  const containerRef = useRef();
  const editor = useEditor({
    extensions,
    content,
  });
  return (
    <>
      <div ref={containerRef} {...props}>
        <EditorContent editor={editor}></EditorContent>
      </div>
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      {editor && (
        <BubbleMenu editor={editor} containerRef={containerRef}></BubbleMenu>
      )}
    </>
  );
}
