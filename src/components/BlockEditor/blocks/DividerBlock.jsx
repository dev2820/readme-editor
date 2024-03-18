import { defaultProps } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import { forwardRef } from 'react';
import * as Icon from 'react-feather';

export const insertDividerBlock = (editor) => ({
  title: 'Divider Block',
  subtext: 'Used to insert a divider block',
  aliases: ['---', 'divider'],
  group: 'Divider',
  icon: <Icon.Minus size={18} />,
  onItemClick: () => {
    const currentBlock = editor.getTextCursorPosition().block;
    const block = {
      type: 'divider-block',
    };
    editor.insertBlocks([block], currentBlock, 'before');
  },
});

export const DividerBlock = createReactBlockSpec(
  {
    type: 'divider-block',
    propSchema: {
      ...defaultProps,
    },
    content: 'none',
  },
  {
    render: ({ contentRef }) => {
      return <Divider ref={contentRef}></Divider>;
    },
    toExternalHTML: () => {
      return <hr />;
    },
    parse: (element) => {
      if (element.tagName === 'HR') {
        return {};
      }
      return undefined;
    },
  },
);

const Divider = forwardRef((_, ref) => {
  return <hr ref={ref} />;
});

Divider.displayName = 'divider';
