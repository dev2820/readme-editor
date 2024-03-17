import { BlockEditor } from './components/BlockEditor';
import { DownloadPannel } from './components/DownloadPannel/DownloadPannel';
import { CodeEditorModal } from './components/modal/CodeEditorModal';
import { BlockEditorProvider } from './contexts/block-editor-context';
import { DialogProvider } from './contexts/dialog-context';

function App() {
  return (
    <>
      <DialogProvider>
        <BlockEditorProvider>
          <main className="w-full">
            <h1 className="text-center">Online Block Base Markdown Editor</h1>
            <div className="flex flex-row justify-center gap-4">
              <DownloadPannel></DownloadPannel>
            </div>
            <div className="flex flex-row justify-center overflow-hidden">
              <div className="w-200 h-160 overflow-auto">
                <BlockEditor className="h-full"></BlockEditor>
              </div>
            </div>
          </main>
        </BlockEditorProvider>
        <CodeEditorModal></CodeEditorModal>
      </DialogProvider>
    </>
  );
}

export default App;
