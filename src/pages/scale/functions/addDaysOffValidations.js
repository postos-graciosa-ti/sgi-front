import moment from "moment"

const addDaysOffValidations = (scalesList, daysOff, date, selectedWorker, allWorkers) => {
  let result = {}

  let monthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  let worker = allWorkers.find(worker => worker.worker_id == selectedWorker.value)

  scalesList?.map((scale) => {
    if (scale.worker.turn.id == worker.turn_id && scale.worker.function.id == worker.function_id) {
      scale?.days_off.map((dayOff) => {
        if (dayOff.date == moment(date).format("DD-MM-YYYY")) {
          result.hasError = true

          result.errorMessage = "_Já existe um colaborador do mesmo turno e função de folga nesse dia_"
        }
      })
    }
  })

  let allDaysOff = [...daysOff, moment(date).format("DD-MM-YYYY")].sort()

  allDaysOff.reduce((prevDayOff, currentDayOff) => {
    const currentDay = moment(currentDayOff, "DD-MM-YYYY")

    const previousDay = prevDayOff ? moment(prevDayOff, "DD-MM-YYYY") : moment(monthFirstDay, "DD-MM-YYYY")

    const numberToCompare = prevDayOff ? 8 : 7

    const dateDifference = currentDay.diff(previousDay, "days")

    if (dateDifference >= numberToCompare) {
      result.hasError = true

      result.errorMessage = "_O dia selecionado ultrapassa os 6 dias permitidos por lei_"
    }

    return currentDayOff
  }, null)

  return result
}

export default addDaysOffValidations
