import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CodeMirror from '@uiw/react-codemirror';
import { forwardRef } from 'react';

import { cn } from '@/libs/utils';

const extensionMap = {
  js: javascript({ jsx: true }),
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
        theme={dracula}
        height={`${height}px`}
        width={`${width}px`}
        extensions={[extensionMap[lang]]}
        onChange={handleChangeCode}
        autoFocus={true}
      />
    </div>
  );
}

export const CodeEditor = forwardRef(_CodeEditor);
