import { ComponentPropsWithRef, ForwardedRef } from 'react';
import { cn } from '@nextui-org/react';

import { DistributiveOmit, fixedForwardRef } from '~/components/helpers';

type TagName = 'div' | 'header' | 'footer';

type Distributive<TAs extends TagName> = DistributiveOmit<
  ComponentPropsWithRef<TagName extends TAs ? 'div' : TAs>,
  'component'
>;

type DrawerFooterProps<TAs extends TagName> = {
  component?: TAs;
} & Distributive<TAs>;

const UnwrappedDrawerFooter = <TAs extends TagName>(
  props: DrawerFooterProps<TAs>,
  ref: ForwardedRef<any>
) => {
  const {
    children,
    className,
    component: Component = 'footer',
    ...rest
  } = props;

  return (
    <Component
      ref={ref}
      className={cn('relative flex flex-initial', className)}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const DrawerFooter = fixedForwardRef(UnwrappedDrawerFooter);
