import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ActiveInactiveBadgeProps } from '@/interfaces/badge-interfaces';

const ActiveInactiveBadge: React.FC<ActiveInactiveBadgeProps> = ({
    //
    isActive,
    activeLabel = 'ACTIVE',
    inactiveLabel = 'INACTIVE',
    className
}) => {
    return (
        <Badge //
            variant={'outline'}
            className={cn(
                'border-none',
                isActive
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
                className
            )}
        >
            {isActive ? activeLabel : inactiveLabel}
        </Badge>
    );
};

export default ActiveInactiveBadge;
