'use client';

import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { Tooltip } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useRouter } from 'nextjs13-progress';
import { toast } from 'sonner';

import { Text } from '~/components/atom';

import { deleteSize } from '../api/size.client';

type ButtonDeleteSizeProps = {
  id: string;
};

export function ButtonDeleteSize(props: ButtonDeleteSizeProps) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { id } = props;

  const { mutate, isPending } = useMutation({
    mutationKey: ['delete-size'],
    mutationFn: async (id: string) => await deleteSize(id),
    onSuccess: () => {
      onClose();
      router.refresh();
      toast.success('Size has been deleted');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error when deleting size');
    },
  });

  const handleDeleteSize = () => {
    mutate(id);
  };

  return (
    <>
      <Tooltip content="Delete size">
        <Button
          isIconOnly
          size="sm"
          variant="light"
          color="danger"
          onPress={onOpen}
        >
          <Trash size={12} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm Delete Size</ModalHeader>
              <ModalBody>
                <Text size="small">
                  Are you sure you want to delete this size data ?
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
                  onPress={handleDeleteSize}
                  startContent={
                    !isPending && <Trash size={14} strokeWidth={2} />
                  }
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
