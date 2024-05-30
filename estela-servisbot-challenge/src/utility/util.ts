export const formatDateFromUnixTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000) // convert timestamp to ms
  const day = date.getDate().toString() // get day
  const month = (date.getMonth() + 1).toString() // get month
  const year = date.getFullYear() // get (full) year

  return `${day}/${month}/${year}`
}
