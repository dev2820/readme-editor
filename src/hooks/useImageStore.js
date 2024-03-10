import { useStore } from '@/stores';

export const useImageStore = () => {
  const imageCollection = useStore((state) => state.imageCollection);
  const _addImage = useStore((state) => state.addImage);
  const removeImage = useStore((state) => state.removeImage);
  const addImage = (id, file) => {
    _addImage(id, file);
    return id;
  };
  return {
    imageCollection,
    addImage,
    removeImage,
  };
};
