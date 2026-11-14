import { IconType } from 'react-icons';

export type ButtonSizeTypes =
    'xs' | 'sm' | 'lg' | 'icon' | 'default' | 'icon-xs' | 'icon-sm' | 'icon-lg';

export type TableAlign = 'left' | 'center' | 'right';
export type TableSelectionMode = 'none' | 'single' | 'multiple';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export type MenuItem = {
    title: string;
    url: string;
    icon?: IconType;
    isActive?: boolean;
    access?: boolean;
    items?: {
        title: string;
        url: string;
        access?: boolean;
    }[];
};

export type MenuGroup = {
    groupLabel: string;
    items: MenuItem[];
};
