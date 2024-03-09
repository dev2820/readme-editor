import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CodeMirror from '@uiw/react-codemirror';
import { forwardRef, useState } from 'react';

import { cn } from '@/libs/utils';

const extensionMap = {
  js: javascript({ jsx: true }),
};

function _CodeEditor({ lang = 'js', initCode = '', className, ...props }, ref) {
  const [code, setCode] = useState(initCode);

  function handleChangeCode(newCode) {
    setCode(newCode);
  }

  return (
    <div
      className={cn('rounded-xl [&_*]:font-mono!', className)}
      ref={ref}
      data-code={code}
      {...props}
    >
      <CodeMirror
        value={initCode}
        theme={dracula}
        extensions={[extensionMap[lang]]}
        onChange={handleChangeCode}
      />
    </div>
  );
}

export const CodeEditor = forwardRef(_CodeEditor);
