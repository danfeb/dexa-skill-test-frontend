import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
    return (
        <div className={'w-full flex flex-col items-start gap-4'}>
            <h1 className={'text-2xl font-semibold'}>Page not found</h1>
            <Button render={<Link to="/" />}>Back to home</Button>
        </div>
    );
};

export default NotFoundPage;
