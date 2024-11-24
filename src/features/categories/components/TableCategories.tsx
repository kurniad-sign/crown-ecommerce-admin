'use client';

import { useCallback } from 'react';
import { Button } from '@nextui-org/react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { Tooltip } from '@nextui-org/tooltip';
import { Edit, Trash } from 'lucide-react';

interface TableCategoriesProps {
  storeId?: string;
}

const tableColumns = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'role',
    label: 'Role',
  },
  {
    key: 'created_at',
    label: 'Created Date',
  },
  {
    key: 'updated_at',
    label: 'Updated Date',
  },
  {
    key: 'actions',
    label: 'Actions',
  },
];

const rows = [
  {
    key: '1',
    name: 'Tony Reichert',
    role: 'CEO',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Zoey Lang',
    role: 'Technical Lead',
    status: 'Paused',
  },
  {
    key: '3',
    name: 'Jane Fisher',
    role: 'Senior Developer',
    status: 'Active',
  },
  {
    key: '4',
    name: 'William Howard',
    role: 'Community Manager',
    status: 'Vacation',
  },
];

export function TableCategories(props: TableCategoriesProps) {
  const renderCell = useCallback((user: any, columnKey: string | number) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case 'actions':
        return (
          <div className="relative flex items-center gap-1">
            <Tooltip content="Edit category">
              <Button isIconOnly size="sm" variant="light">
                <Edit size={12} />
              </Button>
            </Tooltip>
            <Tooltip content="Delete category">
              <Button isIconOnly size="sm" variant="light" color="danger">
                <Trash size={12} />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table isStriped aria-label="Table with data categories" className="mt-10">
      <TableHeader columns={tableColumns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
