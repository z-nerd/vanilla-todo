/**
 * change date format to following thing: 17:30 - 23. Aug 2023.
 * @param {Date} date - The date for format.
 * @returns {string} - The formatted date.
 */
export const formatDate = (date: Date) => {
    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.getDate()
    const year = date.getFullYear()
    const hour = date.getHours()
    const min = date.getMinutes()

    return `${hour}:${min} - ${day}. ${month} ${year}`
}