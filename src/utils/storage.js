const imageStorage = {};

export const fetchImage = (key) => {
  return imageStorage[key];
};

export const uploadImage = (key, file) => {
  imageStorage[key] = file;
};

export const fetchAllImage = () => {
  return Object.values(imageStorage);
};
