import api from "../../services/api"

const postWorkersParents = (formData) => {
  return (
    api
      .post(`/workers-parents`, formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default postWorkersParents