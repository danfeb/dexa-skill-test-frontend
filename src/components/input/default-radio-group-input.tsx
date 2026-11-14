import React from 'react';
import { cn } from '@/lib/utils';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Show } from '@/components/conditional-rendering/show';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DefaultRadioGroupProps } from '@/interfaces/radio-interfaces';

const DefaultRadioGroupInput: React.FC<DefaultRadioGroupProps> = ({
    //
    name,
    label,
    options,
    value,
    onValueChange,
    required = false,
    errorMessage,
    disabled = false,
    className,
    orientation = 'vertical'
}) => {
    return (
        <div className={cn('w-full', className)}>
            <Field>
                <FieldLabel className={cn('text-foreground', errorMessage && 'text-destructive')}>
                    {label}
                    <Show>
                        <Show.When isTrue={required}>
                            <span className={'text-destructive'}>*</span>
                        </Show.When>
                    </Show>
                </FieldLabel>
                <RadioGroup
                    name={name}
                    value={value}
                    onValueChange={(value) => {
                        const customEvent = {
                            target: {
                                name: name,
                                value: value
                            },
                            value: value
                        };
                        onValueChange(customEvent);
                    }}
                    disabled={disabled}
                    aria-invalid={!!errorMessage}
                    aria-describedby={errorMessage ? `${name}-error` : undefined}
                    className={cn(
                        orientation === 'horizontal'
                            ? 'flex flex-row flex-wrap items-center gap-4'
                            : 'grid gap-2'
                    )}
                >
                    {options.map((option) => {
                        const optionId = `${name}-${option.value}`;

                        return (
                            <div key={option.value} className={'flex items-center gap-2'}>
                                <RadioGroupItem
                                    id={optionId}
                                    value={option.value}
                                    disabled={disabled}
                                />
                                <Label
                                    htmlFor={optionId}
                                    className={cn(
                                        'cursor-pointer text-xs/relaxed font-normal',
                                        disabled && 'cursor-not-allowed opacity-50'
                                    )}
                                >
                                    {option.label}
                                </Label>
                            </div>
                        );
                    })}
                </RadioGroup>
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

export default DefaultRadioGroupInput;
