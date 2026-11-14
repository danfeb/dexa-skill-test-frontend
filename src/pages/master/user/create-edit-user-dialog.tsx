import React, { useContext, useState } from 'react';
import {
    CreateEditUserDialogProps,
    CreateUserParams,
    EditUserParams
} from '@/interfaces/master-interfaces/user-interfaces';
import useFormValidation from '@/hooks/use-form-validation';
import { z } from 'zod';
import EmployeeCombobox from '@/components/combobox/employee-combobox';
import InputEmail from '@/components/input/input-email';
import InputPassword from '@/components/input/input-password';
import { Show } from '@/components/conditional-rendering/show';
import RoleCombobox from '@/components/combobox/role-combobox';
import ActiveInactiveRadioInput from '@/components/input/active-inactive-radio-input';
import BoxedButton from '@/components/button/boxed-button';
import { FaCheck, FaPlus } from 'react-icons/fa6';
import { patch, post } from '@/utils/api-utils';
import { LayoutContext } from '@/layout/layout-context';

const CreateEditUserDialog: React.FC<CreateEditUserDialogProps> = ({
    detailData,
    isEdit = false,
    closeDialog
}) => {
    const { showToast } = useContext(LayoutContext);
    const [loading, setLoading] = useState(false);
    const createEditUserSchema = {
        employeeId: z.number().min(1),
        email: z.email().min(2),
        password: z.string().min(8),
        role: z.string().min(3),
        flgActive: z.string().min(1)
    };

    const baseFormData: CreateUserParams = {
        employeeId: detailData?.employeeId ?? 0,
        email: detailData?.email ?? '',
        password: '',
        role: detailData?.role ?? '',
        flgActive: detailData?.flgActive ?? 'Y'
    };

    const { formData, formErrors, handleChange, handleSubmit } = useFormValidation(
        createEditUserSchema,
        baseFormData
    );

    const createUser = async () => {
        setLoading(true);
        const res = await handleSubmit();
        if (!res) {
            setLoading(false);
            return;
        }

        const url = `${import.meta.env.VITE_API_MASTER}/user/create`;
        const params: CreateUserParams = {
            ...formData,
            password: window.btoa(formData.password)
        };

        try {
            const response = await post(url, params);
            console.log('response', response);
            if (response.result) {
                showToast('Created', 'User successfully created', 'success');
                closeDialog();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message ?? error.message;
            showToast('Error', errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    const editUser = async () => {
        setLoading(true);
        const res = await handleSubmit();
        if (!res) {
            setLoading(false);
            return;
        }

        const url = `${import.meta.env.VITE_API_MASTER}/employee/update/${detailData?.id}`;
        const params: EditUserParams = {
            email: formData.email,
            role: formData.role,
            flgActive: formData.flgActive
        };

        try {
            const response = await patch(url, params);
            if (response.result) {
                showToast('Edited', 'User successfully edited', 'success');
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
                <EmployeeCombobox //
                    disabled={isEdit}
                    name={'employeeId'}
                    label={'Employee'}
                    placeholder={'Please Select Employee'}
                    value={formData.employeeId}
                    errorMessage={formErrors.employeeId}
                    onChange={handleChange}
                />
                <InputEmail //
                    name={'email'}
                    label={'Email'}
                    placeholder={'Please Fill in Email'}
                    value={formData.email}
                    errorMessage={formErrors.email}
                    onChange={handleChange}
                />
                <Show>
                    <Show.When isTrue={!isEdit}>
                        <InputPassword //
                            name={'password'}
                            label={'Password'}
                            placeholder={'Please Fill in Password'}
                            value={formData.password}
                            errorMessage={formErrors.password}
                            info={'Once created the password cannot be edited'}
                            onChange={handleChange}
                        />
                    </Show.When>
                </Show>
                <RoleCombobox //
                    name={'role'}
                    label={'Role'}
                    placeholder={'Please Select Role'}
                    value={formData.role}
                    errorMessage={formErrors.role}
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
                    onClick={isEdit ? editUser : createUser}
                />
            </div>
        </>
    );
};

export default CreateEditUserDialog;
