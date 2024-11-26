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

import { Text } from '~/components/atom';
import { type ColorDataType } from '~/lib/drizzle/schemas/colors';

import { ButtonDeleteColor } from './ButtonDeleteColor';
import { ButtonUpdateColor } from './ButtonUpdateColor';
import { tableColumns } from './table-columns';

interface TableColorProps {
  items: ColorDataType[];
}

type ColumnKey = (typeof tableColumns)[number]['key'];

export function TableColor(props: TableColorProps) {
  const { items } = props;

  const renderCell = useCallback(
    (color: ColorDataType, columnKey: ColumnKey) => {
      const columnRenderers: Record<ColumnKey, () => string | React.ReactNode> =
        {
          name: () => color.name,
          hexCode: () => (
            <div className="flex items-center gap-2">
              <div
                style={{ backgroundColor: color.hexCode as string }}
                className="relative h-5 w-5 rounded-full border"
              />
              <Text component="span">{color.hexCode}</Text>
            </div>
          ),
          createdAt: () =>
            color.createdAt
              ? format(new Date(color.createdAt), 'dd MMM yyyy')
              : '-',
          updatedAt: () =>
            color.updatedAt
              ? format(new Date(color.updatedAt), 'dd MMM yyyy')
              : '-',
          actions: () => (
            <div className="relative flex items-center gap-1">
              <ButtonUpdateColor color={color} />
              <ButtonDeleteColor id={color.id} />
            </div>
          ),
        };

      return columnRenderers[columnKey]() ?? '-';
    },
    []
  );

  return (
    <Table isStriped aria-label="Table with data color" className="mt-10">
      <TableHeader columns={tableColumns}>
        {(column) => (
          <TableColumn width={column.width} key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No Color Data.'} items={items}>
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
