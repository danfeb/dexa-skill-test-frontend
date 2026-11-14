import React from 'react';
import { TitlePageProps } from '@/interfaces/title-interfaces';
import { cn } from '@/lib/utils';

const TitlePage: React.FC<TitlePageProps> = ({
    //
    title = 'Title',
    subtitle,
    className,
    additionalComponent
}) => {
    return (
        <div className={cn('flex justify-between', className)}>
            <div>
                <h1 className={cn('text-xl font-bold')}>{title}</h1>
                <h3 className={cn('text-muted-foreground')}>{subtitle}</h3>
            </div>
            {additionalComponent}
        </div>
    );
};

export default TitlePage;
