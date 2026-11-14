import React from 'react';
import { InputFieldProps } from '@/interfaces/input-interfaces';
import { cn } from '@/lib/utils';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Show } from '@/components/conditional-rendering/show';
import { Input } from '@/components/ui/input';

const InputPassword: React.FC<InputFieldProps> = ({
    name,
    required = false,
    label,
    placeholder,
    value,
    onChange,
    className,
    disabled = false,
    readOnly = false,
    errorMessage,
    info
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
                    type={'password'}
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
                    <Show.When isTrue={!!errorMessage || !!info}>
                        <FieldDescription //
                            id={`${name}-error`}
                            className={'flex'}
                        >
                            <Show>
                                <Show.When isTrue={!!info && !errorMessage}>
                                    <span>{`${info}. `}</span>
                                </Show.When>
                            </Show>
                            <Show>
                                <Show.When isTrue={!!errorMessage}>
                                    <span className={'text-destructive'}>{`${errorMessage}`}</span>
                                </Show.When>
                            </Show>
                        </FieldDescription>
                    </Show.When>
                </Show>
            </Field>
        </div>
    );
};

export default InputPassword;
