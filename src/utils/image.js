export const getSize = (imageFile) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  });
};

export const imageToUrl = (imageFile) => {
  return window.URL.createObjectURL(imageFile);
};
