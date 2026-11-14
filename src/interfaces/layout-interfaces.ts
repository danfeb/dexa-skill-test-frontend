import { MenuModeType, ThemeType } from '@/types/layout-config-types';
import { MenuGroup, ToastType } from '@/types/component-types';

// LAYOUT CONFIG (Layout Context)
export interface LayoutConfigProps {
    menuMode: MenuModeType;
    theme: ThemeType;
}

// LAYOUT CONTEXT
export interface LayoutContextProps {
    layoutConfig: LayoutConfigProps;
    setLayoutConfig: (layoutConfig: LayoutConfigProps) => void;
    showToast: (title?: string, description?: string, type?: ToastType) => void;
    confirmDialog: (title: string, message: string) => Promise<boolean>;
    showLoading: (visible: boolean) => void;
}

// SIDEBAR INTERFACE
export interface SidebarProps {
    listMenu: MenuGroup[];
}
