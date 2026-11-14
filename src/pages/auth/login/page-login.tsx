import CardForPage from '@/components/card/card-for-page';
import { z } from 'zod';
import useFormValidation from '@/hooks/use-form-validation';
import InputEmail from '@/components/input/input-email';
import { useContext, useState } from 'react';
import BoxedButton from '@/components/button/boxed-button';
import InputPassword from '@/components/input/input-password';
import { postLogin } from '@/utils/api-utils';
import { Show } from '@/components/conditional-rendering/show';
import { LayoutContext } from '@/layout/layout-context';

const PageLogin = () => {
    const [loading, setLoading] = useState(false);
    const [invalidLogin, setInvalidLogin] = useState<string | undefined>(undefined);
    const { showToast } = useContext(LayoutContext);

    const loginSchema = {
        email: z.email(),
        password: z.string().min(3)
    };

    const baseFormData = {
        email: '',
        password: ''
    };

    const { formData, formErrors, handleChange, handleSubmit } = useFormValidation(
        loginSchema,
        baseFormData
    );

    const loginProcess = async () => {
        setLoading(true);
        const res = await handleSubmit();
        if (!res) {
            setLoading(false);
            return;
        }

        const url = `${import.meta.env.VITE_API_AUTH}/login`;
        const params = {
            email: formData.email,
            password: window.btoa(formData.password)
        };

        try {
            const response = await postLogin(url, params);
            if (response.result) {
                localStorage.setItem('token', response.result.token);
                console.log(response.result.token);
                window.location.replace('/');
            }
        } catch (error: any) {
            showToast('Invalid Login', error.message, 'error');
            setInvalidLogin('Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={'w-screen h-dvh flex justify-center items-center'}>
            <div className={'w-[26rem]'}>
                <CardForPage //
                    title={'Sign In'}
                    subtitle={'Lets start your day now!'}
                    titleClassName={'font-bold mb-1'}
                    additionalHeaderComponent={
                        <div>
                            <img //
                                src={'/public/assets/logoipsum-358.svg'}
                                className={'w-[132px] mb-3'}
                            />
                        </div>
                    }
                >
                    <div className={'w-full flex flex-col gap-3 mb-7'}>
                        <InputEmail //
                            name={'email'}
                            label={'Email'}
                            placeholder={'Enter your email'}
                            value={formData.email}
                            errorMessage={formErrors.email}
                            onChange={handleChange}
                        />
                        <InputPassword //
                            name={'password'}
                            label={'Password'}
                            placeholder={'Enter your password'}
                            value={formData.password}
                            errorMessage={formErrors.password}
                            onChange={handleChange}
                        />
                        <Show>
                            <Show.When isTrue={!!invalidLogin}>
                                <div className={'mt-1 text-destructive'}>
                                    <span>{invalidLogin}</span>
                                </div>
                            </Show.When>
                        </Show>
                    </div>
                    <div className={'flex'}>
                        <BoxedButton //
                            loading={loading}
                            label={'Lets Go'}
                            className={'w-full'}
                            onClick={loginProcess}
                        />
                    </div>
                </CardForPage>
            </div>
        </div>
    );
};

export default PageLogin;
