import { TestEditor } from '@/libs/Editor/TestEditor';

// import { BlockEditor } from './components/BlockEditor';
import { DownloadPannel } from './components/DownloadPannel/DownloadPannel';
import { EditorProvider } from './libs/Editor/contexts/editor-context';

function App() {
  return (
    <>
      <EditorProvider>
        <main className="w-full">
          <h1 className="text-center">Online Block Base Markdown Editor</h1>
          <div className="flex flex-row justify-center gap-4">
            <DownloadPannel></DownloadPannel>
          </div>
          {/* <div className="flex flex-row justify-center overflow-hidden">
            <BlockEditor className="w-200 h-160 overflow-auto"></BlockEditor>
          </div> */}
          <p className="text-center">
            공사중입니다. 기능이 제대로 동작하지 않을 가능성이 커요
          </p>
          <div className="flex flex-row justify-center overflow-hidden ">
            <TestEditor className="w-150 border-1"></TestEditor>
          </div>
        </main>
      </EditorProvider>
    </>
  );
}

export default App;
