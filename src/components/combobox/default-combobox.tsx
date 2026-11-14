import React, { useEffect, useState } from 'react';
import { ComboboxOptions, DefaultComboboxProps } from '@/interfaces/combobox-inteface';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList
} from '@/components/ui/combobox';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { Show } from '@/components/conditional-rendering/show';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const DefaultCombobox: React.FC<DefaultComboboxProps> = ({
    //
    name,
    label,
    required = false,
    options,
    placeholder,
    value,
    onValueChange,
    inputValue,
    onInputValueChange,
    disabled = false,
    readOnly = false,
    errorMessage,
    loading = false
}) => {
    const [open, setOpen] = useState(false);
    const selectedItem = options.find((item: ComboboxOptions) => item.value === value);
    const hasSelectedValue = value !== undefined && value !== null;

    useEffect(() => {
        if (value && inputValue === '' && selectedItem) {
            onInputValueChange(selectedItem.label);
        }
    }, [value, inputValue, selectedItem, onInputValueChange]);

    return (
        <Field>
            <FieldLabel className={cn('text-foreground', errorMessage && 'text-destructive')}>
                {label}
                <Show>
                    <Show.When isTrue={required}>
                        <span className={'text-destructive'}>*</span>
                    </Show.When>
                </Show>
            </FieldLabel>
            <Combobox
                name={name}
                items={options}
                open={open}
                onOpenChange={setOpen}
                value={selectedItem ?? null}
                onValueChange={(value, eventDetails) => {
                    const customEvent = {
                        target: {
                            name: name,
                            value: value?.value
                        },
                        value: value?.value
                    };
                    onValueChange(customEvent, eventDetails);
                }}
                inputValue={inputValue}
                onInputValueChange={(label, eventDetails) => {
                    const isTyping = eventDetails?.reason === 'input-change';
                    const nextLabel =
                        isTyping && selectedItem && label.startsWith(selectedItem.label)
                            ? label.slice(selectedItem.label.length)
                            : label;

                    onInputValueChange(nextLabel, eventDetails);
                }}
                itemToStringValue={(item) => item.label}
            >
                <ComboboxInput //
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    loading={loading}
                    aria-invalid={!!errorMessage}
                    aria-describedby={errorMessage ? `${name}-error` : undefined}
                    className={'bg-card'}
                    showTrigger={!disabled && !readOnly}
                    showClear={!disabled && !readOnly}
                    onFocus={(event) => {
                        setOpen(true);

                        if (
                            hasSelectedValue &&
                            selectedItem &&
                            event.currentTarget.value === selectedItem.label
                        ) {
                            event.currentTarget.select();
                        }
                    }}
                    onClick={(event) => {
                        setOpen(true);

                        if (
                            hasSelectedValue &&
                            selectedItem &&
                            event.currentTarget.value === selectedItem.label
                        ) {
                            event.currentTarget.select();
                        }
                    }}
                />

                <ComboboxContent>
                    {loading ? (
                        <div className={'flex items-center justify-center py-4'}>
                            <AiOutlineLoading3Quarters
                                className={'size-4 animate-spin text-muted-foreground'}
                            />
                        </div>
                    ) : (
                        <>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>

                            <ComboboxList>
                                {(item: ComboboxOptions) => (
                                    <ComboboxItem key={item.value} value={item}>
                                        {item.label}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </>
                    )}
                </ComboboxContent>
            </Combobox>

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
    );
};

export default DefaultCombobox;
