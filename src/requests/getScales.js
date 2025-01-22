import api from "../services/api"

const getScales = (workerId, monthId) => {
  return (
    api
        .get(`/scales/worker/${workerId}/month/${monthId}`)
        .then((response) => response)
        .catch((error) => console.error(error))
  )
}

export default getScales
