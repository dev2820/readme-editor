import { defaultProps } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import { forwardRef, useRef, useState } from 'react';
import * as Icon from 'react-feather';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const insertImageBlock = (editor) => ({
  title: 'Image',
  subtext: 'Used to insert a image block',
  aliases: ['image', 'img'],
  group: 'Media',
  icon: <Icon.Image size={18} />,
  onItemClick: () => {
    const currentBlock = editor.getTextCursorPosition().block;
    const imgBlock = {
      type: 'image-block',
    };
    editor.insertBlocks([imgBlock], currentBlock, 'after');
  },
});

export const ImageBlock = createReactBlockSpec(
  {
    type: 'image-block',
    propSchema: {
      ...defaultProps,
    },
    content: 'none',
  },
  {
    render: ({ contentRef }) => {
      const src = '';
      const caption = '';

      return (
        <ImageViewer ref={contentRef} src={src} caption={caption}></ImageViewer>
      );
    },
    toExternalHTML: ({ block, contentRef }) => {
      /**
       * TODO: imageField만 있는 상태에서 external하는 경우를 처리해줘야함
       */
      const blockId = block.id;
      const $block = document.querySelector(`[data-id="${blockId}"]`);
      const $image = $block.querySelector(`img`);
      const $captionInput = $block.querySelector(`input[type="text"]`);

      return (
        <figure ref={contentRef}>
          <img src={$image.src} alt={$captionInput.value}></img>
          <figcaption>{$captionInput.value}</figcaption>
        </figure>
      );
    },
    parse: (element) => {
      if (element.tagName === 'FIGURE') {
        const caption = element.querySelector('figcaption').textContent ?? '';
        const src = element.querySelector('img').getAttribute('src') ?? '';

        return {
          caption,
          src,
        };
      }

      return undefined;
    },
  },
);

function ImageSelector({ onSelectImage }) {
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    onSelectImage(file);
  };

  return (
    <Input
      type="file"
      name="image"
      accept="image/png, image/jpeg, image/gif"
      onChange={handleChangeFile}
    ></Input>
  );
}

function _ImageViewer({ src = '', caption, ...props }, ref) {
  /**
   * 이미지 선택기가 이미지를 선택했다. -> 이미지를 보여준다.
   * 이미지 선택기가 이미지를 선택하지 않았다 -> 이미지 선택기를 보여준다.
   * 이미지는 원본 가로사이즈를 유지해야한다.
   * 중앙 정렬을 선택했음을 전달받고 그에 따라 이미지의 위치를 결정해야한다.
   */
  let originImageWidth = useRef(0);
  const [imageUrl, setImageUrl] = useState(src);
  const [imageCaption, setImageCaption] = useState(caption);
  const [imageWidth, setImageWidth] = useState(0);
  // const { targetPath } = usePostContext();

  function handleCaption(evt) {
    const newCaption = evt.target.value;
    setImageCaption(newCaption);
  }

  function handleResize(size) {
    console.log(size);
    setImageWidth(size);
  }
  async function handlePickImage(file) {
    console.log(file);
    const url = window.URL.createObjectURL(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        /**
         * TODO: image 사이즈가 최대 editor를 벗어나지 않도록
         */
        setImageWidth(img.width);
        originImageWidth.current = img.width;
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    /**
     * 파일을 전역 스토어에 업로드한 뒤 url을 받아와야함
     */
    setImageUrl(url);
  }

  function rollbackOriginImageSize() {
    console.log(originImageWidth.current);
    setImageWidth(originImageWidth.current);
  }

  return (
    <div {...props} ref={ref}>
      {imageUrl === '' ? (
        <ImageSelector onSelectImage={handlePickImage}></ImageSelector>
      ) : (
        <figure>
          <Button onClick={rollbackOriginImageSize}>To original size</Button>
          <WidthResizable width={imageWidth} onResize={handleResize}>
            <img
              className="w-full"
              data-width={imageWidth}
              src={imageUrl}
              data-url={imageUrl}
            />
          </WidthResizable>
          <figcaption>
            <Input
              type="text"
              value={imageCaption ?? ''}
              placeholder="add caption"
              className="border-0"
              onChange={handleCaption}
            ></Input>
          </figcaption>
        </figure>
      )}
    </div>
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
        <span className="grip absolute w-2 h-8 right-0 top-1/2 translate-y-[-1rem] bg-grey-500 rounded-full"></span>
      </div>
    </div>
  );
};
