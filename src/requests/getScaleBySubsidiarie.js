import api from "../services/api"

const getScaleBySubsidiarie = (id) => {
  return (
    api
      .get(`/scales/subsidiarie/${id}`)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getScaleBySubsidiarie