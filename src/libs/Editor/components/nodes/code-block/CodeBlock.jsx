import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

export const CodeBlock = ({ node, editor, getPos }) => {
  const attrs = node.attrs;

  const handleSelectLanguage = (e) => {
    const newLanguage = e.target.value;

    editor
      .chain()
      .command(({ tr }) => {
        const position = getPos();
        const currentNode = tr.doc.nodeAt(position);
        tr.setNodeMarkup(position, undefined, {
          ...currentNode?.attrs,
          language: newLanguage,
        });

        return true;
      })
      .run();
  };

  return (
    <NodeViewWrapper
      data-type="codeBlock"
      data-language={attrs.language}
      data-id={attrs['data-id']}
    >
      <pre>
        <menu className="label" contentEditable={false}>
          <li>
            <select onChange={handleSelectLanguage}>
              <option value="js">js</option>
              <option value="ts">ts</option>
            </select>
          </li>
        </menu>
        <code>
          <NodeViewContent className="content" />
        </code>
      </pre>
    </NodeViewWrapper>
  );
};
