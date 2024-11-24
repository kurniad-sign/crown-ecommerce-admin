import { ComponentPropsWithRef, ForwardedRef } from 'react';
import { cn } from '@nextui-org/react';

import { DistributiveOmit, fixedForwardRef } from '~/components/helpers';

type TagName = 'div' | 'header' | 'footer';

type Distributive<TAs extends TagName> = DistributiveOmit<
  ComponentPropsWithRef<TagName extends TAs ? 'div' : TAs>,
  'component'
>;

type DrawerHeaderProps<TAs extends TagName> = {
  component?: TAs;
} & Distributive<TAs>;

const UnwrappedDrawerHeader = <TAs extends TagName>(
  props: DrawerHeaderProps<TAs>,
  ref: ForwardedRef<any>
) => {
  const {
    children,
    className,
    component: Component = 'header',
    ...rest
  } = props;

  return (
    <Component
      ref={ref}
      className={cn('relative flex flex-initial flex-col', className)}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const DrawerHeader = fixedForwardRef(UnwrappedDrawerHeader);
