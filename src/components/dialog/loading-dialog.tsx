import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LoadingDialogProps } from '@/interfaces/dialog-interfaces';

const LoadingDialog: React.FC<LoadingDialogProps> = ({
    //
    visible,
    title = 'Processing your request...'
}) => {
    return (
        <Dialog open={visible} onOpenChange={() => {}} disablePointerDismissal>
            <DialogContent showCloseButton={false} className={'min-w-xl'}>
                <DialogHeader>
                    <DialogTitle className={'text-center italic'}>
                        <span>{title}</span>
                    </DialogTitle>
                </DialogHeader>
                <div className={'h-1.5 w-full overflow-hidden rounded-full bg-muted'}>
                    <div className={'h-full w-1/3 animate-loading-bar rounded-full bg-primary'} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoadingDialog;
