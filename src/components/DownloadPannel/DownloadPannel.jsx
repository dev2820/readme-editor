import JSZip from 'jszip';

import { Button } from '@/components/ui/Button';
import { useMetadata } from '@/hooks/use-metadata';
import { useEditor } from '@/libs/Editor/hooks/use-editor';
import { downloadFile } from '@/utils';
import { fetchAllImage } from '@/utils/storage';

export const DownloadPannel = () => {
  const editor = useEditor();
  const metadata = useMetadata();

  async function handleDownloadMarkdown() {
    const content = await editor.toMarkdown();
    const meta = metadata.toMarkdown();
    const images = fetchAllImage();

    const zip = new JSZip();
    zip.file('index.md', `${meta}\n${content}`);
    if (images.length > 0) {
      const imagesFolder = zip.folder('images');
      images.forEach((image) => {
        imagesFolder.file(image.name, image);
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
      <Button onClick={handleDownloadMarkdown}>Download</Button>
      <Button onClick={handleDebug}>(_debug) show markdown</Button>
      <Button onClick={handleCopyMarkdown}>Copy Markdown</Button>
    </>
  );
};
