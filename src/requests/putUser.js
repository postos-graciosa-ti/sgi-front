import api from "../services/api"

const putUser = (id, formData) => {
  return (
    api
      .put(`/users/${id}`, formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default putUser
