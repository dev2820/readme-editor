import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils';

export const Text = React.forwardRef((props, forwardedRef) => {
  const { children, className, asChild, as = 'span', ...textProps } = props;

  const Comp = as;

  return (
    <Slot
      {...textProps}
      ref={forwardedRef}
      className={cn(textVariants({ ...textProps }), className)}
    >
      {asChild ? children : <Comp>{children}</Comp>}
    </Slot>
  );
});

Text.displayName = 'Text';

const textVariants = cva('leading-normal whitespace-nowrap transition-colors', {
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
      start: 'text-start',
      end: 'text-end',
    },
    weight: {
      light: 'font-light',
      regular: 'font-regular',
      medium: 'font-medium',
      bold: 'font-bold',
    },
    size: {
      '6xl': 'text-6xl',
      '5xl': 'text-5xl',
      '4xl': 'text-4xl',
      '3xl': 'text-3xl',
      '2xl': 'text-2xl',
      xl: 'text-xl',
      lg: 'text-lg',
      md: 'text-md',
      sm: 'text-sm',
      xs: 'text-xs',
    },
  },
  defaultVariants: {
    align: 'left',
    weight: 'regular',
    size: 'md',
  },
});
