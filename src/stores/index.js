import { create } from 'zustand';

export const useStore = create((set) => ({
  imageCollection: {},
  addImage: (id, image) =>
    set((state) => {
      const newImageCollection = { ...state.imageCollection, [id]: image };
      return {
        imageCollection: newImageCollection,
      };
    }),
  removeImage: (id) =>
    set((state) => {
      const newImageCollection = { ...state.imageCollection };
      delete newImageCollection[id];

      return {
        imageCollection: newImageCollection,
      };
    }),
}));
