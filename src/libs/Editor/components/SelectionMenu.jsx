import * as Icon from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';

export function SelectionMenu({ editor }) {
  const handleClickLink = () => {
    if (editor.isActive('link')) {
      editor.chain().focus().toggleLink().run();
    } else {
      const url = window.prompt('url');
      if (url) {
        editor
          .chain()
          .focus()
          .toggleLink({
            href: url,
            target: '_blank',
          })
          .run();
      }
    }
  };

  if (editor.isActive('horizontalRule')) {
    return (
      <Button variant="ghost" size="icon">
        <Icon.Trash2
          size="16"
          onClick={() => editor.chain().deleteSelection().focus().run()}
        />
      </Button>
    );
  }

  if (editor.isActive('internalImage')) {
    /**
     * TODO: Image에 대한 메뉴 만들기
     * - 사이즈 조절 변경
     *
     */
    return (
      <>
        <Button variant="ghost" size="icon">
          <Icon.Trash2
            size="16"
            onClick={() => editor.chain().deleteSelection().focus().run()}
          />
        </Button>
      </>
    );
  }

  return (
    <>
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onClick={() => editor.chain().toggleBold().run()}
      >
        <Icon.Bold size="16" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onClick={() => editor.chain().toggleItalic().run()}
      >
        <Icon.Italic size="16" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('underline')}
        onClick={() => editor.chain().toggleUnderline().run()}
      >
        <Icon.Underline size="16" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onClick={() => editor.chain().toggleStrike().run()}
      >
        <Icon.Strikethrough size="16" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('link')}
        onClick={handleClickLink}
      >
        <Icon.Link size="16" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('code')}
        onClick={() => editor.chain().toggleCode().run()}
      >
        <Icon.Code size="16" />
      </Toggle>
    </>
  );
}
