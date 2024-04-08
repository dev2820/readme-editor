export const getNodePlaceholder = (node) => {
  if (node.type.name === 'heading') {
    return `write header${node.attrs.level} contents`;
  }
  if (node.type.name === 'blockquote') {
    return 'write blockquote contents';
  }
  if (node.type.name === 'bulletList') {
    return `write bulletList item's contents`;
  }
  if (node.type.name === 'orderedList') {
    return `write ordered item's contents`;
  }
  if (node.type.name === 'taskItem') {
    return `write todo item's contents`;
  }
  if (node.type.name === 'paragraph') {
    return 'write contents';
  }
  return '';
};
