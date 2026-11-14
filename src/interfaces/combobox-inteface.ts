export interface ComboboxOptions {
    label: string;
    value: string | number;
}

export interface DefaultComboboxProps {
    name: string;
    required?: boolean;
    errorMessage?: string;
    label: string;
    options: ComboboxOptions | any;
    placeholder: string;
    value: string | number;
    onValueChange: (value?: any, eventDetails?: any) => void;
    inputValue: string;
    onInputValueChange: (value?: any, eventDetails?: any) => void;
    disabled?: boolean;
    readOnly?: boolean;
    loading?: boolean;
}

export interface ComboboxFieldProps {
    name: string;
    required?: boolean;
    errorMessage?: string;
    label: string;
    placeholder: string;
    value: string | number;
    onChange: (value: any) => void;
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
}
