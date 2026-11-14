import React from 'react';
import { ButtonSizeTypes } from '@/types/component-types';

export interface ButtonProps {
    icon?: React.ReactNode;
    label?: string;
    loading?: boolean;
    className?: string;
    size?: ButtonSizeTypes;
    onClick?: () => void;
    tooltip?: string;
    disabled?: boolean;
}

export interface MenuButtonItem {
    icon?: React.ReactNode;
    label: string;
    variant?: 'default' | 'destructive';
    onClick?: () => void;
}

export interface MenuButtonProps extends ButtonProps {
    menu: MenuButtonItem[];
    customIcon?: React.ReactNode;
}
