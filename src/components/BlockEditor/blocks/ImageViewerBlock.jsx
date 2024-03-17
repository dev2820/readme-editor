import { createReactBlockSpec } from '@blocknote/react';
import { forwardRef, useRef } from 'react';

import { Button } from '@/components/ui/Button';

/**
 * TODO: 중앙 정렬, 파싱
 */

export const ImageViewerBlock = createReactBlockSpec(
  {
    type: 'image-viewer-block',
    propSchema: {
      align: {
        default: 'left',
        values: ['left', 'center', 'right'],
      },
      src: {
        default: '',
      },
      width: {
        default: 0,
      },
      originWidth: {
        default: 0,
      },
      name: {
        default: '',
      },
      caption: {
        default: '',
      },
    },
    content: 'none',
  },
  {
    render: ({ block, contentRef, editor }) => {
      const { src, align, width, originWidth, caption, name } = block.props;
      const handleChangeWidth = (newWidth) => {
        const currentBlock = editor.getTextCursorPosition().block;
        const block = {
          type: 'image-viewer-block',
          props: {
            src,
            align,
            width: newWidth,
            originWidth,
            name,
            caption,
          },
        };
        editor.updateBlock(currentBlock, block);
      };

      const handleChangeCaption = (newCaption) => {
        const currentBlock = editor.getTextCursorPosition().block;
        const block = {
          type: 'image-viewer-block',
          props: {
            src,
            align,
            width,
            originWidth,
            name,
            caption: newCaption,
          },
        };
        editor.updateBlock(currentBlock, block);
      };

      return (
        <ImageViewer
          ref={contentRef}
          src={src}
          width={width}
          originWidth={originWidth}
          align={align}
          alt={name}
          caption={caption}
          onChangeWidth={handleChangeWidth}
          onChangeCaption={handleChangeCaption}
        ></ImageViewer>
      );
    },
    toExternalHTML: ({ block, contentRef }) => {
      const blockId = block.id;
      const { name } = block.props;
      const $block = document.querySelector(`[data-id="${blockId}"]`);
      const $image = $block.querySelector(`img`);
      const $captionInput = $block.querySelector(`input[type="text"]`);

      if (!$image) return <br />;

      const relativeUrl = `./images/${name}`;
      if ($captionInput.value) {
        return (
          <figure ref={contentRef}>
            <img src={relativeUrl} alt={name} width={$image.width}></img>
            <figcaption>{$captionInput.value}</figcaption>
          </figure>
        );
      }

      return <img src={relativeUrl} alt={name} width={$image.width}></img>;
    },
    parse: (element) => {
      /**
       * TODO: image 파싱 구현
       */
      if (element.tagName === 'FIGURE') {
        const caption = element.querySelector('figcaption').textContent ?? '';
        const src = element.querySelector('img').getAttribute('src') ?? '';
      }

      return undefined;
    },
  },
);

function _ImageViewer(
  {
    alt,
    width,
    originWidth,
    src,
    caption,
    onChangeWidth,
    onChangeCaption,
    ...props
  },
  ref,
) {
  function handleCaption(evt) {
    const newCaption = evt.target.value;
    onChangeCaption(newCaption);
  }
  function handleResize(size) {
    onChangeWidth(size);
  }

  function rollbackOriginImageSize() {
    onChangeWidth(originWidth);
  }

  return (
    <figure {...props} ref={ref}>
      <Button onClick={rollbackOriginImageSize}>To original size</Button>
      <WidthResizable width={width} onResize={handleResize}>
        <img className="w-full" src={src} alt={alt} width={width} />
      </WidthResizable>
      <figcaption>
        <input
          type="text"
          value={caption}
          placeholder="add caption"
          className="border-0 outline-none color-grey-400"
          onChange={handleCaption}
        ></input>
      </figcaption>
    </figure>
  );
}

const ImageViewer = forwardRef(_ImageViewer);

const WidthResizable = ({ width = 200, onResize, children }) => {
  const elRef = useRef(null);
  let size = width;
  let isGripped = false;
  let isGripOuted = false;
  const handlePressGrip = (e) => {
    if (!e.target.classList.contains('grip')) {
      return;
    }
    isGripped = true;
  };
  const handleMoveGrip = (e) => {
    if (isGripped) {
      const position = e.clientX;
      const $el = elRef.current;
      const { x } = $el.getBoundingClientRect();
      const newWidth = position - x;
      size = newWidth;
      // ref에서 가로 길이로 계산
      elRef.current.style.width = `${newWidth}px`;
    }
  };
  const handleStopPressGrip = () => {
    isGripped = false;
    onResize(size);
  };
  const handleGripLeave = () => {
    isGripped = false;
    isGripOuted = true;
  };
  const handleGripEnter = (e) => {
    if (isGripOuted && e.buttons === 1) {
      // 1 == primary button down
      isGripped = true;
    }
    isGripOuted = false;
  };

  return (
    <div
      onMouseDown={handlePressGrip}
      onMouseMove={handleMoveGrip}
      onMouseUp={handleStopPressGrip}
      onMouseLeave={handleGripLeave}
      onMouseEnter={handleGripEnter}
      className="w-full overflow-x-auto"
    >
      <div
        className="relative select-none"
        ref={elRef}
        style={{ width: `${size}px` }}
      >
        {children}
        <span className="grip hover:bg-grey-500 hover:cursor-pointer absolute w-2 h-8 right-0 top-1/2 translate-y-[-1rem] bg-grey-500/50 rounded-full"></span>
      </div>
    </div>
  );
};
