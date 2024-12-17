import api from "../services/api"

const resetScale = (workerId, monthId) => {
  return (
    api
      .delete(`/scale/reset/worker/${workerId}/month/${monthId}`)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default resetScale
