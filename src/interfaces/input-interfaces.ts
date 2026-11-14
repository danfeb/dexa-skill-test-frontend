export interface InputFieldProps {
    name: string;
    required?: boolean;
    errorMessage?: string;
    info?: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: any) => void;
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
}

export interface InputFileProps {
    name: string;
    label: string;
    required?: boolean;
    errorMessage?: string;
    accept?: string;
    maxSizeMB?: number;
    value?: File | null;
    onChange: (file: File | null) => void;
    className?: string;
    disabled?: boolean;
}
