import api from "../../services/api"

const loadAwayReasons = (setAwayReasonsOptions) => {
  return (
    api
      .get("/away-reasons")
      .then((response) => {
        let options = response?.data.map((awayReason) => ({ value: awayReason.id, label: awayReason.name }))

        setAwayReasonsOptions(options)
      })
  )
}

export default loadAwayReasons