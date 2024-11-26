'use client';

import { Card, CardBody } from '@nextui-org/card';
import { CircularProgress } from '@nextui-org/progress';

export function TableSkeleton() {
  return (
    <Card radius="sm" className="mt-10 h-[200px]">
      <CardBody className="flex items-center justify-center">
        <CircularProgress
          color="primary"
          size="lg"
          aria-label="Loading..."
          isIndeterminate
        />
      </CardBody>
    </Card>
  );
}
