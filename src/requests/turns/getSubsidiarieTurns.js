import api from "../../services/api"

const getSubsidiarieTurns = (subsidiarieId) => {
  return (
    api
      .get(`/subsidiaries/${subsidiarieId}/turns`)
      .then(response => response)
      .catch(error => console.error(error))
  )
}

export default getSubsidiarieTurns
