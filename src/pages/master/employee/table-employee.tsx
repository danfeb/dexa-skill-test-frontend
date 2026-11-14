import React, { useContext, useState } from 'react';
import DefaultDataTable from '@/components/table/default-data-table';
import ActiveInactiveBadge from '@/components/badge/active-inactive-badge';
import { TableHeader } from '@/interfaces/table-interfaces';
import { Employee, TableEmployeeProps } from '@/interfaces/master-interfaces/employee-interfaces';
import { dateDisplay } from '@/utils/date-utils';
import MenuButton from '@/components/button/menu-button';
import { MenuButtonItem } from '@/interfaces/button-interfaces';
import { FiEdit2 } from 'react-icons/fi';
import { HiOutlineTrash } from 'react-icons/hi2';
import { LayoutContext } from '@/layout/layout-context';
import { del } from '@/utils/api-utils';
import ChildModalWrapper from '@/components/dialog/child-modal-wrapper';
import CreateEditEmployeeDialog from '@/pages/master/employee/create-edit-employee-dialog';

const tableHeaders: TableHeader[] = [
    {
        title: 'Actions',
        align: 'center',
        value: 'id',
        width: '60px'
    },
    {
        title: 'Code',
        align: 'left',
        value: 'code',
        width: '100px'
    },
    {
        title: 'Full Name',
        align: 'left',
        value: 'fullName',
        width: '200px'
    },
    {
        title: 'Date of Birth',
        align: 'left',
        value: 'dateOfBirth',
        width: '150px'
    },
    {
        title: 'Level',
        align: 'left',
        value: 'staffLevel',
        width: '120px'
    },
    {
        title: 'Join Since',
        align: 'left',
        value: 'joinSince',
        width: '150px'
    },
    {
        title: 'Status',
        align: 'center',
        value: 'flgActive',
        width: '80px'
    }
];

const TableEmployee: React.FC<TableEmployeeProps> = ({ loading, tableData, dataRefresh }) => {
    const { confirmDialog, showToast, showLoading } = useContext(LayoutContext);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editedData, setEditedData] = useState<Employee | null>(null);

    const deleteEmployee = async (item: Employee) => {
        const res = await confirmDialog(
            'Delete Employee',
            `Are you sure you want to delete employee this employee? \n ${item.code} / ${item.fullName}`
        );

        if (!res) {
            return;
        }

        showLoading(true);
        const url = `${import.meta.env.VITE_API_MASTER}/employee/delete/${item.id}`;
        try {
            const response = await del(url);
            if (response.result) {
                showToast('Success', 'Successfully deleted employee', 'success');
                dataRefresh();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message ?? error.message;
            showToast('Error', errorMessage, 'error');
        } finally {
            showLoading(false);
        }
    };

    const renderCell = (item: Employee, header: TableHeader) => {
        if (header.value === 'id') {
            const menu: MenuButtonItem[] = [
                {
                    icon: <FiEdit2 />,
                    label: 'Edit',
                    onClick: async () => {
                        await setEditedData(item);
                        setOpenEditDialog(true);
                    }
                },
                {
                    icon: <HiOutlineTrash />,
                    label: 'Delete',
                    variant: 'destructive',
                    onClick: () => {
                        deleteEmployee(item);
                    }
                }
            ];

            return <MenuButton menu={menu} className={'text-blue-400 hover:text-blue-400'} />;
        } else if (header.value === 'flgActive') {
            return <ActiveInactiveBadge isActive={item.flgActive === 'Y'} />;
        } else if (header.value === 'dateOfBirth' || header.value === 'joinSince') {
            return dateDisplay(item[header.value]);
        } else if (header.value === 'staffLevel') {
            return item.staffLevel.toUpperCase();
        }

        const value = item[header.value as keyof Employee];
        return <span>{value !== undefined && value !== null && value !== '' ? value : '-'}</span>;
    };

    return (
        <>
            <DefaultDataTable //
                loading={loading}
                tableData={tableData}
                tableHeaders={tableHeaders}
                renderCell={renderCell}
            />

            <ChildModalWrapper //
                headerTitle={'Edit Employee'}
                visible={openEditDialog}
                onHide={() => {
                    setOpenEditDialog(false);
                }}
                className={'md:max-w-4xl'}
            >
                <CreateEditEmployeeDialog //
                    closeDialog={async () => {
                        await setOpenEditDialog(false);
                        dataRefresh();
                    }}
                    detailData={editedData}
                    isEdit={true}
                />
            </ChildModalWrapper>
        </>
    );
};

export default TableEmployee;
