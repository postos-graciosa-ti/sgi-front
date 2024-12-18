import api from "../services/api"

const deleteFunction = (id) => {
  return (
    api
      .delete(`/functions/${id}`)
      .then((response) => response)
      .catch((error) => console.log(error))
  )
}

export default deleteFunction
