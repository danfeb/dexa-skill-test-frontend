import React, { useState } from 'react';
import {
    AttendanceLog,
    TableAttendanceLogProps
} from '@/interfaces/attendance-interfaces/attendance-log-interfaces';
import { TableHeader } from '@/interfaces/table-interfaces';
import TopBottomInfo from '@/components/display-text/top-bottom-info';
import GhostButton from '@/components/button/ghost-button';
import { MdOutlineImageSearch } from 'react-icons/md';
import DefaultDataTable from '@/components/table/default-data-table';
import { dateTimeDisplay } from '@/utils/date-utils';
import ChildModalWrapper from '@/components/dialog/child-modal-wrapper';
import WorkTypeBadge from '@/components/badge/work-type-badge';

const tableHeaders: TableHeader[] = [
    {
        title: 'Actions',
        align: 'center',
        value: 'id',
        width: '60px'
    },
    {
        title: 'Employee',
        align: 'left',
        value: 'employeeName',
        width: '180px'
    },
    {
        title: 'Email',
        align: 'left',
        value: 'email',
        width: '120px'
    },
    {
        title: 'Work Type',
        align: 'center',
        value: 'workType',
        width: '120px'
    },
    {
        title: 'Attendance Datetime',
        align: 'left',
        value: 'attendanceDatetime',
        width: '150px'
    },
    {
        title: 'Description',
        align: 'left',
        value: 'description',
        width: '200px'
    }
];

const TableAttendanceLog: React.FC<TableAttendanceLogProps> = ({ loading, tableData }) => {
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [viewItem, setViewItem] = useState<AttendanceLog | null>(null);

    const renderCell = (item: AttendanceLog, header: TableHeader) => {
        if (header.value === 'id') {
            return (
                <GhostButton //
                    icon={<MdOutlineImageSearch className={'size-4'} />}
                    className={'text-blue-400 hover:text-blue-400'}
                    tooltip={'View Attachment'}
                    onClick={async () => {
                        await setViewItem(item);
                        setOpenViewDialog(true);
                    }}
                />
            );
        } else if (header.value === 'workType') {
            return <WorkTypeBadge value={item.workType} />;
        } else if (header.value === 'attendanceDatetime') {
            return dateTimeDisplay(item.attendanceDatetime);
        } else if (header.value === 'employeeName') {
            return (
                <TopBottomInfo //
                    topInfo={item.employeeName}
                    bottomInfo={item.employeeCode}
                />
            );
        }

        const value = item[header.value as keyof AttendanceLog];
        return (
            <span className={'whitespace-pre-line'}>
                {value !== undefined && value !== null && value !== '' ? value : '-'}
            </span>
        );
    };
    return (
        <>
            <ChildModalWrapper //
                headerTitle={`${viewItem?.employeeName ?? ''} | ${
                    viewItem ? dateTimeDisplay(viewItem.attendanceDatetime) : ''
                } | ${viewItem?.attachment ?? ''}`}
                visible={openViewDialog}
                onHide={() => setOpenViewDialog(false)}
                className={'md:max-w-md'}
            >
                <img //
                    src={`${import.meta.env.VITE_API_ATTACHMENTS}/${viewItem?.attachment ?? ''}`}
                    className={'w-fit'}
                />
            </ChildModalWrapper>
            <DefaultDataTable //
                loading={loading}
                tableData={tableData}
                tableHeaders={tableHeaders}
                renderCell={renderCell}
            />
        </>
    );
};

export default TableAttendanceLog;
