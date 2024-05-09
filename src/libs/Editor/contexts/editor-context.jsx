import Bold from '@tiptap/extension-bold';
import Code from '@tiptap/extension-code';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Focus from '@tiptap/extension-focus';
import HardBreak from '@tiptap/extension-hard-break';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { common, createLowlight } from 'lowlight';
import { createContext } from 'react';

import { Alert } from '../components/nodes/alert';
import { Blockquote } from '../components/nodes/blockquote';
import { BulletList } from '../components/nodes/bullet-list';
import { CodeBlock } from '../components/nodes/code-block';
import {
  Details,
  DetailsContent,
  DetailsSummary,
} from '../components/nodes/details';
import { ExternalImage } from '../components/nodes/external-image';
import { Heading } from '../components/nodes/heading';
import { HorizontalRule } from '../components/nodes/horizontal-rule';
import { InternalImage } from '../components/nodes/internal-image';
import { ListItem } from '../components/nodes/list-item';
import { OrderedList } from '../components/nodes/ordered-list';
import { Paragraph } from '../components/nodes/paragraph';
import { TaskItem } from '../components/nodes/task-item';
import { TaskList } from '../components/nodes/task-list';
import { Commands } from '../plugins/CommandsPlugin';
import { htmlToMarkdown } from '../utils/htmlToMarkdown';
import { getNodePlaceholder } from '../utils/node';

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
  InternalImage,
  Bold,
  Details,
  DetailsSummary,
  DetailsContent,
  Alert,
  Strike,
  Italic, // FIXME: 현재 폰트에서 italic이 보이지 않는 문제가 있으니 확인 (폰트가 로드 안된건지 inter의 문제인지 확인 필요함)
  Underline,
  Code,
  Placeholder.configure({
    placeholder: ({ node }) => getNodePlaceholder(node),
  }),
  Commands,
  History.configure({
    newGroupDelay: 300,
  }),
  Focus.configure({
    mode: 'shallowest',
  }),
  Dropcursor.configure({
    width: 2,
  }),
];

/**
 * @type {string} code
 */
const defaultValue = {
  editor: null,
};

export const EditorContext = createContext(defaultValue);

export const EditorProvider = ({ children }) => {
  const editor = useEditor({
    extensions,
    content:
      '<h1>Hello World</h1>' +
      '<p>write anything</p>' +
      Array.from({ length: 10 })
        .fill(0)
        .map(() => '<p></p>')
        .join(''),
  });

  const toMarkdown = async () => {
    return await htmlToMarkdown(editor.getHTML());
  };

  const toHTML = async () => {
    return Promise.resolve(editor.getHTML());
  };

  return (
    <EditorContext.Provider value={{ editor, toMarkdown, toHTML }}>
      {children}
    </EditorContext.Provider>
  );
};
