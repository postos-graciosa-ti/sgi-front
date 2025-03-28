import api from "../../services/api"

const loadNeighborhoodsOptions = (setNeighborhoodOptions) => {
  return (
    api
      .get("/neighborhoods")
      .then((response) => {
        let options = response?.data.map((neighborhood) => ({ value: neighborhood.id, label: neighborhood.name }))
        setNeighborhoodOptions(options)
      })
  )
}

export default loadNeighborhoodsOptions