import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils';

export const Heading = React.forwardRef((props, forwardedRef) => {
  const { children, className, asChild, as = 'span', ...headingProps } = props;

  const Comp = as;

  return (
    <Slot
      {...headingProps}
      ref={forwardedRef}
      className={cn(headingVariants({ ...headingProps, as }), className)}
    >
      {asChild ? children : <Comp>{children}</Comp>}
    </Slot>
  );
});

Heading.displayName = 'Heading';

const headingVariants = cva(
  'leading-normal whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        h1: 'text-5xl font-bold',
        h2: 'text-3xl font-bold',
        h3: 'text-2xl font-bold',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
        start: 'text-start',
        end: 'text-end',
      },
    },
    defaultVariants: {
      variant: 'h1',
      align: 'left',
    },
  },
);
