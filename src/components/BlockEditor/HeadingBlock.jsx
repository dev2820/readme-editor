import { defaultProps } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import { forwardRef } from 'react';
import * as Icon from 'react-feather';

/**
 * TODO: 블럭을 움직이면 코드가 초기화되는 버그가 있음
 * TODO: 언어 바꿀 수 있게 해야함
 */

export const insertHeading1Block = (editor) => ({
  title: 'Heading1 Block',
  subtext: 'Used to insert a heading1 block',
  aliases: ['h1', '#'],
  group: 'Title',
  icon: <Icon.Type size={18} />,
  onItemClick: () => {
    const currentBlock = editor.getTextCursorPosition().block;
    const headingBlock = {
      type: 'heading-block',
      props: {
        level: 1,
      },
    };
    editor.insertBlocks([headingBlock], currentBlock, 'after');
  },
});

export const insertHeading2Block = (editor) => ({
  title: 'Heading2 Block',
  subtext: 'Used to insert a heading2 block',
  aliases: ['h2', '##'],
  group: 'Title',
  icon: <Icon.Type size={18} />,
  onItemClick: () => {
    const currentBlock = editor.getTextCursorPosition().block;
    const headingBlock = {
      type: 'heading-block',
      props: {
        level: 2,
      },
    };
    editor.insertBlocks([headingBlock], currentBlock, 'after');
  },
});

export const insertHeading3Block = (editor) => ({
  title: 'Heading3 Block',
  subtext: 'Used to insert a heading3 block',
  aliases: ['h3', '###'],
  group: 'Title',
  icon: <Icon.Type size={18} />,
  onItemClick: () => {
    const currentBlock = editor.getTextCursorPosition().block;
    const headingBlock = {
      type: 'heading-block',
      props: {
        level: 3,
      },
    };
    editor.insertBlocks([headingBlock], currentBlock, 'after');
  },
});

export const insertHeading4Block = (editor) => ({
  title: 'Heading4 Block',
  subtext: 'Used to insert a heading4 block',
  aliases: ['h4', '####'],
  group: 'Title',
  icon: <Icon.Type size={18} />,
  onItemClick: () => {
    const currentBlock = editor.getTextCursorPosition().block;
    const headingBlock = {
      type: 'heading-block',
      props: {
        level: 4,
      },
    };
    editor.insertBlocks([headingBlock], currentBlock, 'after');
  },
});

export const insertHeading5Block = (editor) => ({
  title: 'Heading5 Block',
  subtext: 'Used to insert a heading5 block',
  aliases: ['h5', '####'],
  group: 'Title',
  icon: <Icon.Type size={18} />,
  onItemClick: () => {
    const currentBlock = editor.getTextCursorPosition().block;
    const headingBlock = {
      type: 'heading-block',
      props: {
        level: 5,
      },
    };
    editor.insertBlocks([headingBlock], currentBlock, 'after');
  },
});

export const insertHeading6Block = (editor) => ({
  title: 'Heading6 Block',
  subtext: 'Used to insert a heading6 block',
  aliases: ['h6', '####'],
  group: 'Title',
  icon: <Icon.Type size={18} />,
  onItemClick: () => {
    const currentBlock = editor.getTextCursorPosition().block;
    const headingBlock = {
      type: 'heading-block',
      props: {
        level: 6,
      },
    };
    editor.insertBlocks([headingBlock], currentBlock, 'after');
  },
});

export const HeadingBlock = createReactBlockSpec(
  {
    type: 'heading-block',
    propSchema: {
      level: {
        default: 1,
        values: [1, 2, 3, 4, 5, 6],
      },
      ...defaultProps,
    },
    content: 'inline',
  },
  {
    render: ({ block, contentRef }) => {
      const { level = 1 } = block.props;

      return <Heading level={level} ref={contentRef}></Heading>;
    },
    toExternalHTML: ({ block }) => {
      const { level } = block.props;
      const contentStr = block.content?.map(({ text }) => text ?? '').join('');
      if (level === 1) {
        return <h1>{contentStr}</h1>;
      }
      if (level === 2) {
        return <h2>{contentStr}</h2>;
      }
      if (level === 3) {
        return <h3>{contentStr}</h3>;
      }
      if (level === 4) {
        return <h4>{contentStr}</h4>;
      }
      if (level === 5) {
        return <h5>{contentStr}</h5>;
      }
      if (level === 6) {
        return <h6>{contentStr}</h6>;
      }
      return <></>;
    },
    parse: (element) => {
      if (element.tagName === 'H1') {
        return {
          level: 1,
        };
      }

      return undefined;
    },
  },
);

const Heading = forwardRef(({ level }, ref) => {
  if (level === 1)
    return (
      <div className="heading">
        <h1 ref={ref}></h1>
      </div>
    );
  if (level === 2)
    return (
      <div className="heading">
        <h2 ref={ref}></h2>
      </div>
    );
  if (level === 3)
    return (
      <div className="heading">
        <h3 ref={ref}></h3>
      </div>
    );
  if (level === 4)
    return (
      <div className="heading">
        <h4 ref={ref}></h4>
      </div>
    );
  if (level === 5)
    return (
      <div className="heading">
        <h5 ref={ref}></h5>
      </div>
    );
  if (level === 6)
    return (
      <div className="heading">
        <h6 ref={ref}></h6>
      </div>
    );

  return <h1 ref={ref}></h1>;
});

Heading.displayName = 'heading';
