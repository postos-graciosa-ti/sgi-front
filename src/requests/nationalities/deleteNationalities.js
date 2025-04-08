import api from "../../services/api"

const deleteNationalities = (id) => {
  return (
    api
      .delete(`/nationalities/${id}`)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default deleteNationalities