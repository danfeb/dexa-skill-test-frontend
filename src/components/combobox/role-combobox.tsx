import { ComboboxFieldProps, ComboboxOptions } from '@/interfaces/combobox-inteface';
import { cn } from '@/lib/utils';
import { Field } from '@/components/ui/field';
import React, { useState } from 'react';
import DefaultCombobox from '@/components/combobox/default-combobox';

const RoleCombobox: React.FC<ComboboxFieldProps> = ({
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
    const [filterValue, setFilterValue] = useState('');
    const options: ComboboxOptions[] = [
        { label: 'ADMIN', value: 'admin' },
        { label: 'USER', value: 'user' }
    ];

    return (
        <div className={cn('w-full', className)}>
            <Field>
                <DefaultCombobox
                    required={required}
                    name={name}
                    label={label}
                    disabled={disabled}
                    readOnly={readOnly}
                    options={options}
                    placeholder={placeholder}
                    value={value}
                    errorMessage={errorMessage}
                    onValueChange={(e) => {
                        onChange(e);
                    }}
                    inputValue={filterValue}
                    onInputValueChange={(label) => {
                        setFilterValue(label);
                    }}
                />
            </Field>
        </div>
    );
};

export default RoleCombobox;
