'use client';

import { Input } from '@nextui-org/react';
import { Search } from 'lucide-react';

export function SearchInput() {
  return (
    <Input
      isClearable
      variant="bordered"
      placeholder="Type to search ..."
      startContent={<Search size={16} />}
    />
  );
}
