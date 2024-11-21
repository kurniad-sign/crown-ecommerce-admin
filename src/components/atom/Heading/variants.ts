import { tv } from '@nextui-org/react';

export const headingVariant = tv({
  base: 'scroll-m-20 tracking-tight',
  variants: {
    variant: {
      ['display-1']: 'text-display-1 tracking-tighter leading-none',
      ['display-2']: 'text-display-2 tracking-tighter leading-none',
      ['title-1']: 'text-5xl',
      ['title-2']: 'text-4xl',
      ['title-3']: 'text-3xl',
      ['title-4']: 'text-2xl',
      ['title-5']: 'text-xl',
      ['title-6']: 'text-lg',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
  },
  defaultVariants: {
    variant: 'title-1',
    weight: 'semibold',
  },
});

export type HeadingVariantProps = typeof headingVariant;
