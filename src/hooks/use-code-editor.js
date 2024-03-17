import { useContext } from 'react';

import { CodeEditorContext } from '../contexts/code-editor-context';

export const useCodeEditor = () => {
  const context = useContext(CodeEditorContext);
  if (!context) {
    throw new Error('useCodeEditor must be used within a CodeEditorProvider');
  }

  return context;
};
