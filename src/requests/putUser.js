import api from "../services/api"

const putUser = (id, data) => {
  return (
    api
      .put(`/users/${id}`, data)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default putUser