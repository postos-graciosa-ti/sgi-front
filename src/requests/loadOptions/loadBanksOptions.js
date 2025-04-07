import api from "../../services/api"

const loadBanksOptions = (setBanksOptions) => {
  return (
    api
      .get("/banks")
      .then((response) => {
        let options = response?.data.map((bank) => ({ value: bank.id, label: bank.name }))

        setBanksOptions(options)
      })
  )
}

export default loadBanksOptions