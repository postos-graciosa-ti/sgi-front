import api from "../../services/api"

const loadCitiesOptions = (setCitiesOptions) => {
  return (
    api
      .get("/cities")
      .then((response) => {
        let options = response?.data.map((city) => ({ value: city.id, label: city.name }))
        setCitiesOptions(options)
      })
  )
}

export default loadCitiesOptions