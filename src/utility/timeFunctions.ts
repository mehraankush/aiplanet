import { format, formatDistanceToNow } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const convertToIST = (date: Date | string): Date => {
    const utcDate = new Date(date);
    console.log(utcDate)
    return toZonedTime(utcDate, 'Asia/Kolkata');
};

export const formatToIST = (date: Date | string): string => {
    const istDate = convertToIST(date);
    return format(istDate, "dd MMM yyyy, hh:mm a 'IST'");
};

export const getCountdown = (targetDate: Date | string): string => {
    const now = new Date();
    const target = new Date(targetDate);

    if (now >= target) {
        return 'Event has started';
    }

    return formatDistanceToNow(target, { addSuffix: true });
};