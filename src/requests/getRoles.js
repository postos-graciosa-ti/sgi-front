import api from "../services/api"

const getRoles = () => {
  return (
    api
      .get("/roles")
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getRoles