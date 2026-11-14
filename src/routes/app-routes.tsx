import { Route, Routes } from 'react-router-dom';
import CashInPage from '@/pages/cash-in';
import NotFoundPage from '@/pages/not-found';
import MainLayout from '@/layout/main-layout';
import FullPageLayout from '@/layout/full-page-layout';
import PageEmployee from '@/pages/master/employee/page-employee';
import PageLogin from '@/pages/auth/login/page-login';
import PageUser from '@/pages/master/user/page-user';
import PageAttendanceLog from '@/pages/attendance/attendance-log/page-attendance-log';
import PageFormAttendWfh from '@/pages/attendance/attendance-log/form/page-form-attend-wfh';
import PageHome from '@/pages/page-home';
import PageMyAttendanceLog from '@/pages/attendance/my-attendance-log/page-my-attendance-log';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<PageHome />} />

                    <Route path="/attendance">
                        <Route path="attendance-log" element={<PageAttendanceLog />} />
                        <Route path="my-attendance-log" element={<PageMyAttendanceLog />} />
                        <Route path="attend-wfh/form" element={<PageFormAttendWfh />} />
                    </Route>

                    <Route path="/master">
                        <Route path="employee" element={<PageEmployee />} />
                        <Route path="user" element={<PageUser />} />
                    </Route>

                    <Route path="/cash-in" element={<CashInPage />} />
                </Route>

                <Route element={<FullPageLayout />}>
                    <Route path="/auth/login" element={<PageLogin />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;
