import { getSizes } from '../api/size.server';
import { TableSize } from './TableSize';

export async function TableDataSize({ storeId }: { storeId: string }) {
  const sizes = await getSizes(storeId);

  return <TableSize items={sizes} />;
}
