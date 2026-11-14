import React from 'react';
import { cn } from '@/lib/utils';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Show } from '@/components/conditional-rendering/show';
import { Input } from '@/components/ui/input';
import { InputFieldProps } from '@/interfaces/input-interfaces';

const InputEmail: React.FC<InputFieldProps> = ({
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
                <Input //
                    type={'email'}
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

export default InputEmail;
