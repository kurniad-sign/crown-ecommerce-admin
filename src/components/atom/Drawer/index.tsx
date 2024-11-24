'use client';

import { ForwardedRef, HTMLAttributes, useEffect, useRef } from 'react';
import { Button, cn } from '@nextui-org/react';
import FocusTrap from 'focus-trap-react';
import { AnimatePresence, cubicBezier, motion, Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import { fixedForwardRef } from '~/components/helpers';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  removeWhenClosed?: boolean;
  width?: number;
  title?: string;
} & HTMLAttributes<HTMLDivElement>;

const UnwrappedDrawer = (props: DrawerProps, ref: ForwardedRef<any>) => {
  const {
    children,
    className,
    isOpen,
    onClose,
    position = 'right',
    removeWhenClosed,
    width,
  } = props;

  function createPortalRoot() {
    const drawerRoot = document.createElement('div');
    drawerRoot.setAttribute('id', 'drawer-root');

    return drawerRoot;
  }

  const bodyRef = useRef<HTMLBodyElement | null>(
    document.querySelector('body')
  );
  const portalRootRef = useRef(
    document.getElementById('drawer-root') || createPortalRoot()
  );

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.appendChild(portalRootRef.current);
      const portal = portalRootRef.current;
      const bodyEl = bodyRef.current;

      return () => {
        portal.remove();
        bodyEl.style.overflow = '';
      };
    }
  }, []);

  useEffect(() => {
    const updatePageScroll = () => {
      if (bodyRef.current) {
        bodyRef.current.style.overflow = isOpen ? 'hidden' : '';
      }
    };

    updatePageScroll();
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = ({ key }: KeyboardEvent) =>
      key === 'Escape' && onClose();

    if (isOpen) {
      window.addEventListener('keyup', handleEscapeKey);
    }

    return () => {
      window.removeEventListener('keyup', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (removeWhenClosed && !isOpen) {
    return null;
  }

  const drawerVariants: Variants = {
    hidden: { x: position === 'left' ? '-100%' : '100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: position === 'left' ? '-100%' : '100%', opacity: 0 },
  };

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
    exit: { opacity: 0 },
  };

  return createPortal(
    <FocusTrap active={isOpen}>
      <div
        ref={ref}
        aria-hidden={isOpen ? 'false' : 'true'}
        className={className}
      >
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-40 bg-black"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={backdropVariants}
                transition={{
                  ease: cubicBezier(0.7, 0, 0.24, 0.99),
                  duration: 0.5,
                }}
                onClick={onClose}
              />
              {/* Drawer */}
              <motion.div
                className={cn(
                  'fixed z-50 flex h-full flex-col gap-8 overflow-auto bg-background p-6 shadow-md',
                  position === 'left' ? 'left-0 top-0' : 'right-0 top-0'
                )}
                style={{ width }}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={drawerVariants}
                transition={{
                  ease: cubicBezier(0.7, 0, 0.24, 0.99),
                  duration: 0.5,
                }}
              >
                <Button
                  type="button"
                  variant="light"
                  className="absolute right-4 top-4 z-50"
                  onClick={onClose}
                  size="sm"
                  radius="full"
                  isIconOnly
                >
                  <X size={18} />
                </Button>
                {children}
                {/* <div className="relative shrink-0 grow">{children}</div> */}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </FocusTrap>,
    portalRootRef.current
  );
};

export const Drawer = fixedForwardRef(UnwrappedDrawer);
