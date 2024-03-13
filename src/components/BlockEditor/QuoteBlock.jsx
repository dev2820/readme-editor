import { defaultProps } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import { forwardRef } from 'react';
import * as Icon from 'react-feather';

/**
 * TODO: 블럭을 움직이면 코드가 초기화되는 버그가 있음
 * TODO: 언어 바꿀 수 있게 해야함
 */

export const insertQuoteBlock = (editor) => ({
  title: 'Quote Block',
  subtext: 'Used to insert a quote block',
  aliases: ['>', 'quote'],
  group: 'Quote',
  icon: <Icon.Type size={18} />,
  onItemClick: () => {
    const currentBlock = editor.getTextCursorPosition().block;
    const quoteBlock = {
      type: 'quote-block',
      props: {},
    };
    editor.insertBlocks([quoteBlock], currentBlock, 'after');
  },
});

export const QuoteBlock = createReactBlockSpec(
  {
    type: 'quote-block',
    propSchema: {
      ...defaultProps,
    },
    content: 'inline',
  },
  {
    render: ({ contentRef }) => {
      return <Quote ref={contentRef}></Quote>;
    },
    toExternalHTML: ({ block }) => {
      const contentStr = block.content?.map(({ text }) => text ?? '').join('');

      return <blockquote>{contentStr}</blockquote>;
    },
    parse: (element) => {
      if (element.tagName === 'BLOCKQUOTE') {
        return {};
      }
      return undefined;
    },
  },
);

const Quote = forwardRef((_, ref) => {
  return <blockquote ref={ref}></blockquote>;
});

Quote.displayName = 'quote';
