import { filterSuggestionItems } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import {
  BlockNoteView,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
} from '@blocknote/react';
import '@blocknote/react/style.css';
import { forwardRef } from 'react';

import { useBlockEditor } from '@/hooks/use-block-editor';
import { cn } from '@/utils';

import './blockStyle.css';
import {
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
import { darkTheme, lightTheme } from './theme';

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
  const { editor } = useBlockEditor();

  if (!editor) {
    return;
  }

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
        ref={ref}
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
