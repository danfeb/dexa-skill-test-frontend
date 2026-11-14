export interface RadioOptions {
    label: string;
    value: string | number;
}

export interface DefaultRadioGroupProps {
    name: string;
    label: string;
    options: RadioOptions[];
    value: string;
    onValueChange: (value?: any) => void;
    required?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    className?: string;
    orientation?: 'vertical' | 'horizontal';
}

export interface RadioInputProps {
    name: string;
    label: string;
    value: string;
    onChange: (value?: any) => void;
    required?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    className?: string;
    orientation?: 'vertical' | 'horizontal';
}
