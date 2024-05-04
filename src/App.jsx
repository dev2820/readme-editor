import { Button } from '@/components/ui/Button';
import { TiptapEditor } from '@/libs/Editor';

import { Seo } from './Seo';
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
            <section className="w-689px mb-120px">
              <DownloadPannel></DownloadPannel>
              <FrontmatterPannel></FrontmatterPannel>
              <TiptapEditor className="border-1 p-4 rounded-lg"></TiptapEditor>
            </section>
            <Seo></Seo>
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
