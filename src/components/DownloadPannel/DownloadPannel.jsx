import JSZip from 'jszip';

import { Button } from '@/components/ui/Button';
import { useImageStore } from '@/hooks/useImageStore';
import { downloadFile } from '@/utils';

export const DownloadPannel = ({ editorRef }) => {
  const { imageCollection } = useImageStore();

  async function handleDownloadMarkdown() {
    const content = await editorRef.current.getMarkdown();
    const zip = new JSZip();
    zip.file('index.md', content);
    const imagesFolder = zip.folder('images');
    Object.values(imageCollection).forEach((image) => {
      imagesFolder.file(image.name, image);
    });
    zip.generateAsync({ type: 'blob' }).then((content) => {
      downloadFile(content, 'post.zip');
    });
  }

  const handleDebug = async () => {
    const content = await editorRef.current.getMarkdown();
    console.log(content, imageCollection);
  };

  return (
    <div>
      <Button onClick={handleDownloadMarkdown}>Download</Button>
      <Button onClick={handleDebug}>(_debug) show markdown</Button>
    </div>
  );
};
