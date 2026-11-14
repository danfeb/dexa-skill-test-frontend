export interface DatePickerProps {
    name: string;
    label: string;
    placeholder?: string;
    value?: string;
    onChange: (value: any) => void;
    required?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    className?: string;
    minDate?: Date;
    maxDate?: Date;
}

export interface DateRangePickerChangeEvent {
    target: {
        name: string;
        value: string;
    };
}

export interface DateRangePickerProps {
    nameDateFrom: string;
    nameDateTo: string;
    label: string;
    placeholder?: string;
    valueDateFrom: string;
    valueDateTo: string;
    onChange: (event: DateRangePickerChangeEvent) => void;
    required?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    className?: string;
    minDate?: Date;
    maxDate?: Date;
}
