const imageStorage = {};

export const getImage = (key) => {
  return imageStorage[key];
};

export const setImage = (key, file) => {
  imageStorage[key] = file;
};

export const getAllImages = () => {
  return Object.values(imageStorage);
};
