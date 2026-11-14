import React from 'react';
import { TopBottomInfoProps } from '@/interfaces/display-text-interfaces';

const TopBottomInfo: React.FC<TopBottomInfoProps> = ({
    //
    topInfo,
    bottomInfo
}) => {
    return (
        <>
            <div className=" mb-0 font-semibold">{topInfo}</div>
            <div className=" mb-0">{bottomInfo}</div>
        </>
    );
};

export default TopBottomInfo;
