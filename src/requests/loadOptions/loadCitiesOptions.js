import api from "../../services/api"

const loadCitiesOptions = (selectedState, setCitiesOptions) => {
  return (
    api
      .get(`/states/${selectedState?.value}/cities`)
      .then((response) => {
        let options = response?.data.map((city) => ({ value: city.id, label: city.name }))
        setCitiesOptions(options)
      })
  )
}

export default loadCitiesOptions