import { useRef } from 'react';

import { BlockEditor } from './components/BlockEditor';
import { DownloadPannel } from './components/DownloadPannel/DownloadPannel';

function App() {
  const editorRef = useRef(null);

  return (
    <>
      <main className="w-full">
        <h1 className="text-center">Online Block Base Markdown Editor</h1>
        <div className="flex flex-row justify-center gap-4">
          <DownloadPannel editorRef={editorRef}></DownloadPannel>
        </div>
        <div className="flex flex-row justify-center overflow-hidden">
          <div className="w-200 h-160 overflow-auto">
            <BlockEditor ref={editorRef} className="h-full"></BlockEditor>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
