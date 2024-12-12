import api from "../services/api"

const getScales = (workerId, monthId) => {
  return (
    api
        .get(`/scales/worker/${workerId}/month/${monthId}`)
        .then((response) => response)
        .catch((error) => console.log(error))
  )
}

export default getScales
