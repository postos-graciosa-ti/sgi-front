import api from "../services/api"

const postScale = (formData) => {
  return (
    api
      .post('/scale', formData)
      .then((response) => response.data)
      .catch((error) => console.error(error))
  )
}

export default postScale
