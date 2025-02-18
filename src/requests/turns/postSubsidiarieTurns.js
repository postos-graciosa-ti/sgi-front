import api from "../../services/api"

const postSubsidiarieTurns = (formData) => {
  return (
    api
      .post('/turns', formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default postSubsidiarieTurns
