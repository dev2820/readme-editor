import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
// import Focus from '@tiptap/extension-focus';
import HardBreak from '@tiptap/extension-hard-break';
import History from '@tiptap/extension-history';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import { FloatingMenu } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { common, createLowlight } from 'lowlight';
import { useRef } from 'react';

import { isNil } from '@/utils';

import { BubbleMenu } from './components/BubbleMenu';
import { Blockquote } from './components/nodes/blockquote';
import { BulletList } from './components/nodes/bullet-list';
import { CodeBlock } from './components/nodes/code-block';
import { Heading } from './components/nodes/heading';
import { HorizontalRule } from './components/nodes/horizontal-rule';
import { ListItem } from './components/nodes/list-item';
import { OrderedList } from './components/nodes/ordered-list';
import { Paragraph } from './components/nodes/paragraph';
import { TaskItem } from './components/nodes/task-item';
import { TaskList } from './components/nodes/task-list';
import './editor.css';
import { getCurrentBlock } from './getCurrentBlock';
import { CommandsPlugin } from './plugins/CommandsPlugin';

const lowlight = createLowlight(common);
lowlight.register({ css, js, ts, html });

const extensions = [
  Document,
  Paragraph,
  HorizontalRule,
  Heading,
  Blockquote,
  BulletList,
  OrderedList,
  ListItem,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Text,
  HardBreak,
  Link.configure({
    protocols: ['https', 'http'],
  }),
  CodeBlock.configure({
    lowlight,
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
  // Focus.configure({
  //   mode: 'deepest',
  // }),
  Dropcursor.configure({
    width: 2,
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
