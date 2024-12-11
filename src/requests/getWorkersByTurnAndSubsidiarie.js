import api from "../services/api"

const getWorkersByTurnAndSubsidiarie = (turnId, subsidiarieId) => {
  return (
    api
      .get(`/workers/turns/${turnId}/subsidiarie/${subsidiarieId}`)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getWorkersByTurnAndSubsidiarie
