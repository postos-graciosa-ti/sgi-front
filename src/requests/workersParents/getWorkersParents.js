import api from "../../services/api"

const getWorkersParents = (id) => {
  return (
    api
      .get(`/workers/${id}/parents`)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getWorkersParents