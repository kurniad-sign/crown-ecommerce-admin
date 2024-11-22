import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/skeleton';

export function StoreSkeleton() {
  return (
    <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card shadow="sm" className="h-48">
        <CardHeader className="items-start justify-between">
          <Skeleton className="rounded-full">
            <div className="h-10 w-10 bg-gray-400" />
          </Skeleton>
          <Skeleton className="h-4 w-4 rounded-small bg-gray-200" />
        </CardHeader>
        <CardBody className="basis-0 space-y-2 pt-8">
          <Skeleton className="w-20 rounded-small">
            <div className="h-3 w-full rounded-small bg-gray-400" />
          </Skeleton>
          <Skeleton className="w-40 rounded-small">
            <div className="h-3 w-full rounded-small bg-gray-400" />
          </Skeleton>
        </CardBody>
        <CardFooter className="border-t">
          <Skeleton className="h-3 w-32 rounded-small" />
        </CardFooter>
      </Card>
      <Card shadow="sm" className="h-48">
        <CardHeader className="items-start justify-between">
          <Skeleton className="rounded-full">
            <div className="h-10 w-10 bg-gray-400" />
          </Skeleton>
          <Skeleton className="h-4 w-4 rounded-small bg-gray-200" />
        </CardHeader>
        <CardBody className="basis-0 space-y-2 pt-8">
          <Skeleton className="w-20 rounded-small">
            <div className="h-3 w-full rounded-small bg-gray-400" />
          </Skeleton>
          <Skeleton className="w-40 rounded-small">
            <div className="h-3 w-full rounded-small bg-gray-400" />
          </Skeleton>
        </CardBody>
        <CardFooter className="border-t">
          <Skeleton className="h-3 w-32 rounded-small" />
        </CardFooter>
      </Card>
    </div>
  );
}
