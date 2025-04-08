import api from "../../services/api"

const loadNationalitiesOptions = (setNationalitiesOptions) => {
  return (
    api
      .get("/nationalities")
      .then((response) => {
        let options = response?.data.map((nationalitie) => ({ value: nationalitie.id, label: nationalitie.name }))

        setNationalitiesOptions(options)
      })
  )
}

export default loadNationalitiesOptions