import api from "../services/api"

const postUser = (formData) => {
  return (
    api
      .post("/users", formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default postUser
