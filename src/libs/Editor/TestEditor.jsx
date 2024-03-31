import Bold from '@tiptap/extension-bold';
import Code from '@tiptap/extension-code';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
// import Focus from '@tiptap/extension-focus';
import HardBreak from '@tiptap/extension-hard-break';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import { FloatingMenu } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { common, createLowlight } from 'lowlight';
import { useRef } from 'react';

import { BubbleMenu } from './components/BubbleMenu';
import { Blockquote } from './components/nodes/blockquote';
import { BulletList } from './components/nodes/bullet-list';
import { CodeBlock } from './components/nodes/code-block';
import { ExternalImage } from './components/nodes/external-image';
import { Heading } from './components/nodes/heading';
import { HorizontalRule } from './components/nodes/horizontal-rule';
import { ListItem } from './components/nodes/list-item';
import { OrderedList } from './components/nodes/ordered-list';
import { Paragraph } from './components/nodes/paragraph';
import { TaskItem } from './components/nodes/task-item';
import { TaskList } from './components/nodes/task-list';
import './editor.css';
import { getCurrentBlock } from './getCurrentBlock';
import { Commands } from './plugins/CommandsPlugin';

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
  ExternalImage,
  Bold,
  Strike,
  Italic, // FIXME: 현재 폰트에서 italic이 보이지 않는 문제가 있으니 확인 (폰트가 로드 안된건지 inter의 문제인지 확인 필요함)
  Underline,
  Code,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return `header${node.attrs.level}`;
      }
      /**
       * TODO: 각 node에 맞는 placeholder 추가
       */
      return 'Can you add some further context?';
    },
  }),
  Commands,
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
