import { BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { useCreateBlockNote } from '@blocknote/react';
import '@blocknote/react/style.css';
import { createContext } from 'react';

import {
  CodeBlock,
  DividerBlock,
  HeadingBlock,
  ImageSelectorBlock,
  ImageViewerBlock,
  QuoteBlock,
} from '@/components/BlockEditor/blocks';
import { omit } from '@/utils';
import { htmlToMarkdown } from '@/utils/parse';

/**
 * @type {string} code
 */
const defaultValue = {
  editor: null,
};

export const BlockEditorContext = createContext(defaultValue);
const blockSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...omit(defaultBlockSpecs, 'image', 'heading'),
    'heading-block': HeadingBlock,
    'quote-block': QuoteBlock,
    'code-block': CodeBlock,
    'image-viewer-block': ImageViewerBlock,
    'image-selector-block': ImageSelectorBlock,
    'divider-block': DividerBlock,
  },
});

export const BlockEditorProvider = ({ children }) => {
  const editor = useCreateBlockNote({
    schema: blockSchema,
    initialContent: initialContent,
  });

  const toMarkdown = async () => {
    const html = await editor.blocksToHTMLLossy(editor.document);
    console.log(html);
    const markdown = await htmlToMarkdown(html);
    return markdown;
  };

  return (
    <BlockEditorContext.Provider value={{ editor, toMarkdown }}>
      {children}
    </BlockEditorContext.Provider>
  );
};
/**
 * TODO: 나중엔 더 상위로 뺄 것
 */
const initialContent = [
  {
    type: 'paragraph',
    content: 'Hello World',
  },
];
