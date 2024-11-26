import { getColors } from '../api/color.server';
import { TableColor } from './TableColor';

export async function TableDataColor({ storeId }: { storeId: string }) {
  const colors = await getColors(storeId);

  return <TableColor items={colors} />;
}
