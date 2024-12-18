import api from "../services/api"

const putFunction = (id, formData) => {
  return (
    api
      .put(`/functions/${id}`, formData)
      .then((response) => response.data)
      .catch((error) => console.log(error))
  )
}

export default putFunction
