import api from "../services/api"

const postSubsidiarie = (formData) => {
  return (
    api
      .post("/subsidiaries", formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default postSubsidiarie