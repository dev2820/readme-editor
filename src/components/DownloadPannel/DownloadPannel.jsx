import JSZip from 'jszip';

import { Button } from '@/components/ui/Button';
import { useBlockEditor } from '@/hooks/use-block-editor';
import { useImageStore } from '@/hooks/useImageStore';
import { downloadFile } from '@/utils';

export const DownloadPannel = () => {
  const { imageCollection } = useImageStore();
  const { toMarkdown } = useBlockEditor();

  async function handleDownloadMarkdown() {
    const content = await toMarkdown();
    const images = Object.values(imageCollection);

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
    const content = await toMarkdown();
    console.log(content, imageCollection);
  };

  return (
    <>
      <Button onClick={handleDownloadMarkdown}>Download</Button>
      <Button onClick={handleDebug}>(_debug) show markdown</Button>
    </>
  );
};
