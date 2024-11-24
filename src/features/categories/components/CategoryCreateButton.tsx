'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Save } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { DrawerFooter, DrawerHeader, Heading } from '~/components/atom';
import { categorySchema, CategorySchema } from '~/lib/validations/categories';

const Drawer = dynamic(
  () => import('~/components/atom').then((component) => component.Drawer),
  { ssr: false }
);

export function CategoryCreateButton() {
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
    },
  });

  const onOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    if (!isOpenDrawer) {
      reset();
      onCloseDrawer();
    }
  }, [isOpenDrawer, reset]);

  const handleSubmitCategory: SubmitHandler<CategorySchema> = (payload) => {
    console.log(payload);
  };

  return (
    <>
      <Button
        color="primary"
        className="font-medium"
        startContent={<Plus size={16} strokeWidth={2.5} />}
        onPress={onOpenDrawer}
      >
        Add Category
      </Button>
      <Drawer width={376} isOpen={isOpenDrawer} onClose={onCloseDrawer}>
        <form onSubmit={handleSubmit(handleSubmitCategory)} className="h-full relative flex flex-col gap-8">
          <DrawerHeader>
            <Heading component="div" variant="title-5">
              Create Category
            </Heading>
          </DrawerHeader>
          <div className="relative flex shrink-0 grow flex-col gap-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  autoFocus
                  isRequired
                  label="Store name"
                  labelPlacement="outside"
                  placeholder="Enter your store name"
                  variant="bordered"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name && errors.name.message}
                  // isDisabled={isPending}
                  {...field}
                />
              )}
            />
          </div>
          <DrawerFooter className="gap-4">
            <Button
              fullWidth
              variant="flat"
              className="font-medium"
              onPress={onCloseDrawer}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              fullWidth
              color="primary"
              className="font-medium"
              startContent={<Save size={16} strokeWidth={2.5} />}
            >
              Save
            </Button>
          </DrawerFooter>
        </form>
      </Drawer>
    </>
  );
}
