import api from "../../services/api"

const loadTurnsOptions = (selectedSubsdiarie, setTurnsOptions) => {
  return (
    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/turns`)
      .then((response) => {
        let options = response?.data.map((turn) => ({ value: turn.id, label: turn.name }))

        setTurnsOptions(options)
      })
  )
}

export default loadTurnsOptions