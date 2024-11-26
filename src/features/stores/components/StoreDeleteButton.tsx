'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';

import { Text } from '~/components/atom';

import { deleteStore } from '../api/store.client';

type StoreDeleteButtonProps = {
  id: string;
};

export function StoreDeleteButton(props: StoreDeleteButtonProps) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { id } = props;

  const { mutate, isPending } = useMutation({
    mutationKey: ['delete-store'],
    mutationFn: async (id: string) => await deleteStore(id),
    onSuccess: () => {
      onClose();
      router.refresh();
      toast.success('Store has been deleted');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error when deleting store');
    },
  });

  const handleDeleteStore = () => {
    mutate(id);
  };

  return (
    <>
      <Button
        isIconOnly
        variant="light"
        color="danger"
        size="sm"
        onPress={onOpen}
      >
        <Trash size={14} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Delete Store</ModalHeader>
              <ModalBody>
                <Text size="small">
                  Are you sure you want to delete this store ?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="flat"
                  className="font-medium"
                  isDisabled={isPending}
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  className="font-medium"
                  isDisabled={isPending}
                  isLoading={isPending}
                  onPress={handleDeleteStore}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
