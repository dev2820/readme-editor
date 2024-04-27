import { TiptapEditor } from '@/libs/Editor';

import { DownloadPannel } from './components/DownloadPannel/DownloadPannel';
import { TitleInput } from './components/TitleInput';
import { EditorProvider } from './libs/Editor/contexts/editor-context';

function App() {
  const [title, setTitle] = useState('');

  return (
    <>
      <EditorProvider>
        <main className="w-full flex flex-col items-center">
          <h1 className="text-center">Online Block Base Markdown Editor</h1>
          <div className="flex flex-row justify-center gap-4">
            <DownloadPannel></DownloadPannel>
          </div>
          <p className="text-center">
            공사중입니다. 기능이 제대로 동작하지 않을 가능성이 커요
          </p>
          <section className="w-150">
            <TitleInput
              className="align-center w-full mb-4"
              placeholder="Title"
              value={title}
            ></TitleInput>
          </section>
          <div className="w-150">
            <TiptapEditor className="border-1 p-4"></TiptapEditor>
          </div>
        </main>
      </EditorProvider>
    </>
  );
}

export default App;
