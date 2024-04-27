import { useState } from 'react';
import { createContext } from 'react';

/**
 * @type {string} title
 * @type {Date} created
 * @type {Date} modified
 */
const defaultValue = {
  title: '',
  created: new Date(),
  modified: new Date(),
};

export const MetadataContext = createContext(defaultValue);

export const MetadataProvider = ({ children }) => {
  const [title, setTitle] = useState('');
  const [created, setCreated] = useState(new Date());
  const [modified, setModified] = useState(new Date());

  const toMarkdown = () => {
    let result = '';

    if (title.length > 0) {
      result += `title: ${title}\n`;
    }

    if (created) {
      result += `created: ${created.toISOString()}\n`;
    }

    if (modified) {
      result += `modified: ${modified.toISOString()}\n`;
    }

    if (result === '') return '';

    return wrapText(result, '---\n');
  };

  const context = {
    title,
    setTitle,
    created,
    setCreated,
    modified,
    setModified,
    toMarkdown,
  };

  return (
    <MetadataContext.Provider value={context}>
      {children}
    </MetadataContext.Provider>
  );
};

const wrapText = (content, wrap) => {
  return `${wrap}${content}${wrap}`;
};
