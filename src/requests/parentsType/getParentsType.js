import api from "../../services/api"

const getParentsType = () => {
  return (
    api
      .get("/parents-type")
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getParentsType