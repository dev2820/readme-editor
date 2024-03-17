import {
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
} from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import {
  BlockNoteView,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from '@blocknote/react';
import '@blocknote/react/style.css';
import { forwardRef, useImperativeHandle } from 'react';

import { cn, omit } from '@/utils';

import './blockStyle.css';
import {
  CodeBlock,
  DividerBlock,
  HeadingBlock,
  ImageBlock,
  QuoteBlock,
  insertCodeBlock,
  insertDividerBlock,
  insertHeading1Block,
  insertHeading2Block,
  insertHeading3Block,
  insertHeading4Block,
  insertHeading5Block,
  insertHeading6Block,
  insertImageBlock,
  insertQuoteBlock,
} from './blocks';
import { htmlToMarkdown } from './htmlToMarkdown';
import { darkTheme, lightTheme } from './theme';

const blockSchema = BlockNoteSchema.create({
  blockSpecs: {
    // ...omit(defaultBlockSpecs, 'image'),
    ...omit(defaultBlockSpecs, 'image', 'heading'),
    'heading-block': HeadingBlock,
    'quote-block': QuoteBlock,
    'code-block': CodeBlock,
    'image-block': ImageBlock,
    'divider-block': DividerBlock,
  },
});

const getCustomSlashMenuItems = (editor) => {
  return [
    ...getDefaultReactSlashMenuItems(editor),
    insertCodeBlock(editor),
    insertImageBlock(editor),
    insertHeading1Block(editor),
    insertHeading2Block(editor),
    insertHeading3Block(editor),
    insertHeading4Block(editor),
    insertHeading5Block(editor),
    insertHeading6Block(editor),
    insertQuoteBlock(editor),
    insertDividerBlock(editor),
  ];
};

export const _BlockEditor = ({ onChangeContent, className, ...props }, ref) => {
  const editor = useCreateBlockNote({
    schema: blockSchema,
    initialContent: [
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
    ],
  });
  useImperativeHandle(
    ref,
    () => {
      return {
        async getMarkdown() {
          const html = await editor.blocksToHTMLLossy(editor.document);
          const markdown = await htmlToMarkdown(html);
          return markdown;
        },
        async removeImage(id) {
          editor.removeBlocks([id]);
        },
      };
    },
    [editor],
  );

  return (
    <div
      className={cn('bg-white border-1 border-grey-200 rounded-lg', className)}
      {...props}
    >
      <BlockNoteView
        editor={editor}
        onChange={onChangeContent}
        slashMenu={false}
        theme={{
          light: lightTheme,
          dark: darkTheme,
        }}
      >
        <SuggestionMenuController
          triggerCharacter={'/'}
          getItems={async (query) =>
            filterSuggestionItems(getCustomSlashMenuItems(editor), query)
          }
        ></SuggestionMenuController>
      </BlockNoteView>
    </div>
  );
};
export const BlockEditor = forwardRef(_BlockEditor);
