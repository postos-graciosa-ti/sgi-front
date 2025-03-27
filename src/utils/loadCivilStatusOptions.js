import api from "../services/api"

const loadCivilStatusOptions = (setCivilSatusOptions) => {
  return (
    api
      .get(`/civil-status`)
      .then((response) => {
        let options = response?.data.map((civilStatus) => ({
          value: civilStatus.id,
          label: civilStatus.name
        }))

        setCivilSatusOptions(options)
      })
  )
}

export default loadCivilStatusOptions