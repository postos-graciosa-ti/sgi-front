import api from "../services/api"

const getScalesLogs = () => {
  return (
    api
      .get("/logs/scales")
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getScalesLogs
