import api from "../services/api"

const getSubsidiarieById = (id) => {
  return (
    api
      .get(`/subsidiaries/${id}`)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getSubsidiarieById