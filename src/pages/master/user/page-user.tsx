import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from '@/layout/layout-context';
import { User } from '@/interfaces/master-interfaces/user-interfaces';
import { get } from '@/utils/api-utils';
import _ from 'lodash';
import CardForPage from '@/components/card/card-for-page';
import BoxedButton from '@/components/button/boxed-button';
import { FaPlus } from 'react-icons/fa6';
import InputText from '@/components/input/input-text';
import TablePaginator from '@/components/table/table-paginator';
import TableUser from '@/pages/master/user/table-user';
import ChildModalWrapper from '@/components/dialog/child-modal-wrapper';
import CreateEditUserDialog from '@/pages/master/user/create-edit-user-dialog';

const PageUser = () => {
    const { showToast } = useContext(LayoutContext);
    const [filterParam, setFilterParam] = useState({
        employeeKeyword: '',
        username: '',
        email: ''
    });

    const handleFilter = (e: any) => {
        const { name, value } = e.target;
        setFilterParam((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const [mainData, setMainData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [count, setCount] = useState(0);
    const [countLoading, setCountLoading] = useState(true);

    const [limit, setLimit] = useState(50);
    const [offset, setOffset] = useState(0);

    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    const getUserList = async (limit = 50, offset = 0) => {
        setLoading(true);
        const url = `${import.meta.env.VITE_API_MASTER}/user/list`;
        const params = {
            employeeKeyword: filterParam.employeeKeyword,
            username: filterParam.username,
            email: filterParam.email,
            limit: limit,
            offset: offset
        };

        try {
            const response = await get(url, params);
            setMainData(response.result ?? []);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message ?? error.message;
            showToast('Error', errorMessage, 'error');
            setMainData([]);
        } finally {
            setLoading(false);
        }
    };

    const getUserCount = async () => {
        setCountLoading(true);
        const url = `${import.meta.env.VITE_API_MASTER}/user/count`;
        const params = {
            employeeKeyword: filterParam.employeeKeyword,
            username: filterParam.username,
            email: filterParam.email
        };

        try {
            const response = await get(url, params);
            return response.result;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message ?? error.message;
            showToast('Error', errorMessage, 'error');
            return 0;
        } finally {
            setCountLoading(false);
        }
    };

    const pageChange = async (value: any) => {
        const offsets = value.page * limit;
        setOffset(offsets);
        await getUserList(limit, offsets);
    };
    const rowsChange = async (e: any) => {
        setOffset(0);
        setLimit(e.value);
        await getUserList(e.value, 0);
    };
    const resetCount = async () => {
        setOffset(0);
        setCount(-99);
    };

    const dataRefresh = async () => {
        await resetCount();
        await getUserList(limit, 0);

        const count = await getUserCount();
        setCount(count);
    };

    useEffect(() => {
        const debouncedCallApiFunction = _.debounce(async () => {
            dataRefresh();
        }, 800);

        debouncedCallApiFunction();

        return () => debouncedCallApiFunction.cancel();
    }, [filterParam]);

    return (
        <CardForPage //
            title={'User'}
            additionalInlineTitleComponent={
                <BoxedButton //
                    icon={<FaPlus />}
                    label={'Create'}
                    onClick={() => {
                        setOpenCreateDialog(true);
                    }}
                />
            }
        >
            <div className={'grid grid-cols-3 gap-3 mb-2'}>
                <InputText //
                    name={'username'}
                    label={'Username'}
                    placeholder={'Fill in Username'}
                    value={filterParam.username}
                    onChange={handleFilter}
                />
                <InputText //
                    name={'employeeKeyword'}
                    label={'Employee Code/Name'}
                    placeholder={'Fill in Employee Code/Name'}
                    value={filterParam.employeeKeyword}
                    onChange={handleFilter}
                />
                <InputText //
                    name={'email'}
                    label={'Email'}
                    placeholder={'Fill in Email'}
                    value={filterParam.email}
                    onChange={handleFilter}
                />
            </div>
            <div className={'w-full flex justify-end mb-2'}>
                <TablePaginator
                    dataLength={mainData.length}
                    countLoading={countLoading}
                    limit={limit}
                    offset={offset}
                    count={count}
                    pageChange={(e) => pageChange(e)}
                    rowsChange={(e) => rowsChange(e)}
                />
            </div>
            <TableUser //
                loading={loading}
                tableData={mainData}
                dataRefresh={dataRefresh}
            />
            <div className={'w-full flex justify-end mt-2'}>
                <TablePaginator
                    dataLength={mainData.length}
                    countLoading={countLoading}
                    limit={limit}
                    offset={offset}
                    count={count}
                    pageChange={(e) => pageChange(e)}
                    rowsChange={(e) => rowsChange(e)}
                />
            </div>
            <ChildModalWrapper //
                headerTitle={'Create User'}
                visible={openCreateDialog}
                onHide={() => {
                    setOpenCreateDialog(false);
                }}
                className={'md:max-w-4xl'}
            >
                <CreateEditUserDialog
                    closeDialog={async () => {
                        setOpenCreateDialog(false);
                        dataRefresh();
                    }}
                />
            </ChildModalWrapper>
        </CardForPage>
    );
};

export default PageUser;
