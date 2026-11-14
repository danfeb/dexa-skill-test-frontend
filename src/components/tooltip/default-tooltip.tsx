import React from 'react';
import { TooltipProps } from '@/interfaces/tooltip-interfaces';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const DefaultTooltip: React.FC<TooltipProps> = ({
    //
    children,
    tooltip
}) => {
    if (!tooltip) {
        return <>{children}</>;
    }

    return (
        <Tooltip>
            <TooltipTrigger render={children} />
            <TooltipContent side={'bottom'} align={'center'}>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    );
};

export default DefaultTooltip;
