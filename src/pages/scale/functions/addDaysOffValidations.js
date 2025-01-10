import moment from "moment"

const calculateDateDifference = (startDate, endDate) => {
  const [startDay, startMonth, startYear] = startDate.split('-').map(Number)

  const [endDay, endMonth, endYear] = endDate.split('-').map(Number)

  const initialDate = new Date(startYear, startMonth - 1, startDay)

  const finalDate = new Date(endYear, endMonth - 1, endDay)

  const differenceInMilliseconds = finalDate - initialDate

  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24)

  return differenceInDays
}

const addDaysOffValidations = (scalesList, daysOff, date) => {
  let monthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  let result = {}

  scalesList?.map((scale) => {
    let hasWorkerInThisDay = scale?.days_off.some((dayOff) => dayOff.date == moment(date).format("DD-MM-YYYY"))

    if (hasWorkerInThisDay) {
      result['hasError'] = true
      result['errorMessage'] = "Já existe um colaborador do mesmo turno de folga no mesmo dia"
    }
  })

  let allDaysOff = [...daysOff, moment(date).format("DD-MM-YYYY")].sort()

  allDaysOff.reduce((prevDayOff, currentDayOff) => {
    if (prevDayOff) {
      let dateDifference = calculateDateDifference(prevDayOff, currentDayOff)

      if (dateDifference >= 6) {
        result['hasError'] = true
        result['errorMessage'] = "O dia selecionado ultrapassa os 6 dias permitidos por lei xxx"
      }

    } else {
      let dateDifference = calculateDateDifference(moment(monthFirstDay).format("DD-MM-YYYY"), currentDayOff)

      if (dateDifference >= 6) {
        result['hasError'] = true;
        result['errorMessage'] = "O dia selecionado ultrapassa os 6 dias permitidos por lei xxx"
      }
    }

    return currentDayOff
  }, null)

  return result
}

export default addDaysOffValidations
