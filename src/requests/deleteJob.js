import api from "../services/api"

const deleteJob = (id) => {
  return (
    api
      .delete(`/jobs/${id}`)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default deleteJob