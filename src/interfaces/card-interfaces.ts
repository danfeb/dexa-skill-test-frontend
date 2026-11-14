import React from 'react';

export interface CardForPageProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    titleClassName?: string;
    additionalHeaderComponent?: React.ReactNode;
    additionalInlineTitleComponent?: React.ReactNode;
}
