import { createReactBlockSpec } from '@blocknote/react';
import { forwardRef } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import * as Icon from 'react-feather';

import { getSize, imageToUrl } from '@/utils/image';
import { uploadImage } from '@/utils/storage';

export const insertImageSeletorBlock = (editor) => ({
  title: 'Image',
  subtext: 'Used to insert a image block',
  aliases: ['image', 'img'],
  group: 'Media',
  icon: <Icon.Image size={18} />,
  onItemClick: () => {
    const currentBlock = editor.getTextCursorPosition().block;
    const block = {
      type: 'image-selector-block',
    };
    editor.updateBlock(currentBlock, block);
  },
});

export const ImageSelectorBlock = createReactBlockSpec(
  {
    type: 'image-selector-block',
    propSchema: {},
    content: 'none',
  },
  {
    render: ({ block, contentRef, editor }) => {
      const blockId = block.id;
      const handleSelectImage = async (image) => {
        uploadImage(image.name, image);
        const imgUrl = imageToUrl(image);
        const { width } = await getSize(image);

        const currentBlock = editor.getTextCursorPosition().block;
        const block = {
          type: 'image-viewer-block',
          props: {
            src: imgUrl,
            width,
            name: image.name,
          },
        };
        editor.updateBlock(currentBlock, block);
      };

      return (
        <ImageSelector
          ref={contentRef}
          blockId={blockId}
          onSelectImage={handleSelectImage}
        ></ImageSelector>
      );
    },
    toExternalHTML: () => {
      return <br />;
    },
    parse: () => {
      return undefined;
    },
  },
);

const ImageSelector = forwardRef(_ImageSelector);

function _ImageSelector({ onSelectImage }, ref) {
  const handleChangeFile = (file) => {
    onSelectImage(file);
  };

  return (
    <div
      ref={ref}
      className="[&_label[for='image']]:w-full [&_label[for='image']]:max-w-full [&_label[for='image']]:h-20 [&_label[for='image']]:hover:bg-grey-200"
    >
      <FileUploader
        name="image"
        types={['jpg', 'jpeg', 'png', 'gif']}
        label="Upload or drop a image file right here"
        hoverTitle="+ Drop here"
        handleChange={handleChangeFile}
      ></FileUploader>
    </div>
  );
}
