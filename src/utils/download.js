/**
 * download given file
 * @param {Blob} file Blob file to download
 * @param {string?} fileName file name, if is empty then use file.name
 */
export const downloadFile = (file, fileName) => {
  const url = window.URL.createObjectURL(file);
  const a = document.createElement('a');
  a.setAttribute('download', fileName ?? file.name);
  a.setAttribute('href', url);
  a.click();
  window.URL.revokeObjectURL(url);
};
