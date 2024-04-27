import { useContext } from 'react';

import { MetadataContext } from '../contexts/metadata-context';

export const useMetadata = () => {
  const context = useContext(MetadataContext);
  if (!context) {
    throw new Error('useBlockEditor must be used within a CodeEditorProvider');
  }

  return context;
};
