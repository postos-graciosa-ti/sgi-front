import api from "../../services/api"

const getWorkersBySubsidiarie = (subsidiarieId) => {
  return (
    api
      .get(`/workers/subsidiarie/${subsidiarieId}`)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getWorkersBySubsidiarie