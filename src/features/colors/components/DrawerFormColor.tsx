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
import { ColorDataType } from '~/lib/drizzle/schemas/colors';
import {
  colorValidationSchema,
  type ColorValidationSchema,
} from '~/lib/validations/colors';

import { addColor, updateColor } from '../api/color.client';

const Drawer = dynamic(
  () => import('~/components/atom').then((component) => component.Drawer),
  { ssr: false }
);

interface DrawerFormColorProps {
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
  initialData?: ColorDataType;
}

export function DrawerFormColor(props: DrawerFormColorProps) {
  const { isOpenDrawer, onCloseDrawer, initialData } = props;
  const params = useParams();
  const router = useRouter();

  const initialDataForm: ColorValidationSchema = {
    name: initialData?.name || '',
    hexCode: initialData?.hexCode || '',
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ColorValidationSchema>({
    resolver: zodResolver(colorValidationSchema),
    defaultValues: initialDataForm,
  });

  useEffect(() => {
    if (!isOpenDrawer) {
      reset();
      onCloseDrawer();
    }
  }, [isOpenDrawer, onCloseDrawer, reset]);

  const drawerTitle = useMemo(() => {
    return initialData ? 'Update Color' : 'Create Color';
  }, [initialData]);

  const buttonText = useMemo(() => {
    return initialData ? 'Update' : 'Save';
  }, [initialData]);

  const toastResponseMessage = useMemo(() => {
    return {
      success: initialData
        ? 'Color updated successfully'
        : 'Color created successfully',
      error: initialData
        ? ' Error when updating color'
        : 'Error when creating color',
    };
  }, [initialData]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: ColorValidationSchema) =>
      initialData
        ? updateColor({
            id: initialData.id,
            payload,
            query: { storeId: params.storeId as string },
          })
        : addColor({ query: { storeId: params.storeId as string }, payload }),
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

  const onSubmitSize: SubmitHandler<ColorValidationSchema> = (payload) => {
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
                placeholder="Enter your color name"
                variant="bordered"
                isInvalid={!!errors.name}
                errorMessage={errors.name && errors.name.message}
                isDisabled={isPending}
                {...field}
              />
            )}
          />
          <Controller
            name="hexCode"
            control={control}
            render={({ field }) => (
              <Input
                label="Hex Code"
                labelPlacement="outside"
                placeholder="Enter your hex code color"
                variant="bordered"
                isInvalid={!!errors.hexCode}
                errorMessage={errors.hexCode && errors.hexCode.message}
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
