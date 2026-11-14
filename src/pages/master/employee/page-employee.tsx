import CardForPage from '@/components/card/card-for-page';
import React, { useContext, useEffect, useState } from 'react';
import InputText from '@/components/input/input-text';
import { get } from '@/utils/api-utils';
import TablePaginator from '@/components/table/table-paginator';
import _ from 'lodash';
import { LayoutContext } from '@/layout/layout-context';
import TableEmployee from '@/pages/master/employee/table-employee';
import { Employee } from '@/interfaces/master-interfaces/employee-interfaces';
import BoxedButton from '@/components/button/boxed-button';
import ChildModalWrapper from '@/components/dialog/child-modal-wrapper';
import CreateEditEmployeeDialog from '@/pages/master/employee/create-edit-employee-dialog';
import { FaPlus } from 'react-icons/fa6';

const PageEmployee = () => {
    const { showToast } = useContext(LayoutContext);
    const [filterParam, setFilterParam] = useState({
        keyword: ''
    });

    const handleFilter = (e: any) => {
        const { name, value } = e.target;
        setFilterParam((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const [mainData, setMainData] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    const [count, setCount] = useState(0);
    const [countLoading, setCountLoading] = useState(true);

    const [limit, setLimit] = useState(50);
    const [offset, setOffset] = useState(0);

    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    const getEmployeeList = async (limit = 50, offset = 0) => {
        setLoading(true);
        const url = `${import.meta.env.VITE_API_MASTER}/employee/list`;
        const params = {
            keyword: filterParam.keyword,
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

    const getEmployeeCount = async () => {
        setCountLoading(true);
        const url = `${import.meta.env.VITE_API_MASTER}/employee/count`;
        const params = {
            keyword: filterParam.keyword
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
        await getEmployeeList(limit, offsets);
    };
    const rowsChange = async (e: any) => {
        setOffset(0);
        setLimit(e.value);
        await getEmployeeList(e.value, 0);
    };
    const resetCount = async () => {
        setOffset(0);
        setCount(-99);
    };

    const dataRefresh = async () => {
        await resetCount();
        await getEmployeeList(limit, 0);

        const count = await getEmployeeCount();
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
            title={'Employee'}
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
            <div className={'grid grid-cols-4 mb-2'}>
                <InputText //
                    name={'keyword'}
                    label={'Employee Code/Name'}
                    placeholder={'Fill in Employee Code/Name'}
                    value={filterParam.keyword}
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
            <TableEmployee //
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
                headerTitle={'Create Employee'}
                visible={openCreateDialog}
                onHide={() => {
                    setOpenCreateDialog(false);
                }}
                className={'md:max-w-4xl'}
            >
                <CreateEditEmployeeDialog
                    closeDialog={async () => {
                        setOpenCreateDialog(false);
                        dataRefresh();
                    }}
                />
            </ChildModalWrapper>
        </CardForPage>
    );
};

export default PageEmployee;
