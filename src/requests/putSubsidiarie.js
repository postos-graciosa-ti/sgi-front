import api from "../services/api"

const putSubsidiarie = (id, formData) => {
  return (
    api
      .put(`/subsidiaries/${id}`, formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default putSubsidiarie
