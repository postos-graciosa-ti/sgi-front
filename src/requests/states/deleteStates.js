import api from "../../services/api"

const deleteStates = (id) => {
  return (
    api
      .delete(`/states/${id}`)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default deleteStates