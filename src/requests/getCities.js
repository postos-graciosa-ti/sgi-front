import api from "../services/api"

const getCities = () => {
  return (
    api
      .get("/cities")
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getCities
