import api from "../services/api"

const postWorker = (data) => {
  return (
    api
      .post("/workers", data)
      .catch((error) => console.error(error))
  )
}

export default postWorker