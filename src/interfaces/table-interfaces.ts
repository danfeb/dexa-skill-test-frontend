import React from 'react';
import { TableAlign, TableSelectionMode } from '@/types/component-types';

export interface TableHeader {
    title: React.ReactNode;
    value: string;
    align?: TableAlign;
    width?: string;
    access?: boolean;
}

export interface DefaultDataTableProps {
    loading?: boolean;
    tableData: any;
    tableHeaders: TableHeader[];
    renderCell?: (item: any, header: TableHeader) => React.ReactNode;
    selectionMode?: TableSelectionMode;
    rowKey?: keyof any | ((item: any, index: number) => React.Key);
    selectedRows?: any[];
    onSelectionChange?: (rows: any[]) => void;
    emptyMessage?: string;
    className?: string;
}

export interface TablePaginatorOption {
    label: React.ReactNode;
    value: number;
}

export interface TablePageChangeEvent {
    page: number;
    offset: number;
    limit: number;
    rows: number;
}

export interface TableRowsChangeEvent {
    value: number;
    page: number;
    offset: number;
    rows: number;
}

export interface TablePaginatorProps {
    countLoading?: boolean;
    limit: number;
    disableNext?: boolean;
    offset: number;
    count: number;
    dataLength: number;
    pageChange: (event: TablePageChangeEvent) => void;
    rowsChange: (event: TableRowsChangeEvent) => void;
    dropdownOption?: TablePaginatorOption[];
    className?: string;
}
