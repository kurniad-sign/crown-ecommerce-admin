'use client';

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { PostResponse } from '~/types';
import { Save } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { DrawerFooter, DrawerHeader, Heading } from '~/components/atom';
import { CategoryDataType } from '~/lib/drizzle/schemas/categories';
import { categorySchema, CategorySchema } from '~/lib/validations/categories';

import { addCategory } from '../api/category.client';

const Drawer = dynamic(
  () => import('~/components/atom').then((component) => component.Drawer),
  { ssr: false }
);

interface DrawerFormCategoryProps {
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
}

export function DrawerFormCategory({
  isOpenDrawer,
  onCloseDrawer,
}: DrawerFormCategoryProps) {
  const params = useParams();
  const router = useRouter();

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

  useEffect(() => {
    if (!isOpenDrawer) {
      reset();
      onCloseDrawer();
    }
  }, [isOpenDrawer, onCloseDrawer, reset]);

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: async (payload: CategorySchema) => {
      const response = await addCategory({
        params: { storeId: params.storeId as string },
        payload,
      });
      return (await response.json()) as PostResponse<CategoryDataType>;
    },
    onSuccess: (response) => {
      console.log(response.data);
      toast.success('Category created successfull');
      router.refresh();
      onCloseDrawer();
      reset();
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error when creating category');
    },
  });

  const handleSubmitCategory: SubmitHandler<CategorySchema> = (payload) => {
    mutate(payload);
  };

  return (
    <Drawer width={376} isOpen={isOpenDrawer} onClose={onCloseDrawer}>
      <form
        onSubmit={handleSubmit(handleSubmitCategory)}
        className="relative flex h-full flex-col gap-8"
      >
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
                label="Name"
                labelPlacement="outside"
                placeholder="Enter your category name"
                variant="bordered"
                isInvalid={!!errors.name}
                errorMessage={errors.name && errors.name.message}
                isDisabled={isPending}
                {...field}
              />
            )}
          />
        </div>
        <DrawerFooter className="gap-4">
          <Button
            fullWidth
            isDisabled={isPending}
            variant="flat"
            className="font-medium"
            onPress={onCloseDrawer}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            isDisabled={isPending}
            isLoading={isPending}
            type="submit"
            color="primary"
            className="font-medium"
            startContent={!isPending && <Save size={16} strokeWidth={2.5} />}
          >
            Save
          </Button>
        </DrawerFooter>
      </form>
    </Drawer>
  );
}
