import api from "../../services/api"

const putNationalities = (id, formData) => {
  return (
    api
      .put(`/nationalities/${id}`, formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default putNationalities