import React from 'react';
import { cn } from 'cn';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    TablePageChangeEvent,
    TablePaginatorOption,
    TablePaginatorProps,
    TableRowsChangeEvent
} from '@/interfaces/table-interfaces';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const DEFAULT_ROWS_OPTIONS: TablePaginatorOption[] = [
    { label: '50', value: 50 },
    { label: '75', value: 75 },
    { label: '100', value: 100 }
];

const TablePaginator: React.FC<TablePaginatorProps> = ({
    //
    countLoading = false,
    dataLength = 0,
    limit = 25,
    disableNext = false,
    offset = 0,
    count = -99,
    pageChange,
    rowsChange,
    dropdownOption = [],
    className
}) => {
    const pageSize = limit > 0 ? limit : 1;
    const rowsOptions = dropdownOption.length > 0 ? dropdownOption : DEFAULT_ROWS_OPTIONS;
    const totalRecords = count >= 0 ? count : 0;

    const rangeStart = dataLength > 0 ? offset + 1 : 0;
    const rangeEnd = dataLength > 0 ? offset + dataLength : 0;

    const canPrevious = offset > 0;
    const canNext = !disableNext && (count < 0 ? dataLength > 0 : offset + pageSize < totalRecords);

    const emitPageChange = (page: number) => {
        const nextOffset = Math.max(0, page * pageSize);

        if (nextOffset === offset) {
            return;
        }

        const event: TablePageChangeEvent = {
            page,
            offset: nextOffset,
            limit,
            rows: limit
        };

        pageChange?.(event);
    };

    const handleRowsChange = (value: number | null) => {
        if (value === null || value === limit) {
            return;
        }

        const event: TableRowsChangeEvent = {
            value,
            page: 0,
            offset: 0,
            rows: value
        };

        rowsChange?.(event);
    };

    return (
        <div
            className={cn(
                'flex flex-wrap items-center justify-end gap-4 text-xs text-muted-foreground',
                className
            )}
        >
            <div className={'flex items-center gap-2'}>
                <span>Items per page:</span>
                <Select
                    value={limit}
                    items={rowsOptions}
                    onValueChange={(value) => handleRowsChange(value)}
                >
                    <SelectTrigger className={'w-15 bg-card'} aria-label={'Items per page'}>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                        alignItemWithTrigger={false}
                        className="min-w-[var(--anchor-width)]"
                    >
                        {rowsOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <span className={'min-w-15 text-center'}>
                {rangeStart} - {rangeEnd} of{' '}
                {countLoading ? (
                    <AiOutlineLoading3Quarters
                        className={'inline-block size-3 align-middle animate-spin'}
                    />
                ) : (
                    totalRecords
                )}
            </span>

            <div className={'flex items-center gap-1'}>
                <Button
                    type={'button'}
                    variant={'outline'}
                    size={'icon-sm'}
                    disabled={!canPrevious}
                    onClick={() => emitPageChange(Math.max(0, Math.floor(offset / pageSize) - 1))}
                    aria-label={'Previous page'}
                >
                    <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
                </Button>
                <Button
                    type={'button'}
                    variant={'outline'}
                    size={'icon-sm'}
                    disabled={!canNext}
                    onClick={() => emitPageChange(Math.floor(offset / pageSize) + 1)}
                    aria-label={'Next page'}
                >
                    <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
                </Button>
            </div>
        </div>
    );
};

export default TablePaginator;
