import React from 'react';
import { Button } from '@/components/ui/button';
import { ButtonProps } from '@/interfaces/button-interfaces';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import DefaultTooltip from '@/components/tooltip/default-tooltip';

const GhostButton: React.FC<ButtonProps> = ({
    //
    icon,
    label,
    loading,
    className,
    size = 'default',
    onClick,
    disabled,
    tooltip
}) => {
    return (
        <DefaultTooltip tooltip={tooltip}>
            <Button //
                size={size}
                variant={'ghost'}
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

export default GhostButton;
