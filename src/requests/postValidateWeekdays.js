import moment from "moment"
import api from "../services/api"

const postValidateWeekdays = (selectedDate, workersIds, selectedSubsdiarie, weekdays) => {
  return (
    api
      .post("/scale/validate/weekdays", {
        "date": `${moment(selectedDate).format("YYYY-MM-DD")}`,
        "workers_ids": `[${workersIds}]`,
        "subsidiarie_id": selectedSubsdiarie.value,
        "days_of_week": weekdays
      })
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default postValidateWeekdays