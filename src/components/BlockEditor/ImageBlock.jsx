// import { defaultProps } from '@blocknote/core';
// import { createReactBlockSpec } from '@blocknote/react';
// import { forwardRef, useState } from 'react';
// import * as Icon from 'react-feather';

// import { Input } from '@/components/Common';
// import { usePostContext } from '@/contexts/postContext';

// export const insertImageBlock = {
//   name: 'Insert Image Block',
//   hint: 'Used to insert a image block',
//   execute: (editor) => {
//     editor.insertBlocks(
//       [
//         {
//           type: 'imageBlock',
//           props: {
//             src: '',
//             caption: '',
//           },
//         },
//       ],
//       editor.getTextCursorPosition().block,
//       'after',
//     );
//   },
//   aliases: ['image', 'img'],
//   group: 'Media',
//   icon: <Icon.Image size={18} />,
// };

// function ImageField({ onClick }) {
//   return <div onClick={onClick}>select image</div>;
// }

// function _ImageViewer({ src, caption, ...props }, ref) {
//   /**
//    * 이미지 선택기가 이미지를 선택했다. -> 이미지를 보여준다.
//    * 이미지 선택기가 이미지를 선택하지 않았다 -> 이미지 선택기를 보여준다.
//    * 이미지는 원본 가로사이즈를 유지해야한다.
//    * 중앙 정렬을 선택했음을 전달받고 그에 따라 이미지의 위치를 결정해야한다.
//    */
//   const [imageUrl, setImageUrl] = useState(src);
//   const [imageCaption, setImageCaption] = useState(caption);
//   const { targetPath } = usePostContext();

//   function handleCaption(evt) {
//     const newCaption = evt.target.value;
//     setImageCaption(newCaption);
//   }
//   async function handlePickImage() {
//     const imageUrl = await getUploadedImageUrl(targetPath);
//     setImageUrl(imageUrl);
//   }

//   return (
//     <div {...props} ref={ref}>
//       {imageUrl.length > 0 ? (
//         <figure className={blockStyle}>
//           <img src={wrapToMediaUrl(imageUrl)} data-url={imageUrl} />
//           <figcaption>
//             <Input
//               type="text"
//               value={imageCaption ?? ''}
//               onChange={handleCaption}
//             ></Input>
//           </figcaption>
//         </figure>
//       ) : (
//         <ImageField onClick={handlePickImage}></ImageField>
//       )}
//     </div>
//   );
// }

// const ImageViewer = forwardRef(_ImageViewer);

// const blockStyle = css({
//   display: 'inline-flex',
//   flexDirection: 'column',
// });

// export const ImageBlock = createReactBlockSpec(
//   {
//     type: 'imageBlock',
//     propSchema: {
//       ...defaultProps,
//       src: {
//         default: '',
//       },
//       caption: {
//         default: '',
//       },
//     },
//     content: 'none',
//   },
//   {
//     render: ({ block, contentRef }) => {
//       const { src, caption } = block.props;

//       return (
//         <ImageViewer ref={contentRef} src={src} caption={caption}></ImageViewer>
//       );
//     },
//     toExternalHTML: ({ block, contentRef }) => {
//       /**
//        * TODO: imageField만 있는 상태에서 external하는 경우를 처리해줘야함
//        */
//       const blockId = block.id;
//       const $block = document.querySelector(`[data-id="${blockId}"]`);
//       const $image = $block.querySelector(`img`);
//       const $captionInput = $block.querySelector(`input[type="text"]`);

//       return (
//         <figure ref={contentRef}>
//           <img src={$image.src} alt={$captionInput.value}></img>
//           <figcaption>{$captionInput.value}</figcaption>
//         </figure>
//       );
//     },
//     parse: (element) => {
//       if (element.tagName === 'FIGURE') {
//         const caption = element.querySelector('figcaption').textContent ?? '';
//         const src = element.querySelector('img').getAttribute('src') ?? '';

//         return {
//           caption,
//           src,
//         };
//       }

//       return undefined;
//     },
//   },
// );
/**
 * TODO: ImageBlock은 새로 만들어야할듯
 */
