export const getCurrentBlock = (editor) => {
  const selection = editor.state.selection;
  const doc = editor.state.doc;
  if (selection.$cursor) {
    const id = doc.resolve(selection.$cursor.pos).parent.attrs['data-id'];
    return document.querySelector(`[data-id="${id}"]`);
  } else if (selection.$focus) {
    const id = doc.resolve(selection.$focus.pos).parent.attrs['data-id'];
    return document.querySelector(`[data-id="${id}"]`);
  }
};
