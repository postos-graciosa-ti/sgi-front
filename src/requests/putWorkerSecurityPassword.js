import api from "../services/api"

const putWorkerSecurityPassword = (id, data) => {
  return (
    api
      .put(`/workers/${id}/security-password`, data)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default putWorkerSecurityPassword