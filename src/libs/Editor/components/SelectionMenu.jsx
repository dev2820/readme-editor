import { cn } from '@/utils';

export function SelectionMenu({ editor, selectionType, setSelectionType }) {
  switch (selectionType) {
    case null:
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
            onClick={() => {
              setSelectionType('link');
            }}
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
    case 'link':
      return (
        <div className="insert-link-box">
          <input
            data-test-id="insert-link-value"
            autoFocus
            type="text"
            placeholder="Insert link address"
            onKeyDown={(event) => {
              console.log(editor);
              if (event.key === 'Enter') {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange('link')
                  .setLink({
                    href: event.target.value,
                    target: '_blank',
                  })
                  .run();
                setSelectionType(null);
              }
            }}
          />
        </div>
      );
  }
}
