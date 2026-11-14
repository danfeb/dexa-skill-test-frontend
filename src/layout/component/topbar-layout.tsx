import { SidebarTrigger } from '@/components/ui/sidebar';
import { CgDarkMode, CgProfile } from 'react-icons/cg';
import OutlineButton from '@/components/button/outline-button';
import React, { useContext } from 'react';
import { LayoutContext } from '@/layout/layout-context';
import { MenuButtonItem } from '@/interfaces/button-interfaces';
import MenuButton from '@/components/button/menu-button';
import { FiLogOut } from 'react-icons/fi';

const TopbarLayout = () => {
    const { layoutConfig, setLayoutConfig } = useContext(LayoutContext);

    const menu: MenuButtonItem[] = [
        {
            icon: <FiLogOut />,
            label: 'Logout',
            variant: 'destructive',
            onClick: () => {
                const theme: string[] = ['theme'];

                if (typeof window !== 'undefined') {
                    const keysToRemove: string[] = [];

                    for (let i = 0; i < localStorage.length; i++) {
                        const key = localStorage.key(i);

                        if (key && !theme.includes(key)) {
                            keysToRemove.push(key);
                        }
                    }

                    keysToRemove.forEach((key) => localStorage.removeItem(key));
                    sessionStorage.clear();
                    window.location.replace('/auth/login');
                }
            }
        }
    ];

    return (
        <div className={'bg-card top-0 fixed w-screen p-2 flex justify-between md:justify-end'}>
            <SidebarTrigger className={'block md:hidden'} />
            <div className={'flex gap-2 items-center justify-between'}>
                <OutlineButton //
                    tooltip={
                        layoutConfig.theme === 'dark'
                            ? 'Switch to Light Mode'
                            : 'Switch to Dark Mode'
                    }
                    icon={<CgDarkMode />}
                    onClick={() => {
                        setLayoutConfig({
                            ...layoutConfig,
                            theme: layoutConfig.theme === 'light' ? 'dark' : 'light'
                        });
                    }}
                />
                <MenuButton //
                    menu={menu}
                    customIcon={<CgProfile className={'size-4'} />}
                    className={'text-primary hover:text-primary'}
                />
            </div>
        </div>
    );
};

export default TopbarLayout;
