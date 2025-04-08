import api from "../../services/api"

const getNationalities = () => {
  return (
    api
      .get("/nationalities")
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getNationalities