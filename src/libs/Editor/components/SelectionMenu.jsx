import { cn } from '@/utils';

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

  return (
    <>
      <button
        type="button"
        data-test-id="mark-bold"
        className={cn('border-1', {
          'bg-grey': editor.isActive('bold'),
        })}
        onClick={() => editor.chain().toggleBold().run()}
      >
        bold
      </button>
      <button
        type="button"
        data-test-id="mark-italic"
        className={cn('border-1', {
          'bg-grey': editor.isActive('italic'),
        })}
        onClick={() => editor.chain().toggleItalic().run()}
      >
        italic
      </button>
      <button
        type="button"
        data-test-id="mark-underline"
        className={cn('border-1', {
          'bg-grey': editor.isActive('underline'),
        })}
        onClick={() => editor.chain().toggleUnderline().run()}
      >
        underline
      </button>
      <button
        type="button"
        data-test-id="mark-strike"
        className={cn('border-1', {
          'bg-grey': editor.isActive('strike'),
        })}
        onClick={() => editor.chain().toggleStrike().run()}
      >
        strike
      </button>
      <button
        type="button"
        data-test-id="mark-link"
        className={cn('border-1', {
          'bg-grey': editor.isActive('link'),
        })}
        onClick={handleClickLink}
      >
        link
      </button>
      <button
        type="button"
        data-test-id="mark-code"
        className={cn('border-1', {
          'bg-grey': editor.isActive('code'),
        })}
        onClick={() => editor.chain().toggleCode().run()}
      >
        code
      </button>
    </>
  );
}
