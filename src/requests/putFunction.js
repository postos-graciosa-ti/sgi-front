import api from "../services/api"

const putFunction = (id, formData) => {
  return (
    api
      .put(`/functions/${id}`, formData)
      .then((response) => response.data)
      .catch((error) => console.error(error))
  )
}

export default putFunction
