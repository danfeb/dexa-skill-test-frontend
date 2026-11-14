import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from '@/layout/layout-context';
import moment from 'moment';
import { AttendanceLog } from '@/interfaces/attendance-interfaces/attendance-log-interfaces';
import CardForPage from '@/components/card/card-for-page';
import DateRangePicker from '@/components/date/date-range-picker';
import { get } from '@/utils/api-utils';
import TablePaginator from '@/components/table/table-paginator';
import _ from 'lodash';
import { decodeToken } from '@/utils/jwt-decoder-utils';
import { JwtPayload } from '@/interfaces/jwt-payload-interfaces';
import TableMyAttendanceLog from '@/pages/attendance/my-attendance-log/table-my-attendance-log';

const PageMyAttendanceLog = () => {
    const { showToast } = useContext(LayoutContext);
    const payload: JwtPayload | null = decodeToken();
    const [filterParam, setFilterParam] = useState({
        attendanceDateFrom: moment().subtract(7, 'days').format('YYYYMMDD'),
        attendanceDateTo: moment().format('YYYYMMDD')
    });

    const handleFilter = (e: any) => {
        const { name, value } = e.target;
        setFilterParam((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const [mainData, setMainData] = useState<AttendanceLog[]>([]);
    const [loading, setLoading] = useState(true);

    const [count, setCount] = useState(0);
    const [countLoading, setCountLoading] = useState(true);

    const [limit, setLimit] = useState(50);
    const [offset, setOffset] = useState(0);

    const getAttendanceLogList = async (limit = 50, offset = 0) => {
        setLoading(true);
        const url = `${import.meta.env.VITE_API_ATTENDANCE}/attendance-log/list`;
        const params = {
            userId: payload?.uid,
            attendanceDateFrom: filterParam.attendanceDateFrom,
            attendanceDateTo: filterParam.attendanceDateTo,
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

    const getAttendanceLogCount = async () => {
        setCountLoading(true);
        const url = `${import.meta.env.VITE_API_ATTENDANCE}/attendance-log/count`;
        const params = {
            userId: payload?.uid,
            attendanceDateFrom: filterParam.attendanceDateFrom,
            attendanceDateTo: filterParam.attendanceDateTo
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
        await getAttendanceLogList(limit, offsets);
    };
    const rowsChange = async (e: any) => {
        setOffset(0);
        setLimit(e.value);
        await getAttendanceLogList(e.value, 0);
    };
    const resetCount = async () => {
        setOffset(0);
        setCount(-99);
    };

    const dataRefresh = async () => {
        await resetCount();
        await getAttendanceLogList(limit, 0);

        const count = await getAttendanceLogCount();
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
            title={'My Attendance Log'}
        >
            <div className={'grid grid-cols-3 gap-3 mb-2'}>
                <DateRangePicker //
                    nameDateFrom={'attendanceDateFrom'}
                    nameDateTo={'attendanceDateTo'}
                    label={'Attendance Date'}
                    valueDateFrom={filterParam.attendanceDateFrom}
                    valueDateTo={filterParam.attendanceDateTo}
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
            <TableMyAttendanceLog loading={loading} tableData={mainData} />
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
        </CardForPage>
    );
};

export default PageMyAttendanceLog;
