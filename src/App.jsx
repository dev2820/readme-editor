import { TestEditor } from '@/libs/Editor/TestEditor';

// import { BlockEditor } from './components/BlockEditor';
import { DownloadPannel } from './components/DownloadPannel/DownloadPannel';
import { BlockEditorProvider } from './contexts/block-editor-context';

function App() {
  return (
    <>
      <BlockEditorProvider>
        <main className="w-full">
          <h1 className="text-center">Online Block Base Markdown Editor</h1>
          <div className="flex flex-row justify-center gap-4">
            <DownloadPannel></DownloadPannel>
          </div>
          {/* <div className="flex flex-row justify-center overflow-hidden">
            <BlockEditor className="w-200 h-160 overflow-auto"></BlockEditor>
          </div> */}
          <div className="flex flex-row justify-center overflow-hidden ">
            <TestEditor className="w-200 border-1"></TestEditor>
          </div>
        </main>
      </BlockEditorProvider>
    </>
  );
}

export default App;
