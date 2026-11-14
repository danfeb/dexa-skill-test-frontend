import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Show } from '@/components/conditional-rendering/show';
import { Button } from '@/components/ui/button';
import { FaUpload } from 'react-icons/fa6';
import { InputFileProps } from '@/interfaces/input-interfaces';

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

const InputFile: React.FC<InputFileProps> = ({
    //
    name,
    label,
    required = false,
    errorMessage,
    accept = '.jpg,.jpeg,.png,image/jpeg,image/png',
    maxSizeMB = 5,
    value,
    onChange,
    className,
    disabled = false
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [internalError, setInternalError] = useState('');
    const resolvedError = internalError || errorMessage;

    useEffect(() => {
        if (!value || !value.type.startsWith('image/')) {
            setPreviewUrl('');
            return;
        }

        const objectUrl = URL.createObjectURL(value);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [value]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        event.target.value = '';

        if (!file) {
            setInternalError('');
            onChange(null);
            return;
        }

        const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

        if (!ALLOWED_EXTENSIONS.includes(extension)) {
            setInternalError('Only JPG, JPEG, and PNG files are allowed.');
            onChange(null);
            return;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            setInternalError(`Maximum file size is ${maxSizeMB}MB.`);
            onChange(null);
            return;
        }

        setInternalError('');
        onChange(file);
    };

    return (
        <div className={cn('w-full', className)}>
            <Field>
                <FieldLabel
                    htmlFor={`${name}-file`}
                    className={cn('text-foreground', resolvedError && 'text-destructive')}
                >
                    {label}
                    <Show>
                        <Show.When isTrue={required}>
                            <span className={'text-destructive'}>*</span>
                        </Show.When>
                    </Show>
                </FieldLabel>
                <input
                    ref={inputRef}
                    id={`${name}-file`}
                    type={'file'}
                    accept={accept}
                    disabled={disabled}
                    onChange={handleFileChange}
                    aria-invalid={!!resolvedError}
                    aria-describedby={resolvedError ? `${name}-error` : undefined}
                    className={'sr-only'}
                />
                <Button
                    type={'button'}
                    variant={'outline'}
                    disabled={disabled}
                    onClick={() => inputRef.current?.click()}
                    className={cn(
                        'w-full justify-start bg-card font-normal',
                        resolvedError && 'border-destructive'
                    )}
                >
                    <FaUpload />
                    Choose File
                </Button>
                <FieldDescription>JPG, JPEG, or PNG. Maximum size {maxSizeMB}MB.</FieldDescription>
                {previewUrl && value && (
                    <div className={'mt-1 mb-2 flex flex-col gap-2 rounded-lg border bg-card p-2'}>
                        <img
                            src={previewUrl}
                            alt={value.name}
                            className={'w-40 rounded-md object-contain'}
                        />
                        <div className={'min-w-0'}>
                            <p className={'truncate text-xs font-medium'}>{value.name}</p>
                            <p className={'text-xs text-muted-foreground'}>
                                {Math.ceil(value.size / 1024)} KB
                            </p>
                        </div>
                    </div>
                )}
                <Show>
                    <Show.When isTrue={!!resolvedError}>
                        <FieldDescription //
                            id={`${name}-error`}
                            className={'text-destructive'}
                        >
                            {resolvedError}
                        </FieldDescription>
                    </Show.When>
                </Show>
            </Field>
        </div>
    );
};

export default InputFile;
