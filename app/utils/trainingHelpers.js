import { sixMonths } from 'config/constants'

export function formatTimestamp (timestamp) {
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export function retestDate(timestamp) {
    const date = new Date(timestamp)
    //timestamp 6 months from now:
    return new Date(timestamp + sixMonths)
}

//MM/DD/YY format:
export function retestDateFormat(newTimeStamp) {
    return `${newTimeStamp.getMonth() + 1}/${newTimeStamp.getDate()}/${newTimeStamp.getFullYear()}`
}