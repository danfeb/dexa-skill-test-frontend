import { z } from 'zod';
import { PresenceParams } from '@/interfaces/attendance-interfaces/attendance-log-interfaces';
import useFormValidation from '@/hooks/use-form-validation';
import { post } from '@/utils/api-utils';
import InputFile from '@/components/input/input-file';
import InputTextarea from '@/components/input/input-textarea';
import { Card } from '@/components/ui/card';
import TitlePage from '@/components/title/title-page';
import BoxedButton from '@/components/button/boxed-button';
import { FaArrowLeft, FaCheck } from 'react-icons/fa6';
import React, { useContext, useState } from 'react';
import GhostButton from '@/components/button/ghost-button';
import { LayoutContext } from '@/layout/layout-context';
import { useNavigate } from 'react-router-dom';

const PageFormAttendWfh = () => {
    const { showToast } = useContext(LayoutContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState('');

    const attendWfhSchema = {
        description: z.string().min(3)
    };

    const baseFormData = {
        description: ''
    };

    const { formData, formErrors, handleChange, handleSubmit } = useFormValidation(
        attendWfhSchema,
        baseFormData
    );

    const attendWfh = async () => {
        setLoading(true);

        setFileError('');
        if (!file) {
            setFileError('Please choose an attachment.');
            return;
        }

        const isValid = await handleSubmit();
        if (!isValid) {
            return;
        }

        try {
            const uploadData = new FormData();
            uploadData.append('file', file);

            const uploadResponse = await post(
                `${import.meta.env.VITE_API_BASE_URL}/files/upload`,
                uploadData
            );

            if (!uploadResponse.result?.fileName) {
                throw new Error('Failed to upload attachment.');
            }

            const params: PresenceParams = {
                workType: 'WFH',
                attachment: uploadResponse.result.fileName,
                description: formData.description
            };

            const response = await post(
                `${import.meta.env.VITE_API_ATTENDANCE}/attendance-log/presence`,
                params
            );

            if (response.result) {
                showToast('Success', 'WFH attendance submitted successfully', 'success');
                navigate('/');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message ?? error.message;
            showToast('Error', errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={'w-full flex justify-center'}>
            <div className={'w-full md:w-[54%]'}>
                <Card className={'rounded-2xl border-none ring-0 p-4'}>
                    <div className={'flex justify-start items-center gap-2 mb-4'}>
                        <GhostButton //
                            icon={<FaArrowLeft />}
                            size={'lg'}
                            onClick={() => history.back()}
                        />
                        <TitlePage //
                            title={'Attend WFH'}
                            subtitle={'Presence today WFH !'}
                        />
                    </div>
                    <div className={'grid grid-cols-1 gap-4'}>
                        <InputFile //
                            name={'attachment'}
                            label={'Attachment'}
                            required
                            value={file}
                            errorMessage={fileError}
                            onChange={(selectedFile) => {
                                setFile(selectedFile);
                                setFileError('');
                            }}
                        />
                        <InputTextarea //
                            name={'description'}
                            label={'Description'}
                            required
                            placeholder={'Please Fill in Description'}
                            value={formData.description}
                            errorMessage={formErrors.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={'w-full flex justify-end'}>
                        <BoxedButton //
                            loading={loading}
                            icon={<FaCheck />}
                            label={'Submit'}
                            onClick={attendWfh}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PageFormAttendWfh;
