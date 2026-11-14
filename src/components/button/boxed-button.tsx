import React from 'react';
import { Button } from '@/components/ui/button';
import { ButtonProps } from '@/interfaces/button-interfaces';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const BoxedButton: React.FC<ButtonProps> = ({
    //
    icon,
    label,
    loading,
    className,
    size = 'default',
    onClick,
    disabled
}) => {
    return (
        <Button //
            size={size}
            variant={'default'}
            className={className}
            onClick={onClick}
            disabled={loading || disabled}
        >
            {' '}
            {loading ? <AiOutlineLoading3Quarters className={'size-3 animate-spin'} /> : icon}
            {label}
        </Button>
    );
};

export default BoxedButton;
