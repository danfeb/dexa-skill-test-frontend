import React, { useMemo, useState } from 'react';
import { cn } from 'cn';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader as TableHeaderRow,
    TableRow
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { DefaultDataTableProps, TableHeader } from '@/interfaces/table-interfaces';

const DefaultDataTable: React.FC<DefaultDataTableProps> = ({
    //
    loading = false,
    tableData = [],
    tableHeaders,
    renderCell,
    selectionMode = 'none',
    rowKey,
    selectedRows,
    onSelectionChange,
    emptyMessage = 'No data found',
    className
}) => {
    const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>([]);

    const selectionEnabled = selectionMode !== 'none';
    const isControlled = selectedRows !== undefined;

    const visibleHeaders = useMemo(
        () => tableHeaders.filter((header) => header.access !== false),
        [tableHeaders]
    );

    const getRowKey = (item: any, index: number): string => {
        if (typeof rowKey === 'function') {
            return String(rowKey(item, index));
        }

        if (rowKey) {
            return String(item[rowKey]);
        }

        const record = item as Record<string, unknown>;
        return String(record?.id ?? index);
    };

    const selectedKeys = isControlled
        ? selectedRows.map((item, index) => getRowKey(item, index))
        : internalSelectedKeys;

    const allRowKeys = tableData.map((item: any, index: number) => getRowKey(item, index));
    const allSelected =
        allRowKeys.length > 0 && allRowKeys.every((key: any) => selectedKeys.includes(key));
    const someSelected = !allSelected && allRowKeys.some((key: any) => selectedKeys.includes(key));

    const commitSelection = (nextKeys: string[]) => {
        if (!isControlled) {
            setInternalSelectedKeys(nextKeys);
        }

        onSelectionChange?.(
            tableData.filter((item: any, index: number) =>
                nextKeys.includes(getRowKey(item, index))
            )
        );
    };

    const handleSelectAll = (checked: boolean) => {
        commitSelection(checked ? allRowKeys : []);
    };

    const handleSelectRow = (item: any, index: number, checked: boolean) => {
        const key = getRowKey(item, index);

        if (selectionMode === 'single') {
            commitSelection(checked ? [key] : []);
            return;
        }

        commitSelection(
            checked
                ? [...selectedKeys.filter((selectedKey) => selectedKey !== key), key]
                : selectedKeys.filter((selectedKey) => selectedKey !== key)
        );
    };

    const renderDefaultCell = (item: any, header: TableHeader) => {
        const value = (item as Record<string, unknown>)?.[header.value];
        return (
            <span>
                {value !== undefined && value !== null && value !== '' ? String(value) : '-'}
            </span>
        );
    };

    const totalColumns = visibleHeaders.length + (selectionEnabled ? 1 : 0);

    return (
        <div className={cn('relative w-full', className)} aria-busy={loading}>
            <Table>
                <TableHeaderRow className={'[&_th]:font-bold'}>
                    <TableRow className={'hover:bg-transparent'}>
                        {selectionEnabled && (
                            <TableHead style={{ width: '48px' }}>
                                {selectionMode === 'multiple' && (
                                    <Checkbox
                                        checked={allSelected}
                                        indeterminate={someSelected}
                                        disabled={loading || tableData.length === 0}
                                        onCheckedChange={handleSelectAll}
                                        aria-label={'Select all rows'}
                                    />
                                )}
                            </TableHead>
                        )}
                        {visibleHeaders.map((header, index) => (
                            <TableHead
                                key={`${header.value}-${index}`}
                                style={{
                                    width: header.width,
                                    textAlign: header.align ?? 'left'
                                }}
                            >
                                {header.title}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeaderRow>
                <TableBody>
                    {loading && tableData.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={totalColumns}
                                className={'text-center text-muted-foreground'}
                            >
                                {null}
                            </TableCell>
                        </TableRow>
                    ) : !loading && tableData.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={totalColumns}
                                className={'text-center text-muted-foreground'}
                            >
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        tableData.map((item: any, rowIndex: number) => {
                            const key = getRowKey(item, rowIndex);
                            const isSelected = selectedKeys.includes(key);

                            return (
                                <TableRow
                                    key={key}
                                    data-state={isSelected ? 'selected' : undefined}
                                >
                                    {selectionEnabled && (
                                        <TableCell>
                                            <Checkbox
                                                checked={isSelected}
                                                disabled={loading}
                                                onCheckedChange={(checked) =>
                                                    handleSelectRow(item, rowIndex, checked)
                                                }
                                                aria-label={`Select row ${rowIndex + 1}`}
                                            />
                                        </TableCell>
                                    )}
                                    {visibleHeaders.map((header, columnIndex) => (
                                        <TableCell
                                            key={`${header.value}-${columnIndex}`}
                                            style={{
                                                width: header.width,
                                                textAlign: header.align ?? 'left'
                                            }}
                                        >
                                            {renderCell
                                                ? renderCell(item, header)
                                                : renderDefaultCell(item, header)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
            {loading && (
                <div
                    className={'absolute inset-0 z-10 flex items-center justify-center bg-black/20'}
                >
                    <AiOutlineLoading3Quarters className={'size-6 animate-spin text-white'} />
                </div>
            )}
        </div>
    );
};

export default DefaultDataTable;
