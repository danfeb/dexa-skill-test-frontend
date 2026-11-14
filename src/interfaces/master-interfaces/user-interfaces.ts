export interface User {
    id: number;
    employeeId: number;
    employeeCode: string;
    employeeName: string;
    username: string;
    email: string;
    role: string;
    flgActive: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export interface TableUserProps {
    loading: boolean;
    tableData: User[];
    dataRefresh: () => void;
}

export interface CreateEditUserDialogProps {
    closeDialog: () => void;
    detailData?: User | null;
    isEdit?: boolean;
}

export interface CreateUserParams {
    employeeId: number;
    email: string;
    password: string;
    role: string;
    flgActive: string;
}

export interface EditUserParams {
    email: string;
    role: string;
    flgActive: string;
}
