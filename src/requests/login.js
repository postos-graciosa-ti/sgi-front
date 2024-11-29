import api from "../services/api"

const login = (data) => {
  return (
    api
      .post("/login", data)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default login