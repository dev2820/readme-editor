import { EditorContent, FloatingMenu } from '@tiptap/react';
import { useRef } from 'react';

import { BubbleMenu } from './components/BubbleMenu';
import './editor.css';
import { getCurrentBlock } from './getCurrentBlock';
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
      {editor && (
        <FloatingMenu
          editor={editor}
          tippyOptions={{
            duration: 100,
            getReferenceClientRect: () => {
              const $block = getCurrentBlock(editor);
              const rect = $block?.getBoundingClientRect();
              const $root = editor.view.dom;
              const rootX = $root.getBoundingClientRect().x;

              return new DOMRect(rootX, rect.y, rect.width, rect.height);
            },
            placement: 'left-start',
          }}
        >
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
            }
          >
            h1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }
          >
            h2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            bullet list
          </button>
        </FloatingMenu>
      )}
    </>
  );
}
