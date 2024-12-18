import api from "../services/api"

const postFunction = (formData) => {
  return (
    api
      .post('/functions', formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default postFunction
