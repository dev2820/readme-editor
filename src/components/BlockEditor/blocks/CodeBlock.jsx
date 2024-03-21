import { createReactBlockSpec } from '@blocknote/react';
import Prism from 'prismjs';
import { forwardRef, useState } from 'react';
import * as Icon from 'react-feather';

import '@/assets/prism.css';
import { CodeEditorModal } from '@/components/modal/CodeEditorModal';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { cn } from '@/utils';
import { isNil } from '@/utils/type';

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
        values: ['js', 'ts', 'jsx', 'tsx'],
      },
      code: {
        default: '// code block is empty',
      },
    },
    content: 'none',
  },
  {
    render: ({ block, contentRef, editor }) => {
      const { lang, code } = block.props;

      const handleChange = (code, lang) => {
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
          onChange={handleChange}
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
  ({ lang: _lang, code: _code, className, onChange, ...props }, ref) => {
    const [code, setCode] = useState(_code);
    const [lang, setLang] = useState(_lang);
    const codeHtml = Prism.highlight(
      _code,
      Prism.languages.javascript,
      langMap[_lang],
    );

    const handleClickConfirm = () => {
      onChange(code, lang);
    };
    const handleChangeCode = (code) => {
      setCode(code);
    };
    const handleChangeLang = (lang) => {
      setLang(lang);
    };
    const handleChangeOpen = () => {
      setCode(_code);
      setLang(_lang);
    };
    return (
      <div className={cn('relative', className)} {...props} ref={ref}>
        <div className="absolute right-1 top-1 flex">
          <Dialog onOpenChange={handleChangeOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="h-5 px-2 py-1">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col">
              <DialogHeader>
                <DialogTitle>Edit Code Block Here</DialogTitle>
                <DialogDescription>
                  Edit Code and change language
                </DialogDescription>
              </DialogHeader>
              <CodeEditorModal
                code={code}
                lang={lang}
                onChangeCode={handleChangeCode}
                onChangeLang={handleChangeLang}
              ></CodeEditorModal>
              <DialogFooter>
                {/* <DialogClose asChild>
                  <Button onClick={handleClickClose} variant="ghost">
                    Close
                  </Button>
                </DialogClose> */}
                <DialogClose asChild>
                  <Button onClick={handleClickConfirm}>Apply</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <pre>
          <code
            className={`language-${_lang}`}
            data-lang={_lang}
            dangerouslySetInnerHTML={{ __html: codeHtml }}
          ></code>
        </pre>
      </div>
    );
  },
);

Code.displayName = 'code';

const langMap = {
  js: 'javascript',
  ts: 'typescript',
  jsx: 'javascript',
  tsx: 'typescript',
};
