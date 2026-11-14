import React from 'react';
import { BadgeProps } from '@/interfaces/badge-interfaces';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const WorkTypeBadge: React.FC<BadgeProps> = ({ value, className }) => {
    const valueClassname = `${
        value === 'WFH' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300' : ''
    }`;

    return (
        <Badge //
            variant={'outline'}
            className={cn('border-none', valueClassname, className)}
        >
            {value}
        </Badge>
    );
};

export default WorkTypeBadge;
