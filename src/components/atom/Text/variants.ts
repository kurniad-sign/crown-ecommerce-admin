import { tv } from '@nextui-org/react';

export const textVariant = tv({
  base: 'leading-6 font-[450]',
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
    },
    weight: {
      light: 'font-light',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    italic: {
      true: 'italic',
    },
    strikethrough: {
      true: 'line-through',
    },
    caption: {
      true: 'uppercase tracking-wider',
    },
    size: {
      xsmall: 'text-xs',
      small: 'text-sm',
      large: 'text-xl',
      xlarge: 'text-2xl',
    },
  },
  defaultVariants: {
    italic: false,
    strikethrough: false,
  },
});

export type TextVariantProps = typeof textVariant;
