'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { PostResponse } from '~/types';
import { Plus, X } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Text } from '~/components/atom';
import { StoresDataType } from '~/lib/drizzle/schemas/stores';
import { storeSchema, StoreSchema } from '~/lib/validations/store';

import { addStore } from '../api/store.client';

interface CreateStoreProps {
  store: StoresDataType[];
}

export function StoreCreateButton({ store }: CreateStoreProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openStoreId, setOpenStoreId] = useState(false);
  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<StoreSchema>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: '',
    },
  });

  const handleOpenStoreId = () => setOpenStoreId(true);
  const handleCloseStoreId = () => setOpenStoreId(false);

  // Handle reset form when close modal if any error form state or when storeid field is opened
  useEffect(() => {
    if (!isOpen) {
      reset();
      handleCloseStoreId();
    }
  }, [isOpen, reset]);

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-store'],
    mutationFn: async (payload: StoreSchema) => {
      const response = await addStore(payload);
      return (await response.json()) as PostResponse<StoresDataType>;
    },
    onSuccess: (response) => {
      console.log(response.data);
      router.replace(`/${response.data.storeId}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error when creating store');
    },
  });

  const onSubmitStore: SubmitHandler<StoreSchema> = (payload) => {
    mutate(payload);
  };

  return (
    <>
      {!store.length ? (
        <div className="mt-4">
          <Button
            color="primary"
            startContent={<Plus size={16} />}
            onPress={onOpen}
            className="font-medium"
          >
            Add Store
          </Button>
        </div>
      ) : (
        <Card
          isPressable
          shadow="none"
          className="h-48 border-[1.5px] border-dashed border-gray-300"
          onPress={onOpen}
        >
          <CardBody className="flex-row items-center justify-center gap-2">
            <Plus size={14} />
            <Text size="small" weight="medium">
              Create Store
            </Text>
          </CardBody>
        </Card>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <form
              className="flex flex-col"
              onSubmit={handleSubmit(onSubmitStore)}
            >
              <ModalHeader className="flex flex-col gap-1">
                Create Store
              </ModalHeader>
              <ModalBody>
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
                      isDisabled={isPending}
                      {...field}
                    />
                  )}
                />
                {openStoreId ? (
                  <Card className="text-sm">
                    <Button
                      isIconOnly
                      radius="full"
                      size="sm"
                      variant="light"
                      className="absolute right-2 top-2 z-[100]"
                      isDisabled={isPending}
                      onPress={handleCloseStoreId}
                    >
                      <X size={14} className="text-gray-600" />
                    </Button>
                    <CardHeader className="flex-col items-start gap-1 border-b">
                      <Text weight="medium">Store ID</Text>
                      <Text className="text-gray-600">
                        Enter your custom store id, leave blank for randomly
                        generated one
                      </Text>
                    </CardHeader>
                    <CardBody>
                      <Controller
                        name="storeId"
                        control={control}
                        render={({ field }) => (
                          <Input
                            labelPlacement="outside"
                            placeholder="Your store ID"
                            variant="bordered"
                            isDisabled={isPending}
                            {...field}
                          />
                        )}
                      />
                    </CardBody>
                  </Card>
                ) : (
                  <Button
                    variant="bordered"
                    size="sm"
                    onPress={handleOpenStoreId}
                    isDisabled={isPending}
                  >
                    Store ID
                  </Button>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="flat"
                  isDisabled={isPending}
                  onPress={onClose}
                  className="font-medium"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isPending}
                  isDisabled={isPending}
                  className="font-medium"
                >
                  Save
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
