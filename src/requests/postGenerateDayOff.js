import api from "../services/api"

const postGenerateDayOff = (timedata) => {
  return (
    api
      .post("/generate-day-off", timedata)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default postGenerateDayOff