import { useRef, useState } from 'react';

import { Button } from '@/components/ui/Button';
import * as Icon from '@/components/ui/Icon';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Toggle } from '@/components/ui/Toggle';

export function SelectionMenu({ editor }) {
  const inputLinkRef = useRef(null);
  const [href, setHref] = useState('');
  const handleLinkPopoverOpenChange = (isOpen) => {
    if (isOpen) {
      setHref(getHref(editor));
    }
  };
  const handleChangeLinkInput = (e) => {
    const newHref = e.target.value;
    setHref(newHref);
  };

  const handleKeyDownLinkInput = (e) => {
    if (e.key === 'Enter') {
      editor.chain().focus().toggleLink({ href, target: '_blank' }).run();
    }
  };

  const getHref = (editor) => {
    if (!editor.isActive('link')) {
      return '';
    }
    const node = editor.state.selection.$from.nodeAfter;
    const linkMark = node.marks.find((mark) => mark.type.name === 'link');
    const href = linkMark.attrs.href;
    return href;
  };

  const handleRemoveLink = () => {
    editor.chain().focus().toggleLink().run();
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
      <Popover onOpenChange={handleLinkPopoverOpenChange}>
        <PopoverTrigger asChild>
          <span>
            <Toggle size="sm" pressed={editor.isActive('link')}>
              <Icon.Link size="16" />
            </Toggle>
          </span>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col">
          <Label htmlFor="url-link-input" className="mb-2">
            URL
          </Label>
          <Input
            id="url-link-input"
            ref={inputLinkRef}
            className="mb-2"
            value={href}
            onChange={handleChangeLinkInput}
            onKeyDown={handleKeyDownLinkInput}
          ></Input>
          {editor.isActive('link') ? (
            <>
              <Button size="sm" onClick={handleRemoveLink}>
                <Icon.Trash size="16" className="mr-1" />
                Remove Link
              </Button>
            </>
          ) : (
            <></>
          )}
        </PopoverContent>
      </Popover>
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
