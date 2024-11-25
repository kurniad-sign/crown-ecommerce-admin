'use client';

import { useCallback, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { format } from 'date-fns';

import { CategoryDataType } from '~/lib/drizzle/schemas/categories';
import { uniqueId } from '~/lib/unique-id';

import { CategoryDeleteButton } from './CategoryDeleteButton';
import { CategoryUpdateButton } from './CategoryUpdateButton';

interface TableCategoriesProps {
  items: CategoryDataType[];
}

const tableColumns = [
  {
    key: 'name',
    label: 'Name',
    width: 200,
  },
  {
    key: 'parentId',
    label: 'Parent Category',
    width: 200,
  },
  {
    key: 'createdAt',
    label: 'Created Date',
  },
  {
    key: 'updatedAt',
    label: 'Updated Date',
  },
  {
    key: 'actions',
    label: 'Actions',
    width: 100,
  },
];

type ColumnKey = (typeof tableColumns)[number]['key'];
export interface TableCategory extends CategoryDataType {
  key: string;
}

export function TableCategories(props: TableCategoriesProps) {
  const { items } = props;
  const tableItems = useMemo(() => {
    return items.map((item) => ({
      ...item,
      key: uniqueId(),
    }));
  }, [items]);

  const renderCell = useCallback(
    (category: TableCategory, columnKey: ColumnKey) => {
      const columnRenderers: Record<ColumnKey, () => string | React.ReactNode> =
        {
          name: () => category.name,
          parentId: () => (category.parent ? category.parent.name : '-'),
          createdAt: () =>
            category.createdAt
              ? format(new Date(category.createdAt), 'dd MMM yyyy')
              : '-',
          updatedAt: () =>
            category.updatedAt
              ? format(new Date(category.updatedAt), 'dd MMM yyyy')
              : '-',
          actions: () => (
            <div className="relative flex items-center gap-1">
              <CategoryUpdateButton category={category} />
              <CategoryDeleteButton id={category.id} />
            </div>
          ),
        };

      return columnRenderers[columnKey]() ?? '-';
    },
    []
  );

  return (
    <Table isStriped aria-label="Table with data categories" className="mt-10">
      <TableHeader columns={tableColumns}>
        {(column) => (
          <TableColumn width={column.width} key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No Category Data.'} items={tableItems}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as ColumnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
