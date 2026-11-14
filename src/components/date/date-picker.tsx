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
import { DatePickerProps } from '@/interfaces/date-picker-interfaces';

const DatePicker: React.FC<DatePickerProps> = ({
    //
    name,
    label,
    placeholder = 'Pick a date',
    value,
    onChange,
    required = false,
    errorMessage,
    disabled = false,
    className,
    minDate,
    maxDate
}) => {
    const [open, setOpen] = useState(false);
    const selectedDate = parseDateString(value);
    const hasValue = !!selectedDate;
    const displayValue = selectedDate ? formatDateDisplay(selectedDate) : placeholder;

    return (
        <div className={cn('w-full', className)}>
            <Field>
                <FieldLabel
                    htmlFor={`${name}-date-picker`}
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
                                id={`${name}-date-picker`}
                                type={'button'}
                                variant={'outline'}
                                disabled={disabled}
                                aria-invalid={!!errorMessage}
                                aria-describedby={errorMessage ? `${name}-error` : undefined}
                                className={cn(
                                    'w-full justify-start bg-card font-normal hover:bg-card aria-expanded:bg-card',
                                    'focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30',
                                    'aria-expanded:border-primary aria-expanded:ring-2 aria-expanded:ring-primary/30',
                                    !hasValue && 'text-muted-foreground',
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
                            mode={'single'}
                            selected={selectedDate}
                            onSelect={(dateValue) => {
                                const customEvent = {
                                    target: {
                                        name: name,
                                        value: formatDateString(dateValue)
                                    },
                                    value: formatDateString(dateValue)
                                };

                                onChange(customEvent);
                                setOpen(false);
                            }}
                            defaultMonth={selectedDate ?? new Date()}
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
                            id={`${name}-error`}
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

export default DatePicker;
