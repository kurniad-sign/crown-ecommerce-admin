'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import { useRouter } from 'nextjs13-progress';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { DrawerFooter, DrawerHeader, Heading } from '~/components/atom';
import { SizeDataType } from '~/lib/drizzle/schemas/sizes';
import {
  sizeValidationSchema,
  SizeValidationSchema,
} from '~/lib/validations/size';

import { addSize, updateSize } from '../api/size.client';

const Drawer = dynamic(
  () => import('~/components/atom').then((component) => component.Drawer),
  { ssr: false }
);

interface DrawerFormSizeProps {
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
  initialData?: SizeDataType;
}

export function DrawerFormSize(props: DrawerFormSizeProps) {
  const { isOpenDrawer, onCloseDrawer, initialData } = props;
  const params = useParams();
  const router = useRouter();

  const initialDataForm: SizeValidationSchema = {
    name: initialData?.name || '',
    value: initialData?.value || '',
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SizeValidationSchema>({
    resolver: zodResolver(sizeValidationSchema),
    defaultValues: initialDataForm,
  });

  useEffect(() => {
    if (!isOpenDrawer) {
      reset();
      onCloseDrawer();
    }
  }, [isOpenDrawer, onCloseDrawer, reset]);

  const drawerTitle = useMemo(() => {
    return initialData ? 'Update Size' : 'Create Size';
  }, [initialData]);

  const buttonText = useMemo(() => {
    return initialData ? 'Update' : 'Save';
  }, [initialData]);

  const toastResponseMessage = useMemo(() => {
    return {
      success: initialData
        ? ' Size updated successfully'
        : 'Size created successfully',
      error: initialData
        ? ' Error when updating size'
        : 'Error when creating size',
    };
  }, [initialData]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: SizeValidationSchema) =>
      initialData
        ? updateSize({
            id: initialData.id,
            payload,
            query: { storeId: params.storeId as string },
          })
        : addSize({ query: { storeId: params.storeId as string }, payload }),
    onSuccess: () => {
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

  const onSubmitSize: SubmitHandler<SizeValidationSchema> = (payload) => {
    mutate(payload);
  };

  return (
    <Drawer width={376} isOpen={isOpenDrawer} onClose={onCloseDrawer}>
      <form
        onSubmit={handleSubmit(onSubmitSize)}
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
                placeholder="Enter your size name"
                variant="bordered"
                isInvalid={!!errors.name}
                errorMessage={errors.name && errors.name.message}
                isDisabled={isPending}
                {...field}
              />
            )}
          />
          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <Input
                isRequired
                label="Value"
                labelPlacement="outside"
                placeholder="Enter your size value"
                variant="bordered"
                isInvalid={!!errors.value}
                errorMessage={errors.value && errors.value.message}
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
            {buttonText}
          </Button>
        </DrawerFooter>
      </form>
    </Drawer>
  );
}
