import { useState } from 'react';

export function useToggle(defaultValue = false) {
  const [isOn, setIsOn] = useState(defaultValue);

  const toggle = () => setIsOn(!isOn);
  const on = () => setIsOn(true);
  const off = () => setIsOn(false);

  return {
    isOn,
    toggle,
    on,
    off,
  };
}
