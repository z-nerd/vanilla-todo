export const formatDate = (date: Date) => {
const month = date.toLocaleString('default', { month: 'short' })
const day = date.getDate()
const year = date.getFullYear()
const hour = date.getHours()
const min = date.getMinutes()


return `${hour}:${min} - ${day}. ${month} ${year}`
}