import api from "../../../services/api"

const postTurnsLogs = (subsidiarieId, formData) => {
  return (
    api
      .post(`/subsidiaries/${subsidiarieId}/logs/turns`, formData)
      .then(response => response)
      .catch(error => console.error(error))
  )
}

export default postTurnsLogs
