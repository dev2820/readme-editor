import { Button } from '@/components/ui/Button';
import { TiptapEditor } from '@/libs/Editor';

import { DownloadPannel } from './components/DownloadPannel/DownloadPannel';
import { FrontmatterPannel } from './components/FrontmatterPannel';
import { MetadataProvider } from './contexts/metadata-context';
import { EditorProvider } from './libs/Editor/contexts/editor-context';

function App() {
  return (
    <>
      <MetadataProvider>
        <EditorProvider>
          <main className="w-full flex flex-col items-center">
            <h1 className="text-center">Online Block Base Markdown Editor</h1>
            <DownloadPannel></DownloadPannel>
            <p className="text-center">
              공사중입니다. 기능이 제대로 동작하지 않을 가능성이 커요
            </p>
            <section className="w-150">
              <FrontmatterPannel></FrontmatterPannel>
            </section>
            <div className="w-896px">
              <TiptapEditor className="border-1 p-4 rounded-lg"></TiptapEditor>
            </div>
          </main>
          <footer className="h-100 text-center">
            made by{' '}
            <Button variant="link" asChild>
              <a href="https://github.com/dev2820" target="_blank">
                dev2820
              </a>
            </Button>
          </footer>
        </EditorProvider>
      </MetadataProvider>
    </>
  );
}

export default App;
