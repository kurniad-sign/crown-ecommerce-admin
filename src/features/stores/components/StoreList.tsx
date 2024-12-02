'use client';

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Link } from 'nextjs13-progress';

import { Text } from '~/components/atom';
import { EmptyStates } from '~/components/molecul/EmptyStates';
import { StoresDataType } from '~/lib/drizzle/schemas/stores';

import emptyIllustration from '~/assets/images/empty-state-task.svg';

import { getStore } from '../api/get-store';
import { StoreCreateButton } from './StoreCreateButton';
import { StoreDeleteButton } from './StoreDeleteButton';
import { StoreSkeleton } from './StoreSkeleton';

export function StoreList() {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ['get-stores'],
    queryFn: getStore,
  });
  const storeList = data as unknown as StoresDataType[];

  if (isLoading) {
    return <StoreSkeleton />;
  }

  if (!storeList.length) {
    return (
      <Card className="mt-9 p-6" shadow="sm">
        <CardBody>
          <EmptyStates
            imageSrc={emptyIllustration}
            imageStyle={{
              width: 150,
              height: 150,
            }}
            title="No store to show"
            description="Looks like you don’t have stores for now. Add new stores to get started."
          >
            <StoreCreateButton store={storeList} />
          </EmptyStates>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StoreCreateButton store={storeList} />
      {storeList.map((store) => (
        <Card key={store.id} shadow="sm" className="z-10 h-48">
          <CardHeader className="z-[99]">
            <StoreDeleteButton id={store.id} />
          </CardHeader>
          <CardBody as={Link} className="pt-8" href={`/${store.id}`}>
            <Chip size="sm" variant="flat">
              <Text component="span" size="xsmall" className="text-gray-600">
                {store.storeId}
              </Text>
            </Chip>
            <Text weight="medium" className="mt-2">
              {store.name}
            </Text>
          </CardBody>
          <CardFooter className="border-t">
            <Text size="xsmall" className="text-gray-600">
              Updated {format(new Date(store.updatedAt as Date), 'dd MMM yyyy')}
            </Text>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
