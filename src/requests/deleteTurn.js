import api from "../services/api"

const deleteTurn = (id) => {
  return (
    api.delete(`/turns/${id}`)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default deleteTurn
