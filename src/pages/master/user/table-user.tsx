import React, { useContext, useState } from 'react';
import { TableUserProps, User } from '@/interfaces/master-interfaces/user-interfaces';
import { TableHeader } from '@/interfaces/table-interfaces';
import { MenuButtonItem } from '@/interfaces/button-interfaces';
import { FiEdit2 } from 'react-icons/fi';
import { HiOutlineTrash } from 'react-icons/hi2';
import MenuButton from '@/components/button/menu-button';
import ActiveInactiveBadge from '@/components/badge/active-inactive-badge';
import DefaultDataTable from '@/components/table/default-data-table';
import ChildModalWrapper from '@/components/dialog/child-modal-wrapper';
import { LayoutContext } from '@/layout/layout-context';
import { del } from '@/utils/api-utils';
import CreateEditUserDialog from '@/pages/master/user/create-edit-user-dialog';
import TopBottomInfo from '@/components/display-text/top-bottom-info';

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
        title: 'Username',
        align: 'left',
        value: 'username',
        width: '140px'
    },
    {
        title: 'Email',
        align: 'left',
        value: 'email',
        width: '150px'
    },
    {
        title: 'Role',
        align: 'left',
        value: 'role',
        width: '120px'
    },
    {
        title: 'Status',
        align: 'center',
        value: 'flgActive',
        width: '80px'
    }
];

const TableUser: React.FC<TableUserProps> = ({ loading, tableData, dataRefresh }) => {
    const { confirmDialog, showToast, showLoading } = useContext(LayoutContext);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editedData, setEditedData] = useState<User | null>(null);

    const deleteUser = async (item: User) => {
        const res = await confirmDialog(
            'Delete User',
            `Are you sure you want to delete employee this employee? \n ${item.username} / ${item.email}`
        );
        if (!res) {
            return;
        }

        showLoading(true);
        const url = `${import.meta.env.VITE_API_MASTER}/user/delete/${item.id}`;
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

    const renderCell = (item: User, header: TableHeader) => {
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
                        deleteUser(item);
                    }
                }
            ];

            return <MenuButton menu={menu} className={'text-blue-400 hover:text-blue-400'} />;
        } else if (header.value === 'flgActive') {
            return <ActiveInactiveBadge isActive={item.flgActive === 'Y'} />;
        } else if (header.value === 'role') {
            return item.role.toUpperCase();
        } else if (header.value === 'employeeName') {
            return (
                <TopBottomInfo //
                    topInfo={item.employeeName}
                    bottomInfo={item.employeeCode}
                />
            );
        }

        const value = item[header.value as keyof User];
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
                visible={openEditDialog}
                onHide={() => {
                    setOpenEditDialog(false);
                }}
                className={'md:max-w-4xl'}
            >
                <CreateEditUserDialog //
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

export default TableUser;
