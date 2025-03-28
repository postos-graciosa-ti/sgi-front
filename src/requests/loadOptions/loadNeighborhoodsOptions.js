import api from "../../services/api"

const loadNeighborhoodsOptions = (selectedCity, setNeighborhoodOptions) => {
  return (
    api
      .get(`/cities/${selectedCity?.value}/neighborhoods`)
      .then((response) => {
        let options = response?.data.map((neighborhood) => ({ value: neighborhood.id, label: neighborhood.name }))
        setNeighborhoodOptions(options)
      })
  )
}

export default loadNeighborhoodsOptions