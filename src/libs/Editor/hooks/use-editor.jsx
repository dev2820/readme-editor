import { useContext } from 'react';

import { EditorContext } from '../contexts/editor-context';

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within a EditorProvider');
  }

  return context;
};
