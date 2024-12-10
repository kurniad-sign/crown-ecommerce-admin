'use client';

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { DrawerFooter, DrawerHeader, Heading } from '~/components/atom';
import {
  CategoryDataType,
  insertCategorySchema,
  patchCategorySchema,
} from '~/lib/drizzle/schemas/categories';

import { useCategory } from '../api/get-category';
import {
  useMutateCategory,
  type InsertCategoryPayload,
  type MutateCategoryResponse,
  type PatchCategoryPayload,
} from '../api/mutate-category';

type CategoryFormSchema = InsertCategoryPayload | PatchCategoryPayload;

interface DrawerFormCategoryProps {
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
  initialData?: CategoryDataType;
}

const Drawer = dynamic(
  () => import('~/components/atom').then((component) => component.Drawer),
  { ssr: false }
);

export function DrawerFormCategory({
  isOpenDrawer,
  onCloseDrawer,
  initialData,
}: DrawerFormCategoryProps) {
  const params = useParams();
  const router = useRouter();

  const initialForm: CategoryFormSchema = {
    name: initialData?.name || '',
    parentId: initialData?.parentId || undefined,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CategoryFormSchema>({
    resolver: zodResolver(
      !initialData ? insertCategorySchema : patchCategorySchema
    ),
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

  const { data, isLoading } = useCategory({
    apiConfig: {
      params: {
        storeId: params.storeId as string,
      },
    },
    queryConfig: {
      enabled: isOpenDrawer,
      refetchOnMount: true,
    },
  });

  const categoryData = data as unknown as CategoryDataType[];

  const { mutate, isPending } = useMutateCategory({
    apiConfig: {
      params: { storeId: params.storeId as string },
    },
    mutationConfig: {
      onSuccess: (response) => {
        const { data, message } = response as unknown as MutateCategoryResponse;
        console.log(data);
        router.refresh();
        toast.success(message);
        onCloseDrawer();
        reset();
      },
      onError: (error) => {
        console.error(error);
        toast.error(toastResponseMessage.error);
      },
    },
  });

  const handleSubmitCategory: SubmitHandler<CategoryFormSchema> = (payload) => {
    mutate({ payload });
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
                isLoading={isLoading}
                isDisabled={isPending}
                items={categoryData ?? []}
                value={field.value as string}
                onChange={field.onChange}
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
