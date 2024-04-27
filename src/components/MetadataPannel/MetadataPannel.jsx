import { useMetadata } from '@/hooks/use-metadata';

import { TitleInput } from '../TitleInput';

export function MetadataPannel() {
  const { title, setTitle } = useMetadata();

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <TitleInput
        className="align-center w-full mb-4"
        placeholder="Title"
        value={title}
        onChange={handleChangeTitle}
      ></TitleInput>
    </>
  );
}
