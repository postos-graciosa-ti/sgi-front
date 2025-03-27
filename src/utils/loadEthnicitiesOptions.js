import api from "../services/api"

const loadEthnicitiesOptions = () => {
  return (
    api
      .get("/ethnicities")
      .then((response) => {
        let options = response?.data.map((ethnicity) => ({
          value: ethnicity.id,
          label: ethnicity.name
        }))

        setEthnicityOptions(options)
      })
  )
}

export default loadEthnicitiesOptions