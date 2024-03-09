import '@blocknote/core/fonts/inter.css';
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react';
import '@blocknote/react/style.css';

import './style.css';

export const BlockEditor = () => {
  const editor = useCreateBlockNote();

  return <BlockNoteView editor={editor} />;
};
