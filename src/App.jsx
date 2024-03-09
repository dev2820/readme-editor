import { useRef } from 'react';

import { BlockEditor } from './components/BlockEditor';
import { Button } from './components/ui/Button';

function App() {
  const editorRef = useRef(null);
  async function handleExtractMarkdown() {
    console.log(await editorRef.current.getMarkdown());
  }
  return (
    <>
      <main className="w-full">
        <div className="flex flex-row justify-center overflow-hidden">
          <div className="w-200 h-160 overflow-auto">
            <BlockEditor ref={editorRef} className="h-full"></BlockEditor>
          </div>
        </div>
        <Button onClick={handleExtractMarkdown}>Hello World</Button>
      </main>
    </>
  );
}

export default App;
