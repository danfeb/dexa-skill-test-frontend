import React, { useContext, useState } from 'react';
import {
    CreateEditEmployeeDialogProps,
    CreateEmployeeParams,
    EditEmployeeParams
} from '@/interfaces/master-interfaces/employee-interfaces';
import { z } from 'zod';
import useFormValidation from '@/hooks/use-form-validation';
import { patch, post } from '@/utils/api-utils';
import { LayoutContext } from '@/layout/layout-context';
import InputText from '@/components/input/input-text';
import StaffLevelCombobox from '@/components/combobox/staff-level-combobox';
import DatePicker from '@/components/date/date-picker';
import ActiveInactiveRadioInput from '@/components/input/active-inactive-radio-input';
import BoxedButton from '@/components/button/boxed-button';
import { FaCheck, FaPlus } from 'react-icons/fa6';

const CreateEditEmployeeDialog: React.FC<CreateEditEmployeeDialogProps> = ({
    //
    detailData,
    isEdit = false,
    closeDialog
}) => {
    const { showToast } = useContext(LayoutContext);
    const [loading, setLoading] = useState(false);
    const createEditEmployeeSchema = {
        code: z.string().min(3),
        fullName: z.string().min(3),
        dateOfBirth: z.string().min(8),
        staffLevel: z.string().min(3),
        joinSince: z.string().min(8),
        flgActive: z.string().min(1)
    };

    const baseFormData: CreateEmployeeParams = {
        code: detailData?.code ?? '',
        fullName: detailData?.fullName ?? '',
        dateOfBirth: detailData?.dateOfBirth ?? '',
        staffLevel: detailData?.staffLevel ?? '',
        joinSince: detailData?.joinSince ?? '',
        flgActive: detailData?.flgActive ?? 'Y'
    };

    const { formData, formErrors, handleChange, handleSubmit } = useFormValidation(
        createEditEmployeeSchema,
        baseFormData
    );

    const createEmployee = async () => {
        setLoading(true);
        const res = await handleSubmit();
        if (!res) {
            setLoading(false);
            return;
        }

        const url = `${import.meta.env.VITE_API_MASTER}/employee/create`;
        const params: CreateEmployeeParams = formData;

        try {
            const response = await post(url, params);
            if (response.result) {
                showToast('Created', 'Employee successfully created', 'success');
                closeDialog();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message ?? error.message;
            showToast('Error', errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    const editEmployee = async () => {
        setLoading(true);
        const res = await handleSubmit();
        if (!res) {
            setLoading(false);
            return;
        }

        const url = `${import.meta.env.VITE_API_MASTER}/employee/update/${detailData?.id}`;
        const params: EditEmployeeParams = {
            fullName: formData.fullName,
            dateOfBirth: formData.dateOfBirth,
            staffLevel: formData.staffLevel,
            joinSince: formData.joinSince,
            flgActive: formData.flgActive
        };

        try {
            const response = await patch(url, params);
            if (response.result) {
                showToast('Edited', 'Employee successfully edited', 'success');
                closeDialog();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message ?? error.message;
            showToast('Error', errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'}>
                <InputText //
                    disabled={isEdit}
                    name={'code'}
                    label={'Code'}
                    placeholder={'Please Fill in Code'}
                    value={formData.code}
                    errorMessage={formErrors.code}
                    onChange={handleChange}
                />
                <InputText //
                    name={'fullName'}
                    label={'Full Name'}
                    placeholder={'Please Fill in Full Name'}
                    value={formData.fullName}
                    errorMessage={formErrors.fullName}
                    onChange={handleChange}
                />
                <DatePicker //
                    name={'dateOfBirth'}
                    label={'Date of Birth'}
                    placeholder={'Please Choose a Date of Birth'}
                    value={formData.dateOfBirth}
                    errorMessage={formErrors.dateOfBirth}
                    onChange={handleChange}
                />
                <StaffLevelCombobox //
                    name={'staffLevel'}
                    label={'Level'}
                    placeholder={'Please Select Staff Level'}
                    value={formData.staffLevel}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
                <DatePicker //
                    name={'joinSince'}
                    label={'Join Since'}
                    placeholder={'Please Choose a Date Join Since'}
                    value={formData.joinSince}
                    errorMessage={formErrors.joinSince}
                    onChange={handleChange}
                />
                <ActiveInactiveRadioInput //
                    name={'flgActive'}
                    label={'Active'}
                    value={formData.flgActive}
                    errorMessage={formErrors.flgActive}
                    onChange={handleChange}
                    orientation={'horizontal'}
                />
            </div>
            <div className={'w-full flex justify-end'}>
                <BoxedButton //
                    loading={loading}
                    icon={isEdit ? <FaCheck /> : <FaPlus />}
                    label={isEdit ? 'Save' : 'Create'}
                    onClick={isEdit ? editEmployee : createEmployee}
                />
            </div>
        </>
    );
};

export default CreateEditEmployeeDialog;
