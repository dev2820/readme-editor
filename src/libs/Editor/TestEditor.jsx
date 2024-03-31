import Document from '@tiptap/extension-document';
import History from '@tiptap/extension-history';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import { FloatingMenu } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import { useRef } from 'react';

import { isNil } from '@/utils';

import { BubbleMenu } from './components/BubbleMenu';
import { Heading } from './components/nodes/heading';
import { HorizontalRule } from './components/nodes/horizontal-rule';
import { Paragraph } from './components/nodes/paragraph';
import './editor.css';
import { getCurrentBlock } from './getCurrentBlock';
import { CommandsPlugin } from './plugins/CommandsPlugin';

const extensions = [
  Document,
  Paragraph,
  HorizontalRule,
  Heading,
  Text,
  Link.configure({
    protocols: ['https', 'http'],
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return `header${node.attrs.level}`;
      }

      return 'Can you add some further context?';
    },
  }),
  CommandsPlugin,
  History.configure({
    newGroupDelay: 300,
  }),
];

const content = '<p>Hello World!</p>';

function shouldShowFloatingMenu({ editor }) {
  if (isNil(editor)) return false;
  return true;
}

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
      {editor && (
        <BubbleMenu editor={editor} containerRef={containerRef}></BubbleMenu>
      )}
      {/* {editor && <ChangeMenu editor={editor}></ChangeMenu>} */}
      {editor && (
        <FloatingMenu
          editor={editor}
          tippyOptions={{
            duration: 100,
            getReferenceClientRect: () => {
              const $block = getCurrentBlock(editor);
              const rect = $block.getBoundingClientRect();

              return rect;
            },
            placement: 'left-start',
          }}
          shouldShow={shouldShowFloatingMenu}
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
