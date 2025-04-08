import api from "../../services/api"

const getStates = () => {
  return (
    api
      .get("/states")
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getStates