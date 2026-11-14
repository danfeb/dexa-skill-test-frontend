import { useState } from 'react';
import { z, type ZodType } from 'zod';

export type FormDataSchema<T> = {
    [K in keyof T]: ZodType<T[K], any, any>;
};

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export type FormSchema<T> = FormDataSchema<T> | ZodType<T, any, any>;

export type FormValidator<T> = (formData: T) => FormErrors<T> | Promise<FormErrors<T>>;

export interface PasswordFields<T> {
    password: keyof T;
    confirmation: keyof T;
    message?: string;
}

export interface UseFormValidationOptions<T> {
    validate?: FormValidator<T>;
    passwordFields?: PasswordFields<T>;
    chipsField?: keyof T;
}

export interface UseFormValidationResult<T> {
    formData: T;
    formErrors: FormErrors<T>;
    userInput: boolean;
    setUserInput: (value: boolean) => void;
    handleChange: (eventOrValue: any, updateData?: Partial<T>) => void;
    setAllFormData: (data: T) => void;
    pushValue: <K extends keyof T>(name: K, value: T[K]) => void;
    pushValueObject: (updateData: Partial<T>) => void;
    handleSubmit: () => Promise<boolean>;
    handleSubmitCustom: (customSchema: FormSchema<T>) => Promise<boolean>;
    handleChipsChange: (value: any) => void;
    resetForm: () => void;
    passwordConfirmation: () => Promise<boolean>;
}

const isZodSchema = <T>(schema: FormSchema<T>): boolean => {
    return typeof (schema as { safeParse?: unknown }).safeParse === 'function';
};

const useFormValidation = <T extends Record<string, any>>(
    schema: FormSchema<T>,
    initialFormData: T,
    options: UseFormValidationOptions<T> = {}
): UseFormValidationResult<T> => {
    const [formData, setFormData] = useState<T>(initialFormData);
    const [formErrors, setFormErrors] = useState<FormErrors<T>>({});
    const [userInput, setUserInput] = useState<boolean>(false);

    const parseSchema = (schemaToUse: FormSchema<T>): FormErrors<T> => {
        const zodSchema = isZodSchema(schemaToUse)
            ? (schemaToUse as ZodType<T>)
            : z.object(schemaToUse as any);
        const result = zodSchema.safeParse(formData);

        if (result.success) {
            return {};
        }

        return result.error.issues.reduce<FormErrors<T>>((errors, issue) => {
            const field = issue.path.join('.') as keyof T;
            errors[field] = issue.message;
            return errors;
        }, {});
    };

    const runCustomValidation = async (): Promise<FormErrors<T>> => {
        if (!options.validate) {
            return {};
        }

        return (await options.validate(formData)) || {};
    };

    const handleChange = (eventOrValue: any, updateData?: Partial<T>) => {
        const { name, value } = eventOrValue.target ? eventOrValue.target : eventOrValue;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
            ...(updateData || {})
        }));
        setFormErrors((previousErrors) => ({
            ...previousErrors,
            [name]: undefined,
            ...Object.keys(updateData || {}).reduce<FormErrors<T>>((errors, key) => {
                errors[key as keyof T] = undefined;
                return errors;
            }, {})
        }));
        setUserInput(true);
    };

    const pushValue = <K extends keyof T>(name: K, value: T[K]) => {
        setFormData((previousData) => ({ ...previousData, [name]: value }));
        setFormErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    };

    const pushValueObject = (updateData: Partial<T>) => {
        setFormData((previousData) => ({ ...previousData, ...(updateData || {}) }));
        setFormErrors((previousErrors) => ({
            ...previousErrors,
            ...Object.keys(updateData || {}).reduce<FormErrors<T>>((errors, key) => {
                errors[key as keyof T] = undefined;
                return errors;
            }, {})
        }));
    };

    const setAllFormData = (newFormData: T) => {
        setFormData(newFormData);
        setFormErrors({});
    };

    const handleSubmit = async (): Promise<boolean> => {
        const zodErrors = parseSchema(schema);
        const customErrors = await runCustomValidation();
        const errors = { ...zodErrors, ...customErrors };

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return false;
        }

        setFormErrors({});
        return true;
    };

    const handleSubmitCustom = async (customSchema: FormSchema<T>): Promise<boolean> => {
        const errors = parseSchema(customSchema);

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return false;
        }

        setFormErrors({});
        return true;
    };

    const handleChipsChange = (value: any) => {
        const field = options.chipsField ?? ('beneficiaryEmail' as keyof T);
        pushValue(field, value);
    };

    const passwordConfirmation = async (): Promise<boolean> => {
        const passwordField = options.passwordFields?.password ?? ('password' as keyof T);
        const confirmationField =
            options.passwordFields?.confirmation ?? ('confirmPassword' as keyof T);

        if (!(passwordField in formData) || !(confirmationField in formData)) {
            return true;
        }

        if (formData[passwordField] !== formData[confirmationField]) {
            setFormErrors((previousErrors) => ({
                ...previousErrors,
                [confirmationField]: options.passwordFields?.message ?? 'Passwords do not match'
            }));
            return false;
        }

        setFormErrors((previousErrors) => ({
            ...previousErrors,
            [confirmationField]: undefined
        }));
        return true;
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setFormErrors({});
        setUserInput(false);
    };

    return {
        formData,
        formErrors,
        userInput,
        setUserInput,
        handleChange,
        setAllFormData,
        pushValue,
        pushValueObject,
        handleSubmit,
        handleSubmitCustom,
        handleChipsChange,
        resetForm,
        passwordConfirmation
    };
};

export default useFormValidation;
