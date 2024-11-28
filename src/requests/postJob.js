import api from "../services/api"

const postJob = (data) => {
  return (
    api
      .post("/jobs", data)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default postJob