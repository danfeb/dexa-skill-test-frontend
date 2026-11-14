import { Card } from '@/components/ui/card';
import BoxedButton from '@/components/button/boxed-button';
import { RiLoginCircleFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { TodayAttendanceLog } from '@/interfaces/attendance-interfaces/attendance-log-interfaces';
import { get } from '@/utils/api-utils';
import { decodeToken } from '@/utils/jwt-decoder-utils';
import { JwtPayload } from '@/interfaces/jwt-payload-interfaces';
import { dateTimeDisplay } from '@/utils/date-utils';
import { Show } from '@/components/conditional-rendering/show';
import { Skeleton } from '@/components/ui/skeleton';
import { LayoutContext } from '@/layout/layout-context';

const PageHome = () => {
    const navigate = useNavigate();
    const { showToast } = useContext(LayoutContext);
    const payload: JwtPayload | null = decodeToken();
    const [loading, setLoading] = useState(true);
    const [todayAttendance, setTodayAttendance] = useState<TodayAttendanceLog | null>(null);

    const getAttendanceLogList = async () => {
        if (!payload) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const url = `${import.meta.env.VITE_API_ATTENDANCE}/attendance-log/today-attendance-log/${payload?.uid}`;
        try {
            const response = await get(url);
            setTodayAttendance(response.result);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message ?? error.message;
            showToast('Error', errorMessage, 'error');
            setTodayAttendance(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAttendanceLogList();
    }, [payload?.uid]);

    return (
        <div className={'w-full flex justify-center'}>
            <div className={'w-full md:w-1/2'}>
                <Card
                    className={`rounded-3xl border-none ring-0 p-4 px-8 ${todayAttendance ? 'bg-emerald-400/20' : ''}`}
                >
                    <Show>
                        <Show.When isTrue={!loading}>
                            <div className={'flex justify-between items-center'}>
                                <div>
                                    <h1
                                        className={`text-3xl font-bold mb-1 ${todayAttendance ? 'text-emerald-900' : ''}`}
                                    >
                                        {todayAttendance
                                            ? `This is Your Day!`
                                            : `Let's Start Your Day!`}
                                    </h1>
                                    <h3
                                        className={`text-base font-medium ${todayAttendance ? 'text-emerald-800' : 'text-muted-foreground'}`}
                                    >
                                        {todayAttendance
                                            ? `Presence WFH at ${dateTimeDisplay(todayAttendance.attendanceDatetime)}`
                                            : `Don't forget to presence today.`}
                                    </h3>
                                    <Show>
                                        <Show.When isTrue={todayAttendance === null}>
                                            <BoxedButton //
                                                icon={<RiLoginCircleFill />}
                                                className={'mt-3'}
                                                size={'lg'}
                                                label={'Attend WFH'}
                                                onClick={() => {
                                                    navigate('/attendance/attend-wfh/form');
                                                }}
                                            />
                                        </Show.When>
                                    </Show>
                                </div>
                                <div className={'max-w-36'}>
                                    <img
                                        src={`/public/assets/${todayAttendance ? 'this-is-your-day.png' : 'start-your-day.png'}`}
                                        alt={'start-your-day'}
                                    />
                                </div>
                            </div>
                        </Show.When>
                        <Show.Else>
                            <Skeleton className="w-full h-24" />
                        </Show.Else>
                    </Show>
                </Card>
            </div>
        </div>
    );
};
export default PageHome;
