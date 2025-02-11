import api from "../services/api"

const GetUsers = (bearerToken) => {
  return (
    api
      .get("/users")
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default GetUsers
