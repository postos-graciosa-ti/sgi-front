import api from "../services/api"

const postUser = (userData) => {
  return (
    api
      .post("/users", userData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default postUser