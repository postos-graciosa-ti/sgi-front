import api from "../services/api"

const getMonths = () => {
  return (
    api
      .get("months")
      .then((response) => response)
      .catch((error) => console.error(error))
  )
}

export default getMonths