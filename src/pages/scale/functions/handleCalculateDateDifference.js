const handleCalculateDateDifference = (dateFromCalendar, dateToCompare) => {
  const stringToDate = (dateString) => {
    const parts = dateString.split("-")
    return new Date(parts[2], parts[1] - 1, parts[0])
  }

  let initialDate = stringToDate(dateFromCalendar)

  let finalDate = stringToDate(dateToCompare)

  let milisecondsDifference = finalDate - initialDate

  let daysDifference = milisecondsDifference / (1000 * 60 * 60 * 24)

  return daysDifference
}

export default handleCalculateDateDifference
