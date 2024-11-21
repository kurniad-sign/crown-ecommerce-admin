/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentPropsWithRef, ForwardedRef, useMemo } from 'react';
import { cn, type VariantProps } from '@nextui-org/react';

import { DistributiveOmit, fixedForwardRef } from '~/components/helpers';

import { headingVariant, type HeadingVariantProps } from './variants';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'div';

type Distributive<TAs extends HeadingTag> = DistributiveOmit<
  ComponentPropsWithRef<HeadingTag extends TAs ? 'div' : TAs>,
  'component'
>;

type HeadingProps<TAs extends HeadingTag> = {
  component?: TAs;
} & Distributive<TAs> &
  VariantProps<HeadingVariantProps>;

const UnwrappedHeading = <TAs extends HeadingTag>(
  props: HeadingProps<TAs>,
  ref: ForwardedRef<any>
) => {
  const {
    component: Component = 'div',
    className,
    children,
    align,
    variant,
    weight,
    ...rest
  } = props;

  const resolvedVariant = useMemo(() => {
    const componentToVariantMap: Record<HeadingTag, typeof variant> = {
      h1: 'title-1',
      h2: 'title-2',
      h3: 'title-3',
      h4: 'title-4',
      h5: 'title-5',
      div: 'title-6',
    };

    return variant ?? componentToVariantMap[Component];
  }, [Component, variant]);

  return (
    <Component
      ref={ref}
      className={cn(
        headingVariant({ className, variant: resolvedVariant, align, weight })
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const Heading = fixedForwardRef(UnwrappedHeading);
