import * as React from 'react';
import { Toast as ToastPrimitive } from '@base-ui/react/toast';
import { cn } from 'cn';

import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Alert02Icon,
    Cancel01Icon,
    CheckmarkCircle02Icon,
    InformationCircleIcon,
    Loading03Icon,
    MultiplicationSignCircleIcon
} from '@hugeicons/core-free-icons';

const toast = ToastPrimitive.createToastManager();

const toastTypeStyles: Record<string, string> = {
    success:
        'rounded-lg border-emerald-500/40 bg-emerald-50/85 text-emerald-950 [&_[data-slot=toast-icon]]:text-emerald-600 [&_[data-slot=toast-title]]:text-emerald-700 [&_[data-slot=toast-description]]:text-emerald-700 [&_[data-slot=toast-close]]:text-emerald-600 [&_[data-slot=toast-close]]:hover:bg-emerald-500/15 [&_[data-slot=toast-close]]:hover:text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-950/70 dark:text-emerald-50 dark:[&_[data-slot=toast-icon]]:text-emerald-300 dark:[&_[data-slot=toast-title]]:text-emerald-300 dark:[&_[data-slot=toast-description]]:text-emerald-200 dark:[&_[data-slot=toast-close]]:text-emerald-300 dark:[&_[data-slot=toast-close]]:hover:bg-emerald-400/20 dark:[&_[data-slot=toast-close]]:hover:text-emerald-100',
    info: 'rounded-lg border-sky-500/40 bg-sky-50/85 text-sky-950 [&_[data-slot=toast-icon]]:text-sky-600 [&_[data-slot=toast-title]]:text-sky-700 [&_[data-slot=toast-description]]:text-sky-700 [&_[data-slot=toast-close]]:text-sky-600 [&_[data-slot=toast-close]]:hover:bg-sky-500/15 [&_[data-slot=toast-close]]:hover:text-sky-800 dark:border-sky-400/30 dark:bg-sky-950/70 dark:text-sky-50 dark:[&_[data-slot=toast-icon]]:text-sky-300 dark:[&_[data-slot=toast-title]]:text-sky-300 dark:[&_[data-slot=toast-description]]:text-sky-200 dark:[&_[data-slot=toast-close]]:text-sky-300 dark:[&_[data-slot=toast-close]]:hover:bg-sky-400/20 dark:[&_[data-slot=toast-close]]:hover:text-sky-100',
    warning:
        'rounded-lg border-amber-500/40 bg-amber-50/85 text-amber-950 [&_[data-slot=toast-icon]]:text-amber-600 [&_[data-slot=toast-title]]:text-amber-700 [&_[data-slot=toast-description]]:text-amber-700 [&_[data-slot=toast-close]]:text-amber-600 [&_[data-slot=toast-close]]:hover:bg-amber-500/15 [&_[data-slot=toast-close]]:hover:text-amber-800 dark:border-amber-400/30 dark:bg-amber-950/70 dark:text-amber-50 dark:[&_[data-slot=toast-icon]]:text-amber-300 dark:[&_[data-slot=toast-title]]:text-amber-300 dark:[&_[data-slot=toast-description]]:text-amber-200 dark:[&_[data-slot=toast-close]]:text-amber-300 dark:[&_[data-slot=toast-close]]:hover:bg-amber-400/20 dark:[&_[data-slot=toast-close]]:hover:text-amber-100',
    error: 'rounded-lg border-red-500/40 bg-red-50/85 text-red-950 [&_[data-slot=toast-icon]]:text-red-600 [&_[data-slot=toast-title]]:text-red-700 [&_[data-slot=toast-description]]:text-red-700 [&_[data-slot=toast-close]]:text-red-600 [&_[data-slot=toast-close]]:hover:bg-red-500/15 [&_[data-slot=toast-close]]:hover:text-red-800 dark:border-red-400/30 dark:bg-red-950/70 dark:text-red-50 dark:[&_[data-slot=toast-icon]]:text-red-300 dark:[&_[data-slot=toast-title]]:text-red-300 dark:[&_[data-slot=toast-description]]:text-red-200 dark:[&_[data-slot=toast-close]]:text-red-300 dark:[&_[data-slot=toast-close]]:hover:bg-red-400/20 dark:[&_[data-slot=toast-close]]:hover:text-red-100',
    loading:
        'border-border bg-popover/90 text-popover-foreground [&_[data-slot=toast-icon]]:text-muted-foreground'
};

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
    return <ToastPrimitive.Provider {...props} />;
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
    return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />;
}

