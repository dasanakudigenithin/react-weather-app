import dateformat from "dateformat";

export const getFormatedTime = (time, timezoneOffset) => {
    const date = toLocalTime(time, timezoneOffset);
    return dateformat(date, 'hh:MM TT', true);
}

export const getFormatedDate = (dt, timezoneOffset) => {
    const date = toLocalTime(dt, timezoneOffset);
    return dateformat(date, 'dd mmm, ddd', true);
}

export const getFormatedTimeHour = (time, timezoneOffset) => {
    const date = toLocalTime(time, timezoneOffset);
    return dateformat(date, 'h TT', true);
}

function toLocalTime(unixSeconds, timezoneOffset) {
    if (timezoneOffset == null) return new Date(unixSeconds * 1000);
    // unixSeconds is UTC epoch. Add timezone offset to get city's local time as UTC value.
    return new Date((unixSeconds + timezoneOffset) * 1000);
}
