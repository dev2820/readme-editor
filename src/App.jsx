import { BlockEditor } from './components/BlockEditor';
import { DownloadPannel } from './components/DownloadPannel/DownloadPannel';
import { CodeEditorModal } from './components/modal/CodeEditorModal';
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
          <div className="flex flex-row justify-center overflow-hidden">
            <BlockEditor className="w-200 h-160 overflow-auto"></BlockEditor>
          </div>
        </main>
      </BlockEditorProvider>
      <CodeEditorModal></CodeEditorModal>
    </>
  );
}

export default App;
