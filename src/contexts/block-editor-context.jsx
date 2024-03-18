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
    content: 'playground',
  },
  {
    type: 'code-block',
    props: {
      lang: 'js',
      code: 'const a = "hello world";',
    },
  },
  {
    type: 'image-selector-block',
  },
  {
    type: 'heading-block',
    content: 'Heading1',
    props: {
      level: 1,
    },
  },
  {
    type: 'heading-block',
    content: 'Heading2',
    props: {
      level: 2,
    },
  },
  {
    type: 'heading-block',
    content: 'Heading3',
    props: {
      level: 3,
    },
  },
  {
    type: 'heading-block',
    content: 'Heading4',
    props: {
      level: 4,
    },
  },
  {
    type: 'heading-block',
    content: 'Heading5',
    props: {
      level: 5,
    },
  },
  {
    type: 'heading-block',
    content: 'Heading6',
    props: {
      level: 6,
    },
  },
  {
    type: 'bulletListItem',
    content: 'Bullet List Item',
  },
  {
    type: 'numberedListItem',
    content: 'Numbered List Item',
  },
  {
    type: 'table',
    content: {
      type: 'tableContent',
      rows: [
        {
          cells: ['Table Cell', 'Table Cell', 'Table Cell'],
        },
        {
          cells: ['Table Cell', 'Table Cell', 'Table Cell'],
        },
        {
          cells: ['Table Cell', 'Table Cell', 'Table Cell'],
        },
      ],
    },
  },
  {
    type: 'divider-block',
  },
  {
    type: 'quote-block',
    content: 'hello world',
  },
  {
    type: 'paragraph',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  },
];
