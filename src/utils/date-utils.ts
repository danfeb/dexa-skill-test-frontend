import moment from 'moment';

export function dateDisplay(date: string) {
    const result = date === '' ? '' : moment(date, 'YYYYMMDD').format('DD MMM YYYY');
    return result === 'Invalid date' ? date : result;
}

export function dateTimeDisplay(date: string) {
    const dateResult = moment(date, 'YYYYMMDDHHmmss');
    const result = date ? moment(dateResult).format('DD MMM YYYY HH:mm:ss') : '-';
    return result === 'Invalid date' ? date : result;
}

export function formatDateString(date?: Date): string {
    return date ? moment(date).format('YYYYMMDD') : '';
}

export function parseDateString(value?: string): Date | undefined {
    if (!value) {
        return undefined;
    }

    const parsedDate = moment(value, 'YYYYMMDD', true);
    return parsedDate.isValid() ? parsedDate.toDate() : undefined;
}

export function formatDateDisplay(date?: Date): string {
    return date ? moment(date).format('DD MMM YYYY') : '';
}
