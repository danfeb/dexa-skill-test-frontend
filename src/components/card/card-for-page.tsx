import React from 'react';
import { CardForPageProps } from '@/interfaces/card-interfaces';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TitlePage from '@/components/title/title-page';

const CardForPage: React.FC<CardForPageProps> = ({
    //
    children,
    title,
    subtitle,
    titleClassName,
    additionalHeaderComponent,
    additionalInlineTitleComponent
}) => {
    return (
        <Card className={'w-full rounded-2xl border-none ring-0 shadow-card py-4 px-2'}>
            <CardHeader className={'mb-2'}>
                {additionalHeaderComponent}
                <TitlePage //
                    title={title}
                    subtitle={subtitle}
                    className={titleClassName}
                    additionalComponent={additionalInlineTitleComponent}
                />
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default CardForPage;
