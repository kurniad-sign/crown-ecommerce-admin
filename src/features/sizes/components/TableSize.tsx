'use client';

import { useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { format } from 'date-fns';

import { SizeDataType } from '~/lib/drizzle/schemas/sizes';

import { ButtonDeleteSize } from './ButtonDeleteSize';
import { ButtonUpdateSize } from './ButtonUpdateSize';
import { tableColumns } from './table-columns';

interface TableSizeProps {
  items: SizeDataType[];
}

type ColumnKey = (typeof tableColumns)[number]['key'];

export function TableSize(props: TableSizeProps) {
  const { items } = props;

  const renderCell = useCallback((size: SizeDataType, columnKey: ColumnKey) => {
    const columnRenderers: Record<ColumnKey, () => string | React.ReactNode> = {
      name: () => size.name,
      value: () => size.value,
      createdAt: () =>
        size.createdAt ? format(new Date(size.createdAt), 'dd MMM yyyy') : '-',
      updatedAt: () =>
        size.updatedAt ? format(new Date(size.updatedAt), 'dd MMM yyyy') : '-',
      actions: () => (
        <div className="relative flex items-center gap-1">
          <ButtonUpdateSize size={size} />
          <ButtonDeleteSize id={size.id} />
        </div>
      ),
    };

    return columnRenderers[columnKey]() ?? '-';
  }, []);

  return (
    <Table isStriped aria-label="Table with data size" className="mt-10">
      <TableHeader columns={tableColumns}>
        {(column) => (
          <TableColumn width={column.width} key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No Category Data.'} items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as ColumnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
