import api from "../services/api"

const putScales = (id, formData) => {
  return (
    api
      .put(`/scale/${id}`, formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default putScales
