import JSZip from 'jszip';

import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { useMetadata } from '@/hooks/use-metadata';
import { useToggle } from '@/hooks/use-toggle';
import { useEditor } from '@/libs/Editor/hooks/use-editor';
import { downloadFile } from '@/utils';
import { fetchAllImage } from '@/utils/storage';

export const DownloadPannel = () => {
  const editor = useEditor();
  const metadata = useMetadata();
  const titleAsFilename = useToggle(false);

  async function handleDownloadMarkdown() {
    const content = await editor.toMarkdown();
    const meta = metadata.toMarkdown();
    const parser = new DOMParser();
    const dom = parser.parseFromString(await editor.toHTML(), 'text/html');
    const $images = [...dom.querySelectorAll('img')];

    const images = fetchAllImage().filter(([key]) => {
      return (
        $images.findIndex(($image) => $image.dataset['imageKey'] === key) > -1
      );
    });
    const filename = titleAsFilename.isOn
      ? `${metadata.title || 'index'}.md`
      : 'index.md';

    const zip = new JSZip();
    zip.file(filename, `${meta}\n${content}`);
    if (images.length > 0) {
      const imagesFolder = zip.folder('images');
      images.forEach(([key, image]) => {
        imagesFolder.file(key, image);
      });
    }

    zip.generateAsync({ type: 'blob' }).then((content) => {
      downloadFile(content, 'post.zip');
    });
  }

  const handleDebug = async () => {
    const images = fetchAllImage();
    const content = await editor.toMarkdown();
    console.log(content, images);
  };

  const handleCopyMarkdown = async () => {
    const content = await editor.toMarkdown();
    const meta = metadata.toMarkdown();

    navigator.clipboard.writeText(`${meta}\n${content}`);
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        <Button onClick={handleDownloadMarkdown}>Download</Button>
        <Button onClick={handleDebug}>(_debug) show markdown</Button>
        <Button onClick={handleCopyMarkdown}>Copy Markdown</Button>
      </div>
      <div>
        <label>
          <Checkbox
            value={titleAsFilename.isOn}
            onClick={titleAsFilename.toggle}
            className="mr-1"
          />
          use title as a filename
        </label>
      </div>
    </>
  );
};
