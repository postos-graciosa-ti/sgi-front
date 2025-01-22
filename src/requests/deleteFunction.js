import api from "../services/api"

const deleteFunction = (id) => {
  return (
    api
      .delete(`/functions/${id}`)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default deleteFunction
