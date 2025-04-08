import api from "../../services/api"

const postStates = (formData) => {
  return (
    api
      .post("/states", formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default postStates