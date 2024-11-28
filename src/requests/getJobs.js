import api from "../services/api"

const getJobs = (id) => {
  return (
    api
      .get(`/jobs/subsidiarie/${id}`)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getJobs