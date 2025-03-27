import api from "../services/api"

const loadStatesOptions = (setStatesOptions) => {
  api
    .get("/states")
    .then((response) => {
      let options = response?.data.map((state) => ({
        value: state.id,
        label: state.sail
      }))

      setStatesOptions(options)
    })
}

export default loadStatesOptions