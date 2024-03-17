import { createReactBlockSpec } from '@blocknote/react';
import { forwardRef, useRef, useState } from 'react';

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
      name: {
        default: '',
      },
    },
    content: 'none',
  },
  {
    render: ({ block, contentRef }) => {
      const { src, align, width, name } = block.props;

      return (
        <ImageViewer
          ref={contentRef}
          src={src}
          width={width}
          align={align}
          alt={name}
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

function _ImageViewer({ alt, width, src, ...props }, ref) {
  const originImageWidth = useRef(width);
  const [imageCaption, setImageCaption] = useState('');
  const [imageWidth, setImageWidth] = useState(width);

  function handleCaption(evt) {
    const newCaption = evt.target.value;
    setImageCaption(newCaption);
  }

  function handleResize(size) {
    setImageWidth(size);
  }

  function rollbackOriginImageSize() {
    setImageWidth(originImageWidth.current);
  }

  return (
    <figure {...props} ref={ref}>
      <Button onClick={rollbackOriginImageSize}>To original size</Button>
      <WidthResizable width={imageWidth} onResize={handleResize}>
        <img
          className="w-full"
          data-width={imageWidth}
          src={src}
          alt={alt}
          width={imageWidth}
        />
      </WidthResizable>
      <figcaption>
        <input
          type="text"
          value={imageCaption ?? ''}
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
