import ModalImage from 'react-modal-image';

import { useImageStore } from '@/hooks/useImageStore';
import { cn } from '@/utils/cn';

import { Removable } from './Removable';

export const ImageGallery = ({ onRemove, className, ...props }) => {
  const { imageCollection, removeImage } = useImageStore();
  const images = Object.entries(imageCollection).map(([id, file]) => {
    return {
      id,
      file,
      name: file.name,
      url: window.URL.createObjectURL(file),
    };
  });
  const handleRemoveImage = (id) => {
    removeImage(id);
    if (onRemove) {
      onRemove(id);
    }
  };
  return (
    <div className={cn('flex flex-row flex-wrap', className)} {...props}>
      {images.map(({ id, url, name }) => (
        <Removable key={id} onRemove={() => handleRemoveImage(id)}>
          <ModalImage
            className="w-40"
            small={url}
            large={url}
            alt={name}
          ></ModalImage>
        </Removable>
      ))}
    </div>
  );
};
