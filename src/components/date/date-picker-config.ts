import { isAfter, isBefore, startOfDay } from 'date-fns';

export const isDateOutOfRange = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
    if (minDate && isBefore(date, startOfDay(minDate))) {
        return true;
    }

    if (maxDate && isAfter(date, startOfDay(maxDate))) {
        return true;
    }

    return false;
};
