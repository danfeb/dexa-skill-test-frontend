import React, { useContext, useEffect, useState } from 'react';
import { ComboboxFieldProps, ComboboxOptions } from '@/interfaces/combobox-inteface';
import { cn } from '@/lib/utils';
import DefaultCombobox from '@/components/combobox/default-combobox';
import _ from 'lodash';
import { get } from '@/utils/api-utils';
import { LayoutContext } from '@/layout/layout-context';

const EmployeeCombobox: React.FC<ComboboxFieldProps> = ({
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
    const { showToast } = useContext(LayoutContext);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [keyword, setKeyword] = useState('');
    const [options, setOptions] = useState<ComboboxOptions[]>([]);

    const getEmployeeList = async (limit = 50, offset = 0) => {
        setLoading(true);
        const url = `${import.meta.env.VITE_API_MASTER}/employee/list`;
        const params = {
            keyword: keyword,
            limit: limit,
            offset: offset
        };

        try {
            const response = await get(url, params);
            setOptions(
                (response.result ?? []).map((item: any) => ({
                    ...item,
                    label: `${item.code} | ${item.fullName}`,
                    value: item.id
                }))
            );
        } catch (error: any) {
            const errorMessage = error.response?.data?.message ?? error.message;
            showToast('Error', errorMessage, 'error');
            setOptions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debouncedCallApiFunction = _.debounce(async () => {
            getEmployeeList();
        }, 800);

        debouncedCallApiFunction();

        return () => debouncedCallApiFunction.cancel();
    }, [keyword]);

    return (
        <div className={cn('w-full', className)}>
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
                loading={loading}
                onValueChange={(e) => {
                    onChange(e);
                }}
                inputValue={inputValue}
                onInputValueChange={(value, eventDetails) => {
                    setInputValue(value);

                    if (
                        eventDetails?.reason === 'input-change' ||
                        eventDetails?.reason === 'input-clear'
                    ) {
                        setKeyword(value);
                    }
                }}
            />
        </div>
    );
};

export default EmployeeCombobox;
