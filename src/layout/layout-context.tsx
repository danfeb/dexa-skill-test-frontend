import React, { useRef, useState } from 'react';
import { LayoutConfigProps, LayoutContextProps } from '@/interfaces/layout-interfaces';
import { ChildrenProps } from '@/interfaces/child-interfaces';
import { ThemeType } from '@/types/layout-config-types';
import { toast, Toaster } from '@/components/ui/toast';
import { ToastType } from '@/types/component-types';
import ConfirmDialog from '@/components/dialog/confirm-dialog';
import LoadingDialog from '@/components/dialog/loading-dialog';

export const LayoutContext = React.createContext({} as LayoutContextProps);

export const LayoutProvider = (props: ChildrenProps) => {
    const [layoutConfig, setLayoutConfig] = useState<LayoutConfigProps>({
        menuMode: 'sidebar',
        theme: (localStorage.getItem('theme') ?? 'light') as ThemeType
    });

    const confirmResolveRef = useRef<((value: boolean) => void) | null>(null);
    const [confirmState, setConfirmState] = useState({
        open: false,
        title: '',
        message: ''
    });
    const [loadingVisible, setLoadingVisible] = useState(false);

    const showToast = (
        title: string = 'Success',
        description: string = 'Process is successful',
        type: ToastType = 'success'
    ) => {
        toast.add({
            title: title,
            description: description,
            type: type
        });
    };

    const closeConfirmDialog = (value: boolean) => {
        confirmResolveRef.current?.(value);
        confirmResolveRef.current = null;
        setConfirmState((previousState) => ({ ...previousState, open: false }));
    };

    const confirmDialog = (title: string, message: string): Promise<boolean> => {
        return new Promise<boolean>((resolve) => {
            confirmResolveRef.current?.(false);
            confirmResolveRef.current = resolve;
            setConfirmState({ open: true, title, message });
        });
    };

    const showLoading = (visible: boolean) => {
        setLoadingVisible(visible);
    };

    const value = {
        layoutConfig,
        setLayoutConfig,
        showToast,
        confirmDialog,
        showLoading
    };
    return (
        <LayoutContext.Provider value={value}>
            {props.children}
            <ConfirmDialog
                open={confirmState.open}
                title={confirmState.title}
                message={confirmState.message}
                onConfirm={() => closeConfirmDialog(true)}
                onCancel={() => closeConfirmDialog(false)}
            />
            <LoadingDialog visible={loadingVisible} />
            <Toaster />
        </LayoutContext.Provider>
    );
};
