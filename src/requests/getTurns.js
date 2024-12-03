import api from "../services/api"

const getTurns = () => {
  return (
    api
      .get("/turns")
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getTurns