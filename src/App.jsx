import { useRef } from 'react';

import { BlockEditor } from './components/BlockEditor';
import { DownloadPannel } from './components/DownloadPannel/DownloadPannel';
import { ImageGallery } from './components/ImageGallery';

function App() {
  const editorRef = useRef(null);

  async function handleRemoveImage(id) {
    editorRef.current.removeImage(id);
  }

  return (
    <>
      <main className="w-full">
        <h1>Online Block Base Markdown Editor</h1>
        <DownloadPannel editorRef={editorRef}></DownloadPannel>
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
