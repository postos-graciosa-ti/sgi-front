import api from "../services/api"

const GetUsers = (bearerToken) => {
  return (
    api
      .get("/users", {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default GetUsers
