import moment from "moment"
import api from "../services/api"

const postValidateSundays = (selectedDate, workersIds, selectedSubsdiarie, sundays) => {
  return (
    api
      .post("/scale/validate/sundays", {
        "date": `${moment(selectedDate).format("YYYY-MM-DD")}`,
        "workers_ids": `[${workersIds}]`,
        "subsidiarie_id": selectedSubsdiarie.value,
        "sundays": sundays
      })
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default postValidateSundays