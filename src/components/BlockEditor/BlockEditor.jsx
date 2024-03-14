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
import { forwardRef, useEffect, useImperativeHandle } from 'react';

import { cn } from '@/libs/utils';
import { omit } from '@/utils';

import { CodeBlock, insertCodeBlock } from './CodeBlock';
import { DividerBlock, insertDividerBlock } from './DividerBlock';
import {
  HeadingBlock,
  insertHeading1Block,
  insertHeading2Block,
  insertHeading3Block,
  insertHeading4Block,
  insertHeading5Block,
  insertHeading6Block,
} from './HeadingBlock';
import { ImageBlock, insertImageBlock } from './ImageBlock';
import { QuoteBlock, insertQuoteBlock } from './QuoteBlock';
import './blockStyle.css';
import { blockTraverse } from './blockTraverse';
import { htmlToMarkdown } from './htmlToMarkdown';
import { markdownToHtml } from './markdownToHtml';
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

export const _BlockEditor = (
  { initMarkdown, postPath, onChangeContent, className, ...props },
  ref,
) => {
  const editor = useCreateBlockNote({
    schema: blockSchema,
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

  useEffect(() => {
    if (editor) {
      const getBlocks = async () => {
        const html = await markdownToHtml(initMarkdown);
        const blocks = await editor.tryParseHTMLToBlocks(html);
        blockTraverse(
          blocks,
          (block) => {
            const fullPath = new URL(block.props.url, 'media:' + postPath + '/')
              .href;
            block.props.url = fullPath;
          },
          {
            recursive: true,
            onlyType: ['image'],
          },
        );
        blockTraverse(
          blocks,
          (block) => {
            if (block.content.length === 1 && block.content[0].text === '\n') {
              block.content[0].text = '';
            }
          },
          {
            recursive: true,
            onlyType: ['paragraph'],
          },
        );
        editor.replaceBlocks(editor.document, blocks);
      };
      getBlocks();
    }
  }, [editor, initMarkdown, postPath]);

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
