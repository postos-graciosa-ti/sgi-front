import api from "../services/api"

const getAllJobs = () => {
  return (
    api
      .get("/jobs")
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getAllJobs