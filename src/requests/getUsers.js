import api from "../services/api"

const getUsers = () => {
  return (
    api
      .get("/users")
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getUsers