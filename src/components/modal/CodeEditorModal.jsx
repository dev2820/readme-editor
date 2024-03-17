import { useState } from 'react';
import { useEffect } from 'react';

import { CodeEditor } from '@/components/CodeEditor';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { useDialog } from '@/hooks/use-dialog';

/**
 * Confirm, Alert 등 추출해내기
 * lang selector 만들기
 */

export const CodeEditorModal = () => {
  const dialog = useDialog();
  const [code, setCode] = useState(dialog.props.code);
  const [lang, setLang] = useState(dialog.props.lang);

  const handleClickClose = () => {
    if (dialog.props.onClose) {
      dialog.props.onClose();
    }
    dialog.close();
  };
  const handleClickConfirm = () => {
    if (dialog.props.onConfirm) {
      dialog.props.onConfirm(code);
    }
    dialog.close();
  };

  const handleChangeCode = (code) => {
    setCode(code);
  };

  const handleChangeLanguage = (lang) => {
    setLang(lang);
  };

  useEffect(() => {
    setCode(dialog.props.code);
  }, [dialog.props.code]);
  return (
    dialog.current === CodeEditorModal.displayName && (
      <div role="dialog">
        <Overlay></Overlay>
        <Content>
          <Title>Edit Code Block Here</Title>
          <div className="flex flex-row justify-end my-1">
            <Select onValueChange={handleChangeLanguage} defaultValue={lang}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="js">Javascript</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CodeEditor
            height={240}
            width={480}
            lang={lang}
            initCode={code}
            onChangeCode={handleChangeCode}
          ></CodeEditor>
          <Footer>
            <Button onClick={handleClickClose} variant="ghost">
              Close
            </Button>
            <Button onClick={handleClickConfirm}>Apply</Button>
          </Footer>
        </Content>
      </div>
    )
  );
};

CodeEditorModal.displayName = 'CodeEditorModal';

const Overlay = () => (
  <div className="fixed left-0 top-0 w-full h-full bg-black/80"></div>
);

const Content = ({ children }) => {
  return (
    <section className="fixed left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%] bg-white rounded-lg p-6">
      {children}
    </section>
  );
};

const Footer = ({ children }) => {
  return <div className="flex flex-row justify-end mt-4 gap-2">{children}</div>;
};

const Title = ({ children }) => {
  return <h3 className="text-xl font-bold">{children}</h3>;
};
