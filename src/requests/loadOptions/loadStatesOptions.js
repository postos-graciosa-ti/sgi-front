import api from "../../services/api"

const loadStatesOptions = (setStatesOptions) => {
  return (
    api
      .get("/states")
      .then((response) => {
        let options = response?.data.map((state) => ({ value: state.id, label: state.name }))
        setStatesOptions(options)
      })
  )
}

export default loadStatesOptions