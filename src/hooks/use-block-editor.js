import { useContext } from 'react';

import { BlockEditorContext } from '../contexts/block-editor-context';

export const useBlockEditor = () => {
  const context = useContext(BlockEditorContext);
  if (!context) {
    throw new Error('useBlockEditor must be used within a CodeEditorProvider');
  }

  return context;
};
