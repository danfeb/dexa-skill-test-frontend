import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Show } from '@/components/conditional-rendering/show';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { HugeiconsIcon } from '@hugeicons/react';
import { Calendar03Icon } from '@hugeicons/core-free-icons';
import CalendarDropdown from '@/components/date/calendar-dropdown';
import { isDateOutOfRange } from '@/components/date/date-picker-config';
import { formatDateDisplay, formatDateString, parseDateString } from '@/utils/date-utils';
import { DateRangePickerProps } from '@/interfaces/date-picker-interfaces';

const DateRangePicker: React.FC<DateRangePickerProps> = ({
    //
    nameDateFrom,
    nameDateTo,
    label,
    placeholder = 'Pick a date range',
    valueDateFrom,
    valueDateTo,
    onChange,
    required = false,
    errorMessage,
    disabled = false,
    className,
    minDate,
    maxDate
}) => {
    const [open, setOpen] = useState(false);
    const selectedFrom = parseDateString(valueDateFrom);
    const selectedTo = parseDateString(valueDateTo);
    const selectedRange = selectedFrom ? { from: selectedFrom, to: selectedTo } : undefined;
    const hasFrom = !!selectedFrom;
    const displayValue = selectedFrom
        ? selectedTo
            ? `${formatDateDisplay(selectedFrom)} - ${formatDateDisplay(selectedTo)}`
            : `${formatDateDisplay(selectedFrom)} - ...`
        : placeholder;

    return (
        <div className={cn('w-full', className)}>
            <Field>
                <FieldLabel
                    htmlFor={`${nameDateFrom}-date-range-picker`}
                    className={cn('text-foreground', errorMessage && 'text-destructive')}
                >
                    {label}
                    <Show>
                        <Show.When isTrue={required}>
                            <span className={'text-destructive'}>*</span>
                        </Show.When>
                    </Show>
                </FieldLabel>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger
                        render={
                            <Button
                                id={`${nameDateFrom}-date-range-picker`}
                                type={'button'}
                                variant={'outline'}
                                disabled={disabled}
                                aria-invalid={!!errorMessage}
                                aria-describedby={
                                    errorMessage ? `${nameDateFrom}-error` : undefined
                                }
                                className={cn(
                                    'w-full justify-start bg-card font-normal hover:bg-card aria-expanded:bg-card',
                                    'focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30',
                                    'aria-expanded:border-primary aria-expanded:ring-2 aria-expanded:ring-primary/30',
                                    !hasFrom && 'text-muted-foreground',
                                    errorMessage && 'border-destructive'
                                )}
                            />
                        }
                    >
                        <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} />
                        <span className={'truncate'}>{displayValue}</span>
                    </PopoverTrigger>
                    <PopoverContent className={'w-auto p-0'} align={'start'}>
                        <Calendar
                            mode={'range'}
                            numberOfMonths={2}
                            selected={selectedRange}
                            onSelect={(nextRange) => {
                                onChange({
                                    target: {
                                        name: nameDateFrom,
                                        value: formatDateString(nextRange?.from)
                                    }
                                });
                                onChange({
                                    target: {
                                        name: nameDateTo,
                                        value: formatDateString(nextRange?.to)
                                    }
                                });
                            }}
                            defaultMonth={selectedFrom ?? new Date()}
                            captionLayout={'dropdown'}
                            startMonth={new Date(1990, 0, 1)}
                            endMonth={new Date(new Date().getFullYear() + 3, 11, 31)}
                            disabled={(date) => isDateOutOfRange(date, minDate, maxDate)}
                            components={{ Dropdown: CalendarDropdown }}
                            fixedWeeks
                        />
                    </PopoverContent>
                </Popover>
                <Show>
                    <Show.When isTrue={!!errorMessage}>
                        <FieldDescription //
                            id={`${nameDateFrom}-error`}
                            className={'text-destructive'}
                        >
                            {errorMessage}
                        </FieldDescription>
                    </Show.When>
                </Show>
            </Field>
        </div>
    );
};

export default DateRangePicker;
