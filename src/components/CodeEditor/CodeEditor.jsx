import { langs } from '@uiw/codemirror-extensions-langs';
import { githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
import { forwardRef } from 'react';

import { cn } from '@/libs/utils';

import { completeJSDoc } from './jsdoc';

const extensionMap = {
  js: [
    langs.javascript(),
    langs.javascript().language.data.of({ autocomplete: completeJSDoc }),
  ],
};

function _CodeEditor(
  {
    height = 0,
    width = 0,
    lang = 'js',
    initCode = '',
    className,
    onChangeCode,
    ...props
  },
  ref,
) {
  function handleChangeCode(newCode) {
    onChangeCode(newCode);
  }

  return (
    <div
      className={cn('rounded-xl [&_*]:font-mono!', className)}
      ref={ref}
      {...props}
    >
      <CodeMirror
        value={initCode}
        theme={githubLight}
        height={`${height}px`}
        width={`${width}px`}
        options={{
          tabSize: 2,
          lineNumbers: true,
          autoCloseBrackets: true,
        }}
        extensions={[...extensionMap[lang]]}
        onChange={handleChangeCode}
        autoFocus={true}
      />
    </div>
  );
}

export const CodeEditor = forwardRef(_CodeEditor);
