import React from 'react';
import { Outlet } from 'react-router-dom';
import TopbarLayout from '@/layout/component/topbar-layout';
import SidebarLayout from '@/layout/component/sidebar-layout';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { getFilteredSidebarMenu } from '@/layout/config/sidebar-menu';

const MainLayout: React.FC = () => {
    const sidebarMenu = getFilteredSidebarMenu();

    return (
        <SidebarProvider defaultOpen={false}>
            <TooltipProvider>
                <TopbarLayout />
                <SidebarLayout listMenu={sidebarMenu} />
                <div className={'flex flex-col w-full p-[1.5rem] md:ml-[3rem] mt-[3rem]'}>
                    <Outlet />
                </div>
            </TooltipProvider>
        </SidebarProvider>
    );
};

export default MainLayout;
