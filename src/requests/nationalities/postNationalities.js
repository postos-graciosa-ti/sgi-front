import api from "../../services/api"

const postNationalities = (formData) => {
  return (
    api
      .post("/nationalities", formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default postNationalities