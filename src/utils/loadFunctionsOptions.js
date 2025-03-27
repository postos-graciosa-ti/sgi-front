import api from "../services/api"

const loadFunctionsOptions = (selectedSubsdiarie, setFunctionsOptions) => {
  return (
    api
      .get(`/subsidiaries/${selectedSubsdiarie.value}/functions`)
      .then((response) => {
        let options = response?.data.map((func))
      })
  )
}

export default loadFunctionsOptions