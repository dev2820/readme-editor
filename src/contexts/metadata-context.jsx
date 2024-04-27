import { useState } from 'react';
import { createContext } from 'react';

import { isString } from '@/utils';

/**
 * @type {string} title
 */
const defaultValue = {
  title: '',
};

export const MetadataContext = createContext(defaultValue);

export const MetadataProvider = ({ children }) => {
  const [title, setTitle] = useState('');

  const toMarkdown = () => {
    let result = '';

    if (isString(title) && title.length > 0) {
      result += `title: ${title}\n`;
    }

    if (result === '') return '';

    return wrapText(result, '---\n');
  };

  return (
    <MetadataContext.Provider value={{ title, setTitle, toMarkdown }}>
      {children}
    </MetadataContext.Provider>
  );
};

const wrapText = (content, wrap) => {
  return `${wrap}${content}${wrap}`;
};
