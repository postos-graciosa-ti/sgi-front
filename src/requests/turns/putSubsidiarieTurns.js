import api from "../../services/api"

const putSubsidiarieTurns = (id, formData) => {
  return (
    api
      .put(`/turns/${id}`, formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default putSubsidiarieTurns
