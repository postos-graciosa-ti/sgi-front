import api from "../services/api"

const postScaleCreate = (formData) => {
  return (
    api
      .post("/scale/create", formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default postScaleCreate