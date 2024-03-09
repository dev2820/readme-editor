export const downloadFile = (file) => {
  const url = window.URL.createObjectURL(file);
  const a = document.createElement('a');
  a.setAttribute('download', file.name);
  a.setAttribute('href', url);
  a.click();
  window.URL.revokeObjectURL(url);
};
