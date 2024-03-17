import { createContext, useState } from 'react';

/**
 * @type {boolean} isOpen
 */
const defaultValue = {
  open: () => {},
  close: () => {},
};

export const DialogContext = createContext(defaultValue);

export const DialogProvider = ({ children }) => {
  const [current, setCurrent] = useState('');
  const [props, setProps] = useState({});

  const open = (dialogName, props) => {
    setCurrent(dialogName);
    setProps({
      ...props,
    });
  };

  const close = () => {
    setCurrent(null);
  };

  const isOpen = current === null;

  return (
    <DialogContext.Provider value={{ isOpen, current, props, open, close }}>
      {children}
    </DialogContext.Provider>
  );
};
