import api from "../../services/api"

const loadEthnicitiesOptions = (setEthnicitiesOptions) => {
  return (
    api
      .get("/ethnicities")
      .then((response) => {
        let options = response?.data.map((ethnicity) => ({ value: ethnicity.id, label: ethnicity.name }))
        setEthnicitiesOptions(options)
      })
  )
}

export default loadEthnicitiesOptions