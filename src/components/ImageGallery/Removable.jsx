import { XIcon } from 'lucide-react';

import { Button } from '../ui/Button';

export const Removable = ({ onRemove, children }) => {
  return (
    <span className="relative">
      {children}
      <Button
        className="absolute top-0 right-0"
        onClick={onRemove}
        variant="outline"
        size="icon"
      >
        <XIcon></XIcon>
      </Button>
    </span>
  );
};
