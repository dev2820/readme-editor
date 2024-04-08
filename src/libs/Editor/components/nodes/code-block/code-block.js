import _CodeBlock from '@tiptap/extension-code-block';
import { nanoid } from 'nanoid';

import { LowlightPlugin } from './lowlight-plugin.js';

export const CodeBlock = _CodeBlock.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      lowlight: {},
      defaultLanguage: null,
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      'data-id': {
        default: '',
        rendered: false,
      },
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    node.attrs['data-id'] = nanoid();
    const [tag, attrs, children] = this.parent({
      node,
      HTMLAttributes,
    });

    return [
      tag,
      {
        ...attrs,
        'data-id': node.attrs['data-id'],
        'data-type': this.name,
      },
      children,
    ];
  },

  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() || []),
      LowlightPlugin({
        name: this.name,
        lowlight: this.options.lowlight,
        defaultLanguage: this.options.defaultLanguage,
      }),
    ];
  },
});
