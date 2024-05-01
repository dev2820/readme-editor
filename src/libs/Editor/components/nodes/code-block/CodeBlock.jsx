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

  const handleClickCopy = () => {
    editor
      .chain()
      .command(({ tr }) => {
        const position = getPos();
        const currentNode = tr.doc.nodeAt(position);

        const code = currentNode.content.content[0].text;
        console.log(code);

        navigator.clipboard.writeText(code);
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
        <menu className="label">
          <li>
            <select onChange={handleSelectLanguage}>
              <option value="js">js</option>
              <option value="ts">ts</option>
              <option value="ts">css</option>
              <option value="ts">html</option>
            </select>
          </li>
          <li>
            <button type="button" className="copy" onClick={handleClickCopy}>
              copy
            </button>
          </li>
        </menu>
        <code>
          <NodeViewContent className="content" />
        </code>
      </pre>
    </NodeViewWrapper>
  );
};
