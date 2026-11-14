import { LayoutProvider } from '@/layout/layout-context';
import ThemeProvider from '@/layout/theme-provider';
import AppRoutes from '@/routes/app-routes';

const App = () => {
    return (
        <LayoutProvider>
            <ThemeProvider>
                <AppRoutes />
            </ThemeProvider>
        </LayoutProvider>
    );
};

export default App;
