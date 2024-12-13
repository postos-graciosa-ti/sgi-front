import api from "../services/api"

const postTurn = (formData) => {
  return (
    api
      .post('/turns', formData)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default postTurn
