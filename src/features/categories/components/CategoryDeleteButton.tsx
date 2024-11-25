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
} from '@nextui-org/modal';
import { Tooltip } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

import { Text } from '~/components/atom';

import { deleteCategory } from '../api/category.client';

type CategoryDeleteButtonProps = {
  id: string;
};

export function CategoryDeleteButton(props: CategoryDeleteButtonProps) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { id } = props;

  const { mutate, isPending } = useMutation({
    mutationKey: ['delete-category'],
    mutationFn: async (id: string) => await deleteCategory(id),
    onSuccess: () => {
      onClose();
      router.refresh();
      toast.success('Category has been deleted');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error when deleting category');
    },
  });

  const handleDeleteCategory = () => {
    mutate(id);
  };

  return (
    <>
      <Tooltip content="Delete category">
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
              <ModalHeader>Delete Category</ModalHeader>
              <ModalBody>
                <Text size="small">
                  Are you sure you want to delete this category ?
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
                  onPress={handleDeleteCategory}
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
