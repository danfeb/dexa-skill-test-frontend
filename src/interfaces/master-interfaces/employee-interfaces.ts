export interface Employee {
    id: number;
    code: string;
    fullName: string;
    dateOfBirth: string;
    staffLevel: string;
    joinSince: string;
    flgActive: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export interface TableEmployeeProps {
    loading: boolean;
    tableData: Employee[];
    dataRefresh: () => void;
}

export interface CreateEditEmployeeDialogProps {
    closeDialog: () => void;
    detailData?: Employee | null;
    isEdit?: boolean;
}

export interface CreateEmployeeParams {
    code: string;
    fullName: string;
    dateOfBirth: string;
    staffLevel: string;
    joinSince: string;
    flgActive: string;
}

export interface EditEmployeeParams {
    fullName: string;
    dateOfBirth: string;
    staffLevel: string;
    joinSince: string;
    flgActive: string;
}
