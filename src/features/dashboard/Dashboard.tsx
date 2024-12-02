'use client';

import { Heading } from '~/components/atom';
import { useStore } from '../stores/api/get-store';

export function Dashboard() {
  const { data } = useStore()

  console.log(data)

  return (
    <>
      <Heading component="h1" variant="title-1">
        App Dashboard Page
      </Heading>
    </>
  );
}
