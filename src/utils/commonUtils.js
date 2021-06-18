import dateformat from "dateformat";

export const getFormatedTime = (time) => {
    return dateformat(time * 1000, 'hh:MM TT');
}

export const getFormatedDate = (dt) => {
    return dateformat(dt * 1000, 'dd mmm, ddd');
}

export const getFormatedTimeHour = (time) => {
    return dateformat(time * 1000, 'h TT');
}
