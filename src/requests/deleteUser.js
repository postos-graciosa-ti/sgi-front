import api from "../services/api"

const deleteUser = (id) => {
  return (
    api
      .delete(`/users/${id}`)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default deleteUser