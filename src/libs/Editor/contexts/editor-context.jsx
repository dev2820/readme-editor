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

import { Blockquote } from '../components/nodes/blockquote';
import { BulletList } from '../components/nodes/bullet-list';
import { CodeBlock } from '../components/nodes/code-block';
import { ExternalImage } from '../components/nodes/external-image';
import { Heading } from '../components/nodes/heading';
import { HorizontalRule } from '../components/nodes/horizontal-rule';
import { ListItem } from '../components/nodes/list-item';
import { OrderedList } from '../components/nodes/ordered-list';
import { Paragraph } from '../components/nodes/paragraph';
import { TaskItem } from '../components/nodes/task-item';
import { TaskList } from '../components/nodes/task-list';
import { Commands } from '../plugins/CommandsPlugin';
import { htmlToMarkdown } from '../utils/htmlToMarkdown';
import { markdownToHtml } from '../utils/markdownToHtml';
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
  Bold,
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

const content = `

<h1>Markdown 문법 예제</h1>

<h2>제목 (Headers)</h2>
<hr/>
<h1>H1</h1>
<h2>H2</h2>
<h3>H3</h3>
<h4>H4</h4>
<h5>H5</h5>
<h6>H6</h6>

<h2>볼드 및 이탤릭 (Bold &amp; Italic)</h2>
<hr/>

<p><strong>볼드 텍스트</strong></p>
<p><em>이탤릭 텍스트</em></p>
<p><code>코드 텍스트</code></p>
<p><u>밑줄 텍스트</u></p>
<p><del>취소선 텍스트</del></p>

<h2>목록 (Lists)</h2>
<hr/>
<h3>순서 없는 목록 (Unordered Lists)</h3>

<ul>
<li>항목 1</li>
<li>항목 2
<ul>
<li>하위 항목 1</li>
<li>하위 항목 2</li>
</ul>
</li>
</ul>

<h3>순서 있는 목록 (Ordered Lists)</h3>

<ol>
<li>항목 1</li>
<li>항목 2</li>
<li>항목 3</li>
</ol>

<h2>링크 및 이미지 (Links &amp; Images)</h2>
<hr/>
<p><a href="링크 주소">링크 텍스트</a></p>

<p><img src="이미지 주소" alt="대체 텍스트"></p>

<h2>블록 인용문 (Blockquotes)</h2>
<hr/>
<blockquote>
Hello World
</blockquote>


<h2>코드 블럭 (Pre Code)</h2>
<hr/>
<pre>
<code class="language-js">
const a = 3;
console.log(a)
</code>
</pre>

<h2>할 일 리스트 (taskList)</h2>
<hr/>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="true">
    <label contenteditable="false">
      <input type="checkbox" checked="true">
      <span></span>
    </label>
    <div>
      <p data-type="paragraph">todo 1</p>
    </div>
  </li>
  <li data-type="taskItem" data-checked="false">
    <label contenteditable="false">
      <input type="checkbox">
      <span></span>
    </label>
    <div>
      <p data-type="paragraph">todo2</p>
      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="false">
          <label contenteditable="false">
            <input type="checkbox">
            <span></span>
          </label>
          <div>
            <p data-type="paragraph">nested todo1</p>
          </div>
        </li>
        <li data-type="taskItem" data-checked="false">
          <label contenteditable="false">
            <input type="checkbox">
            <span></span>
          </label>
          <div>
            <p data-type="paragraph">nested todo2</p>
          </div>
        </li>
      </ul>
    </div>
  </li>
</ul>
`;

/**
 * @type {string} code
 */
const defaultValue = {
  editor: null,
};

export const EditorContext = createContext(defaultValue);

export const EditorProvider = ({ children }) => {
  markdownToHtml('');
  const editor = useEditor({
    extensions,
    content,
  });

  const toMarkdown = async () => {
    return await htmlToMarkdown(editor.getHTML());
  };

  return (
    <EditorContext.Provider value={{ editor, toMarkdown }}>
      {children}
    </EditorContext.Provider>
  );
};
