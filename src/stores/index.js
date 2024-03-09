import { create } from 'zustand';

export const useStore = create((set) => ({
  // https://docs.pmnd.rs/zustand/getting-started/introduction
  // image collection 만들기
  imageCollection: [],
}));
