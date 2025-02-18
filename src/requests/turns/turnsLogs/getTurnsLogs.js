import api from "../../../services/api"

const getTurnsLogs = (subsidiarieId) => {
  return (
    api
      .get(`/subsidiaries/${subsidiarieId}/logs/turns`)
      .then(response => response)
      .catch(error => console.error(error))
  )
}

export default getTurnsLogs
