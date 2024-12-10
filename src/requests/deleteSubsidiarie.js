import api from "../services/api"

const deleteSubsidiarie = (id) => {
  return (
    api
      .delete(`/subsidiaries/${id}`)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default deleteSubsidiarie
