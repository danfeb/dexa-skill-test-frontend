import React, { useContext, useEffect } from 'react';
import { LayoutContext } from '@/layout/layout-context';
import { ChildrenProps } from '@/interfaces/child-interfaces';

const ThemeProvider: React.FC<ChildrenProps> = ({ children }) => {
    const { layoutConfig } = useContext(LayoutContext);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(layoutConfig.theme);
        localStorage.setItem('theme', layoutConfig.theme);
    }, [layoutConfig.theme]);

    return <>{children}</>;
};

export default ThemeProvider;
