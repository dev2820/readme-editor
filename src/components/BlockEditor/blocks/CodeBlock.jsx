import { createReactBlockSpec } from '@blocknote/react';
import { forwardRef, useState } from 'react';
import * as Icon from 'react-feather';

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
        default: '',
        values: ['', 'js', 'ts'],
      },
      code: {
        default: '',
      },
    },
    content: 'none',
  },
  {
    render: ({ block, contentRef }) => {
      const { lang = '', code = '' } = block.props;
      /**
       * 코드 블럭이 보인다.
       * 언어 변경이 가능하다.
       * 모달을 열어 코드 수정이 가능하다.
       *
       */
      return <Code initLang={lang} initCode={code} ref={contentRef}></Code>;
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

const Code = forwardRef(({ initLang, initCode, className, ...props }, ref) => {
  const dialog = useDialog();
  const [code, setCode] = useState(initCode);
  const [lang, setLang] = useState(initLang);

  const openCodeEditor = () => {
    dialog.open(CodeEditorModal.displayName, {
      lang,
      code,
      onConfirm: (code, lang) => {
        setCode(code);
        setLang(lang);
      },
    });
  };
  const onClickEdit = () => {
    openCodeEditor();
  };

  return (
    <div className={cn('relative', className)} {...props} ref={ref}>
      <div className="absolute right-1 top-1 flex">
        <Button variant="ghost" onClick={onClickEdit} className="h-5 px-2 py-1">
          Edit
        </Button>
      </div>
      <pre>
        <code className={`language-${code}`} data-lang={code}>
          {code}
        </code>
      </pre>
    </div>
  );
});

Code.displayName = 'code';
