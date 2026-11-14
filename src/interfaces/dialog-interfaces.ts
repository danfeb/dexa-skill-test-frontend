import React from 'react';

export type ModalPosition = 'center' | 'top';

export interface ChildModalWrapperProps {
    visible: boolean;
    onHide: () => void;
    children: React.ReactNode;
    headerTitle?: string;
    className?: string;
    rightComponent?: React.ReactNode;
    dismissableMask?: boolean;
    position?: ModalPosition;
    style?: React.CSSProperties;
    maximized?: boolean;
    customContentStyle?: React.CSSProperties;
}

export interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export interface LoadingDialogProps {
    visible: boolean;
    title?: string;
}
