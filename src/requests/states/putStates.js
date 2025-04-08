import api from "../../services/api"

const putStates = (id, formData) => {
  return (
    api
      .put(`/states/${id}`, formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default putStates