import React from 'react';
import { Outlet } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';

const FullPageLayout: React.FC = () => {
    return (
        <TooltipProvider>
            <div className={'min-h-screen w-full'}>
                <Outlet />
            </div>
        </TooltipProvider>
    );
};

export default FullPageLayout;