function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
    return (
        <ToastPrimitive.Viewport
            data-slot="toast-viewport"
            className={cn(
                'pointer-events-none fixed top-4 right-4 left-auto z-[9999999] w-[calc(100%-2rem)] max-w-xs outline-none',
                className
            )}
            {...props}
        />
    );
}

function Toast({ className, ...props }: ToastPrimitive.Root.Props) {
    return (
        <ToastPrimitive.Root
            data-slot="toast"
            className={cn(
                'group/toast pointer-events-auto absolute top-0 right-0 z-[calc(1000-var(--toast-index))] w-full origin-top rounded-md border bg-popover/90 text-popover-foreground shadow-lg backdrop-blur-sm will-change-transform outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                '[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)+calc(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]',
                'h-(--height) [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]',
                "after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
                'data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]',
                'data-limited:opacity-0 data-starting-style:[transform:translateY(-150%)]',
                '[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(-150%)]',
                'data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]',
                'data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
                'data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
                'data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]',
                'data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]',
                'data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
                'data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
                'data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]',
                toastTypeStyles[props.toast?.type ?? ''],
                className
            )}
            {...props}
        />
    );
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
    return (
        <ToastPrimitive.Content
            data-slot="toast-content"
            className={cn(
                'flex h-full items-center gap-2 overflow-hidden p-3 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100',
                className
            )}
            {...props}
        />
    );
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
    return (
        <ToastPrimitive.Title
            data-slot="toast-title"
            className={cn('text-xs font-semibold', className)}
            {...props}
        />
    );
}

function ToastDescription({ className, ...props }: ToastPrimitive.Description.Props) {
    return (
        <ToastPrimitive.Description
            data-slot="toast-description"
            className={cn('text-xs text-muted-foreground', className)}
            {...props}
        />
    );
}

function ToastAction({
    className,
    render = <Button variant="outline" size="sm" />,
    ...props
}: ToastPrimitive.Action.Props) {
    return (
        <ToastPrimitive.Action
            data-slot="toast-action"
            render={render}
            className={cn('shrink-0', className)}
            {...props}
        />
    );
}

function ToastClose({
    className,
    children,
    render = <Button variant="ghost" size="icon-sm" />,
    ...props
}: ToastPrimitive.Close.Props) {
    return (
        <ToastPrimitive.Close
            data-slot="toast-close"
            aria-label="Close toast"
            render={render}
            className={cn(
                "relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-foreground",
                className
            )}
            {...props}
        >
            {children ?? <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} aria-hidden="true" />}
        </ToastPrimitive.Close>
    );
}

function ToastIcon({ type }: { type: string | undefined }) {
    let icon: React.ReactNode = null;

    if (type === 'success') {
        icon = <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} aria-hidden="true" />;
    }

    if (type === 'info') {
        icon = <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} aria-hidden="true" />;
    }

    if (type === 'warning') {
        icon = <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} aria-hidden="true" />;
    }

    if (type === 'error') {
        icon = (
            <HugeiconsIcon icon={MultiplicationSignCircleIcon} strokeWidth={2} aria-hidden="true" />
        );
    }

    if (type === 'loading') {
        icon = (
            <HugeiconsIcon
                icon={Loading03Icon}
                strokeWidth={2}
                className="animate-spin"
                aria-hidden="true"
            />
        );
    }

    if (!icon) {
        return null;
    }

    return (
        <span
            data-slot="toast-icon"
            className="shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5"
        >
            {icon}
        </span>
    );
}

function ToastList() {
    const { toasts } = ToastPrimitive.useToastManager();

    return toasts.map((toastItem) => (
        <Toast key={toastItem.id} toast={toastItem}>
            <ToastContent>
                <ToastIcon type={toastItem.type} />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <ToastTitle />
                    <ToastDescription />
                </div>
                <ToastAction />
                <ToastClose />
            </ToastContent>
        </Toast>
    ));
}

function Toaster({ children, toastManager = toast, ...props }: ToastPrimitive.Provider.Props) {
    return (
        <ToastProvider toastManager={toastManager} {...props}>
            {children}
            <ToastPortal>
                <ToastViewport>
                    <ToastList />
                </ToastViewport>
            </ToastPortal>
        </ToastProvider>
    );
}

const createToastManager = ToastPrimitive.createToastManager;
const useToastManager = ToastPrimitive.useToastManager;

export {
    Toaster,
    Toast,
    ToastAction,
    ToastClose,
    ToastContent,
    ToastDescription,
    ToastPortal,
    ToastProvider,
    ToastTitle,
    ToastViewport,
    createToastManager,
    toast,
    useToastManager
};
