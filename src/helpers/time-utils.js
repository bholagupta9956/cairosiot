const { parse, format } = require('date-fns');

const formatToInvenseTime = (date) => {
    const dateFnsObject = parseInputTime(date)
    return format(dateFnsObject, "yyyy-MM-dd'T'HH:mm:ss'Z'");
}

module.exports.formatToInvenseTime = formatToInvenseTime;

const formatToInvenseTimeNative = (date) => {
    return format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
}

module.exports.formatToInvenseTimeNative = formatToInvenseTimeNative;


const parseInvenseTime = (invenseTimeObject) => {
    return parse(invenseTimeObject, "yyyy-MM-dd'T'HH:mm:ss'Z'", new Date());
}

module.exports.parseInvenseTime = parseInvenseTime;

const formatToInputTime = (dateObj = new Date()) => {
    return format(dateObj, "yyyy-MM-dd'T'HH:mm");
}

module.exports.formatToInputTime = formatToInputTime;

const parseInputTime = (invenseTimeObject = new Date()) => {
    return parse(invenseTimeObject, "yyyy-MM-dd'T'HH:mm", new Date());
}

module.exports.parseInputTime = parseInputTime;
