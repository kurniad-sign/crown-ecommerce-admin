import { Metadata } from 'next';

import { Heading, Text } from '~/components/atom';

import { ButtonCreateSize } from '~/features/sizes/components/ButtonCreateSize';

export const metadata: Metadata = {
  title: 'Sizes | Crown',
};

export default function SizePage() {
  return (
    <div className="py-5">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <Heading component="h2" variant="title-4">
            Sizes
          </Heading>
          <Text size="small" className="text-gray-600">
            Manage size product for your store.
          </Text>
        </div>
        <ButtonCreateSize />
      </div>
    </div>
  );
}
