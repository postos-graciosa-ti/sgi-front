import api from "../services/api"

const postDefaultScale = (data) => {
  return (
    api
      .post("/default_scale", data)
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default postDefaultScale