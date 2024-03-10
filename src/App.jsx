import { useRef } from 'react';

import { BlockEditor } from './components/BlockEditor';
import { ImageGallery } from './components/ImageGallery';
import { Button } from './components/ui/Button';
import { downloadFile } from './utils';

function App() {
  const editorRef = useRef(null);

  async function handleExtractMarkdown() {
    const content = await editorRef.current.getMarkdown();
    // const file = new File([content], 'index.md', {
    //   type: 'text/plain',
    // });
    // downloadFile(file);
    console.log(content);
  }

  async function handleRemoveImage(id) {
    editorRef.current.removeImage(id);
  }

  return (
    <>
      <main className="w-full">
        <h1>Online Block Base Markdown Editor</h1>
        <div>
          <Button onClick={handleExtractMarkdown}>Download</Button>
        </div>
        <div className="flex flex-row justify-center overflow-hidden">
          <ImageGallery
            className="w-sm"
            onRemove={handleRemoveImage}
          ></ImageGallery>
          <div className="w-200 h-160 overflow-auto">
            <BlockEditor ref={editorRef} className="h-full"></BlockEditor>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
