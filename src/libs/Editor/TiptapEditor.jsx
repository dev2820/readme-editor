import { EditorContent, FloatingMenu, findChildren } from '@tiptap/react';
import { useRef } from 'react';

import { Button } from '@/components/ui/Button';

import { BubbleMenu } from './components/BubbleMenu';
import './editor.css';
import { useEditor } from './hooks/use-editor';
import { getCurrentBlock, getCurrentNode } from './utils/tiptap';

export function TiptapEditor({ ...props }) {
  const containerRef = useRef();
  const { editor } = useEditor();
  return (
    <>
      <div ref={containerRef} {...props}>
        <EditorContent editor={editor}></EditorContent>
      </div>
      {editor && (
        <BubbleMenu editor={editor} containerRef={containerRef}></BubbleMenu>
      )}
      {editor && (
        <FloatingMenu
          editor={editor}
          shouldShow={() => true}
          tippyOptions={{
            duration: 100,
            getReferenceClientRect: () => {
              if (editor.view.lastSelectedViewDesc) {
                const $block = editor.view.lastSelectedViewDesc.dom;
                const rect = $block.getBoundingClientRect();
                const $root = editor.view.dom;
                const rootX = $root.getBoundingClientRect().x;
                return new DOMRect(rootX, rect.y, rect.width, rect.height);
              }
              const $block = getCurrentBlock(editor);
              const rect = $block?.getBoundingClientRect();
              const $root = editor.view.dom;
              const rootX = $root.getBoundingClientRect().x;
              return new DOMRect(rootX, rect.y, rect.width, rect.height);
            },
            placement: 'left-start',
          }}
        >
          <Button
            onClick={() => {
              const focusNode = getCurrentNode(editor);

              const focusId = focusNode
                ? focusNode.attrs['data-id']
                : editor.view.lastSelectedViewDesc.dom.dataset.id;

              const currentNode = findChildren(
                editor.state.doc,
                (node) => node.attrs['data-id'] === focusId,
              )[0];
              if (currentNode) {
                editor
                  .chain()
                  .focus()
                  .deleteRange({
                    from: currentNode.pos,
                    to: currentNode.pos + currentNode.node.nodeSize,
                  })
                  .run();
              }
            }}
          >
            remove
          </Button>
        </FloatingMenu>
      )}
    </>
  );
}
