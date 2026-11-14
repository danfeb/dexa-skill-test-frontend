import React from 'react';
import { Button } from '@/components/ui/button';
import { ButtonProps } from '@/interfaces/button-interfaces';
import DefaultTooltip from '@/components/tooltip/default-tooltip';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const OutlineButton: React.FC<ButtonProps> = ({
    //
    icon,
    label,
    loading,
    className,
    size = 'default',
    onClick,
    tooltip,
    disabled = false
}) => {
    return (
        <DefaultTooltip tooltip={tooltip}>
            <Button //
                size={size}
                variant={'outline'}
                className={className}
                onClick={onClick}
                disabled={disabled}
            >
                {' '}
                {loading ? <AiOutlineLoading3Quarters className={'size-3 animate-spin'} /> : icon}
                {label}
            </Button>
        </DefaultTooltip>
    );
};

export default OutlineButton;
