import { createReactBlockSpec } from '@blocknote/react';
import Prism from 'prismjs';
import { forwardRef } from 'react';
import * as Icon from 'react-feather';

import '@/assets/prism.css';
import { CodeEditorModal } from '@/components/modal/CodeEditorModal';
import { Button } from '@/components/ui/Button';
import { useDialog } from '@/hooks/use-dialog';
import { cn } from '@/utils';
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
      lang: {
        default: 'js',
        values: ['js', 'ts'],
      },
      code: {
        default: '',
      },
    },
    content: 'none',
  },
  {
    render: ({ block, contentRef, editor }) => {
      const { lang = '', code = '' } = block.props;
      const handleChangeCode = (code, lang) => {
        const currentBlock = editor.getTextCursorPosition().block;
        const block = {
          type: 'code-block',
          props: {
            lang,
            code,
          },
        };
        editor.updateBlock(currentBlock, block);
      };

      return (
        <Code
          lang={lang}
          code={code}
          ref={contentRef}
          onChangeCode={handleChangeCode}
        ></Code>
      );
    },
    toExternalHTML: ({ block, contentRef }) => {
      const blockId = block.id;
      const $code = document.querySelector(`[data-id="${blockId}"] code`);
      const code = $code.textContent;
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

const Code = forwardRef(
  ({ lang, code, className, onChangeCode, ...props }, ref) => {
    const dialog = useDialog();

    const openCodeEditor = () => {
      dialog.open(CodeEditorModal.displayName, {
        lang,
        code,
        onConfirm: (code, lang) => {
          onChangeCode(code, lang);
        },
      });
    };
    const onClickEdit = () => {
      openCodeEditor();
    };

    const codeHtml = Prism.highlight(
      code,
      Prism.languages.javascript,
      'javascript',
    );
    return (
      <div className={cn('relative', className)} {...props} ref={ref}>
        <div className="absolute right-1 top-1 flex">
          <Button
            variant="ghost"
            onClick={onClickEdit}
            className="h-5 px-2 py-1"
          >
            Edit
          </Button>
        </div>
        <pre>
          <code
            className={`language-${lang}`}
            dangerouslySetInnerHTML={{ __html: codeHtml }}
          ></code>
        </pre>
      </div>
    );
  },
);

Code.displayName = 'code';
