import api from "../../services/api"

const loadCivilStatusOptions = (setCivilStatusOptions) => {
  return (
    api
      .get("/civil-status")
      .then((response) => {
        let options = response?.data.map((civilStatus) => ({ value: civilStatus.id, label: civilStatus.name }))
        setCivilStatusOptions(options)
      })
  )
}

export default loadCivilStatusOptions