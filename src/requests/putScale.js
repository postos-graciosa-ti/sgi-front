import api from "../services/api"

const putScale = (id, formData) => {
  return (
    api
      .put(`/scale/${id}`, formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default putScale
