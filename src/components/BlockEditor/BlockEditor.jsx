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
import { ImageBlock, insertImageBlock } from './ImageBlock';
import { blockTraverse } from './blockTraverse';
import { htmlToMarkdown } from './htmlToMarkdown';
import { markdownToHtml } from './markdownToHtml';
import { darkTheme, lightTheme } from './theme';

const blockSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...omit(defaultBlockSpecs, 'image'),
    'code-block': CodeBlock,
    'image-block': ImageBlock,
  },
});

const getCustomSlashMenuItems = (editor) => {
  return [
    ...getDefaultReactSlashMenuItems(editor),
    insertCodeBlock(editor),
    insertImageBlock(editor),
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
    <div className={cn('bg-#f5f5f4', className)} {...props}>
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
