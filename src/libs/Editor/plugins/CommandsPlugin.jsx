import { Extension } from '@tiptap/core';
import { ReactRenderer } from '@tiptap/react';
import { Suggestion } from '@tiptap/suggestion';
import tippy from 'tippy.js';

import * as Icon from '@/components/ui/Icon';

import { CommandsView } from '../components/CommandsView';

export const Commands = Extension.create({
  name: 'insertMenu',
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range, props });
        },
        items: ({ query }) => {
          return [
            {
              title: 'Heading1',
              icon: (
                <Icon.Heading1 size="36" className="bg-white rounded-lg p-2" />
              ),
              attrs: {
                'data-test-id': 'insert-heading1',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setNode('heading', { level: 1 })
                  .run();
              },
            },
            {
              title: 'Heading2',
              icon: (
                <Icon.Heading2 size="36" className="bg-white rounded-lg p-2" />
              ),
              attrs: {
                'data-test-id': 'insert-heading2',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setNode('heading', { level: 2 })
                  .run();
              },
            },
            {
              title: 'Heading3',
              icon: (
                <Icon.Heading3 size="36" className="bg-white rounded-lg p-2" />
              ),
              attrs: {
                'data-test-id': 'insert-heading3',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setNode('heading', { level: 3 })
                  .run();
              },
            },
            {
              title: 'Heading4',
              icon: (
                <Icon.Heading4 size="36" className="bg-white rounded-lg p-2" />
              ),
              attrs: {
                'data-test-id': 'insert-heading4',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setNode('heading', { level: 4 })
                  .run();
              },
            },
            {
              title: 'Heading5',
              icon: (
                <Icon.Heading5 size="36" className="bg-white rounded-lg p-2" />
              ),
              attrs: {
                'data-test-id': 'insert-heading5',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setNode('heading', { level: 5 })
                  .run();
              },
            },
            {
              title: 'Heading6',
              icon: (
                <Icon.Heading6 size="36" className="bg-white rounded-lg p-2" />
              ),
              attrs: {
                'data-test-id': 'insert-heading6',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const to = selection.$from.posAtIndex(1);
                const from = selection.$from.posAtIndex(0);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setNode('heading', { level: 6 })
                  .run();
              },
            },
            {
              title: 'Quote',
              icon: (
                <Icon.TextQuote size="36" className="bg-white rounded-lg p-2" />
              ),
              attrs: {
                'data-test-id': 'insert-quote',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setBlockquote()
                  .run();
              },
            },
            {
              title: 'Bullet List',
              icon: <Icon.List size="36" className="bg-white rounded-lg p-2" />,
              attrs: {
                'data-test-id': 'insert-bullet-list',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .toggleBulletList()
                  .run();
              },
            },
            {
              title: 'Numbered List',
              icon: (
                <Icon.ListOrdered
                  size="36"
                  className="bg-white rounded-lg p-2"
                />
              ),
              attrs: {
                'data-test-id': 'insert-ordered-list',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .toggleOrderedList()
                  .run();
              },
            },
            {
              title: 'Task List',
              icon: (
                <Icon.ListTodo size="36" className="bg-white rounded-lg p-2" />
              ),
              attrs: {
                'data-test-id': 'insert-ordered-list',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .toggleTaskList()
                  .run();
              },
            },
            {
              title: 'Code Block',
              icon: <Icon.Code size="36" className="bg-white rounded-lg p-2" />,
              attrs: {
                'data-test-id': 'insert-code',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setCodeBlock()
                  .run();
              },
            },
            {
              title: 'Note Alert',
              icon: <Icon.Info size="36" className="bg-white rounded-lg p-2" />,
              attrs: {
                'data-test-id': 'insert-alert',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setAlert('note')
                  .run();
              },
            },
            {
              title: 'Tip Alert',
              icon: (
                <Icon.Lightbulb size="36" className="bg-white rounded-lg p-2" />
              ),
              attrs: {
                'data-test-id': 'insert-alert',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setAlert('tip')
                  .run();
              },
            },
            {
              title: 'Important Alert',
              icon: (
                <Icon.MessageSquareWarning
                  size="36"
                  className="bg-white rounded-lg p-2"
                />
              ),
              attrs: {
                'data-test-id': 'insert-alert',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setAlert('important')
                  .run();
              },
            },
            {
              title: 'Warning Alert',
              icon: (
                <Icon.TriangleAlert
                  size="36"
                  className="bg-white rounded-lg p-2"
                />
              ),
              attrs: {
                'data-test-id': 'insert-alert',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setAlert('warning')
                  .run();
              },
            },
            {
              title: 'Caution Alert',
              icon: (
                <Icon.OctagonAlert
                  size="36"
                  className="bg-white rounded-lg p-2"
                />
              ),
              attrs: {
                'data-test-id': 'insert-alert',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setAlert('caution')
                  .run();
              },
            },
            {
              title: 'External Image',
              icon: (
                <Icon.Image size="36" className="bg-white rounded-lg p-2" />
              ),
              attrs: {
                'data-test-id': 'insert-external-image',
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                const src = window.prompt('input image url');

                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .insertContentAt(from, {
                    type: 'external-image',
                    attrs: { src },
                  })
                  .run();
              },
            },
          ].filter((item) => {
            return item.title.toLowerCase().startsWith(query.toLowerCase());
          });
        },
        startOfLine: true,
        allow: ({ state }) => {
          const node = state.selection.$from.node();
          if (!node) return false;
          return node.textBetween(0, 1) === '/';
        },
        render: () => {
          let component, popup;
          return {
            onStart: (props) => {
              component = new ReactRenderer(CommandsView, {
                props,
                editor: props.editor,
              });
              popup = tippy(props.editor.options.element, {
                getReferenceClientRect: props.clientRect,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
              });
            },
            onUpdate: (props) => {
              component.updateProps(props);
              popup.setProps({
                getReferenceClientRect: props.clientRect,
              });
            },
            onKeyDown: ({ event }) => {
              if (event.key === 'Escape') {
                popup.hide();
                return true;
              }
              if (component.ref) return component.ref.onKeyDown(event);
              else return true;
            },
            onExit: () => {
              component.destroy();
              popup.destroy();
            },
          };
        },
      }),
    ];
  },
});
