import { useState } from 'react';
import { createContext } from 'react';

/**
 * @type {string} code
 */
const defaultValue = {
  code: '',
  lang: '',
};

export const CodeEditorContext = createContext(defaultValue);

export const CodeEditorProvider = ({ children }) => {
  const [code, setCode] = useState('');
  const [lang, setLang] = useState('');

  return (
    <CodeEditorContext.Provider value={{ code, lang, setCode, setLang }}>
      {children}
    </CodeEditorContext.Provider>
  );
};
