import { ComboboxFieldProps, ComboboxOptions } from '@/interfaces/combobox-inteface';
import { cn } from '@/lib/utils';
import { Field } from '@/components/ui/field';
import React, { useState } from 'react';
import DefaultCombobox from '@/components/combobox/default-combobox';

const StaffLevelCombobox: React.FC<ComboboxFieldProps> = ({
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
        { label: 'NON-STAFF', value: 'non-staff' },
        { label: 'STAFF', value: 'staff' },
        { label: 'SPV', value: 'spv' },
        { label: 'MANAGER', value: 'manager' }
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

export default StaffLevelCombobox;
