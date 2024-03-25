import { CodeEditor } from '@/components/CodeEditor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

/**
 * Confirm, Alert 등 추출해내기
 */

export const CodeEditorModal = ({ code, lang, onChangeCode, onChangeLang }) => {
  const handleChangeCode = (code) => {
    onChangeCode(code);
  };

  const handleChangeLanguage = (lang) => {
    onChangeLang(lang);
  };

  return (
    <>
      <div className="flex flex-row justify-end my-1">
        <Select onValueChange={handleChangeLanguage} defaultValue={lang}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={langMap[lang] ?? 'Select Language'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="js" defaultValue>
              {langMap['js']}
            </SelectItem>
            <SelectItem value="ts">{langMap['ts']}</SelectItem>
            <SelectItem value="jsx">{langMap['jsx']}</SelectItem>
            <SelectItem value="tsx">{langMap['tsx']}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <CodeEditor
        height={240}
        width={460}
        lang={lang}
        initCode={code}
        onChangeCode={handleChangeCode}
      ></CodeEditor>
    </>
  );
};

CodeEditorModal.displayName = 'CodeEditorModal';

const langMap = {
  js: 'Javascript',
  ts: 'Typescript',
  jsx: 'JSX',
  tsx: 'TSX',
};
