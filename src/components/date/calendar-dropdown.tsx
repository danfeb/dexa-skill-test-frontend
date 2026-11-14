import React, { useEffect, useRef, useState } from 'react';
import type { DropdownProps } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon } from '@hugeicons/core-free-icons';

const CalendarDropdown = ({
    options = [],
    value,
    onChange,
    disabled,
    className,
    'aria-label': ariaLabel
}: DropdownProps): React.ReactElement => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const currentValue = value === undefined || value === '' ? undefined : Number(value);
    const selectedOption = options.find((option) => option.value === currentValue);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
        };
    }, [open]);

    return (
        <div ref={rootRef} className={'relative'}>
            <button
                type={'button'}
                disabled={disabled}
                aria-label={ariaLabel}
                aria-haspopup={'listbox'}
                aria-expanded={open}
                className={cn(
                    'flex h-7 items-center gap-1 rounded-md px-1.5 text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50',
                    className
                )}
                onClick={() => setOpen((previousOpen) => !previousOpen)}
            >
                {selectedOption?.label}
                <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    strokeWidth={2}
                    className={'size-3.5 text-muted-foreground'}
                />
            </button>
            {open && (
                <div
                    role={'listbox'}
                    className={
                        'absolute top-full left-0 z-50 mt-1 max-h-56 w-32 overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md'
                    }
                >
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type={'button'}
                            role={'option'}
                            aria-selected={option.value === currentValue}
                            disabled={option.disabled}
                            className={cn(
                                'flex w-full items-center rounded-sm px-2 py-1 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground',
                                option.value === currentValue && 'bg-accent text-accent-foreground',
                                option.disabled && 'pointer-events-none opacity-50'
                            )}
                            onClick={() => {
                                onChange?.({
                                    target: { value: String(option.value) }
                                } as React.ChangeEvent<HTMLSelectElement>);
                                setOpen(false);
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CalendarDropdown;
