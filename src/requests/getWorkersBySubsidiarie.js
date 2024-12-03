import api from "../services/api"

const getWorkersBySubsidiarie = (id) => {
  return (
    api
      .get(`/workers/subsidiarie/${id}`)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getWorkersBySubsidiarie