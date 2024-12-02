'use client';

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PostResponse } from '~/types';
import { Save } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { DrawerFooter, DrawerHeader, Heading } from '~/components/atom';
import { CategoryDataType } from '~/lib/drizzle/schemas/categories';
import { categorySchema, CategorySchema } from '~/lib/validations/categories';

import {
  addCategory,
  getCategories,
  updateCategory,
} from '../api/category.client';
import { type TableCategory } from './TableCategories';

const Drawer = dynamic(
  () => import('~/components/atom').then((component) => component.Drawer),
  { ssr: false }
);

interface DrawerFormCategoryProps {
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
  initialData?: TableCategory;
}

export function DrawerFormCategory({
  isOpenDrawer,
  onCloseDrawer,
  initialData,
}: DrawerFormCategoryProps) {
  const params = useParams();
  const router = useRouter();

  const initialForm: CategorySchema = {
    name: initialData?.name || '',
    parentId: initialData?.parentId || undefined,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialForm,
  });

  useEffect(() => {
    if (!isOpenDrawer) {
      reset();
      onCloseDrawer();
    }
  }, [isOpenDrawer, onCloseDrawer, reset]);

  const drawerTitle = useMemo(() => {
    return initialData ? 'Update Category' : 'Create Category';
  }, [initialData]);

  const buttonText = useMemo(() => {
    return initialData ? 'Update' : 'Save';
  }, [initialData]);

  const toastResponseMessage = useMemo(() => {
    return {
      success: initialData
        ? ' Category updated successfully'
        : 'Category created successfully',
      error: initialData
        ? ' Error when updating category'
        : 'Error when creating category',
    };
  }, [initialData]);

  const { data, isLoading } = useQuery({
    queryKey: ['get-categories'],
    queryFn: async () =>
      await getCategories({ storeId: params.storeId as string }),
    enabled: isOpenDrawer,
    refetchOnMount: true,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['category-mutation'],
    mutationFn: async (payload: CategorySchema) => {
      const response = !initialData
        ? await addCategory({
            params: { storeId: params.storeId as string },
            payload,
          })
        : await updateCategory(
            initialData.id as string,
            {
              storeId: params.storeId as string,
            },
            payload
          );
      return (await response.json()) as PostResponse<CategoryDataType>;
    },
    onSuccess: (response) => {
      console.log(response.data);
      router.refresh();
      toast.success(toastResponseMessage.success);
      onCloseDrawer();
      reset();
    },
    onError: (error) => {
      console.error(error);
      toast.error(toastResponseMessage.error);
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
            {drawerTitle}
          </Heading>
        </DrawerHeader>
        <div className="relative flex shrink-0 grow flex-col gap-6">
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
          <Controller
            name="parentId"
            control={control}
            render={({ field }) => (
              <Select
                label="Parent Category"
                labelPlacement="outside"
                placeholder="Select Parent Category"
                variant="bordered"
                defaultSelectedKeys={field.value ? [field.value] : []}
                isLoading={isLoading}
                isDisabled={isPending}
                items={data?.categories ?? []}
                {...field}
              >
                {(item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                )}
              </Select>
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
            {buttonText}
          </Button>
        </DrawerFooter>
      </form>
    </Drawer>
  );
}
