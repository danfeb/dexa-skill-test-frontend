import React from 'react';
import DefaultRadioGroupInput from '@/components/input/default-radio-group-input';
import { RadioInputProps, RadioOptions } from '@/interfaces/radio-interfaces';

const ActiveInactiveRadioInput: React.FC<RadioInputProps> = ({
    //
    name,
    label,
    value,
    onChange,
    required = false,
    errorMessage,
    disabled = false,
    className,
    orientation = 'vertical'
}) => {
    const options: RadioOptions[] = [
        { label: 'Active', value: 'Y' },
        { label: 'Inactive', value: 'N' }
    ];

    return (
        <DefaultRadioGroupInput
            name={name}
            label={label}
            value={value}
            onValueChange={onChange}
            required={required}
            errorMessage={errorMessage}
            disabled={disabled}
            className={className}
            orientation={orientation}
            options={options}
        />
    );
};

export default ActiveInactiveRadioInput;
