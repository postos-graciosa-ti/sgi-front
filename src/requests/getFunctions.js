import api from "../services/api"

const getFunctions = () => {
  return (
    api
      .get("/functions")
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getFunctions