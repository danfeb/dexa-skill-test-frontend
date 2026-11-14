import React from 'react';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { Show } from '@/components/conditional-rendering/show';
import { InputFieldProps } from '@/interfaces/input-interfaces';
import { Textarea } from '@/components/ui/textarea';

const InputTextarea: React.FC<InputFieldProps> = ({
    //
    name,
    required = false,
    label,
    placeholder,
    value,
    onChange,
    className,
    disabled = false,
    readOnly = false,
    errorMessage
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
                <Textarea //
                    name={name}
                    disabled={disabled}
                    readOnly={readOnly}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={'bg-card'}
                    aria-invalid={!!errorMessage}
                    aria-describedby={errorMessage ? `${name}-error` : undefined}
                />
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

export default InputTextarea;
