import JSZip from 'jszip';

import { Button } from '@/components/ui/Button';
import { useBlockEditor } from '@/hooks/use-block-editor';
import { downloadFile } from '@/utils';
import { fetchAllImage } from '@/utils/storage';

export const DownloadPannel = () => {
  const blockEditor = useBlockEditor();

  async function handleDownloadMarkdown() {
    const content = await blockEditor.toMarkdown();
    const images = fetchAllImage();

    const zip = new JSZip();
    zip.file('index.md', content);
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
    const content = await blockEditor.toMarkdown();
    console.log(content, images);
  };

  const handleCopyMarkdown = async () => {
    const content = await blockEditor.toMarkdown();
    navigator.clipboard.writeText(content);
  };

  return (
    <>
      <Button onClick={handleDownloadMarkdown}>Download</Button>
      <Button onClick={handleDebug}>(_debug) show markdown</Button>
      <Button onClick={handleCopyMarkdown}>Copy Markdown</Button>
    </>
  );
};
