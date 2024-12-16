import api from "../services/api"

const getSubsidiaries = () => {
  return (
    api
      .get("/subsidiaries")
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getSubsidiaries
