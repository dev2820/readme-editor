import { defaultProps } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import * as Icon from 'react-feather';

import { CodeEditor } from '@/components/CodeEditor';
import { isNil } from '@/utils/type';

/**
 * TODO: 블럭을 움직이면 코드가 초기화되는 버그가 있음
 * TODO: 언어 바꿀 수 있게 해야함
 */

export const insertCodeBlock = (editor) => ({
  title: 'Code Block',
  subtext: 'Used to insert a code block',
  aliases: ['code', 'cd', '```'],
  group: 'Code',
  icon: <Icon.Code size={18} />,
  onItemClick: () => {
    const currentBlock = editor.getTextCursorPosition().block;
    const block = {
      type: 'code-block',
    };
    editor.updateBlock(currentBlock, block);
  },
});

export const CodeBlock = createReactBlockSpec(
  {
    type: 'code-block',
    propSchema: {
      ...defaultProps,
    },
    content: 'none',
  },
  {
    render: ({ block, contentRef }) => {
      const { lang = 'js', code = '' } = block.props;

      return (
        <CodeEditor
          className="code-editor"
          data-lang="js"
          lang={lang}
          initCode={code}
          ref={contentRef}
        ></CodeEditor>
      );
    },
    toExternalHTML: ({ block, contentRef }) => {
      const blockId = block.id;
      const $code = document.querySelector(
        `[data-id="${blockId}"] .code-editor`,
      );
      const code = $code.dataset['code'];
      const lang = $code.dataset['lang'];

      return (
        <pre ref={contentRef}>
          <code className={`language-${lang}`}>{code}</code>
        </pre>
      );
    },
    parse: (element) => {
      if (element.tagName === 'PRE') {
        const $code = element.querySelector('code');
        if (isNil($code)) return undefined;

        const code = $code.textContent;
        const lang = $code.dataset['language'];

        return {
          code,
          lang,
        };
      }
      return undefined;
    },
  },
);
