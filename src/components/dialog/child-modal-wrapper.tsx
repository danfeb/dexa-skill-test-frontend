import React from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChildModalWrapperProps } from '@/interfaces/dialog-interfaces';

const ChildModalWrapper: React.FC<ChildModalWrapperProps> = ({
    //
    visible,
    onHide,
    children,
    headerTitle = '',
    className,
    rightComponent,
    dismissableMask = true,
    position = 'center',
    style,
    maximized = false,
    customContentStyle
}) => {
    return (
        <Dialog
            open={visible}
            onOpenChange={(open) => {
                if (!open) {
                    onHide();
                }
            }}
            disablePointerDismissal={!dismissableMask}
        >
            <DialogContent
                style={style}
                className={cn(
                    'max-w-lg md:max-w-xl',
                    position === 'top' ? 'top-8 translate-y-0' : 'top-1/2 -translate-y-1/2',
                    maximized &&
                        'h-[calc(100dvh-2rem)] md:max-w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)]',
                    className
                )}
            >
                <DialogHeader className={'flex flex-row items-center justify-between gap-4 pr-8'}>
                    <DialogTitle className={'text-base font-semibold'}>{headerTitle}</DialogTitle>
                    {rightComponent && <div>{rightComponent}</div>}
                </DialogHeader>
                <div style={customContentStyle}>{children}</div>
            </DialogContent>
        </Dialog>
    );
};

export default ChildModalWrapper;
