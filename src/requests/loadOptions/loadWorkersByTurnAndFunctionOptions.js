import api from "../../services/api"

const loadWorkersByTurnAndFunctionOptions = (selectedSubsidiarie, selectedFunction, selectedTurn, setWorkersOptions) => {
  return (
    api
      .get(`/workers/subsidiaries/${selectedSubsidiarie?.value}/functions/${selectedFunction?.value}/turns/${selectedTurn?.value}`)
      .then((response) => {
        let options = response?.data?.map((option) => ({ label: option.name, value: option.id }))

        setWorkersOptions(options)
      })
  )
}

export default loadWorkersByTurnAndFunctionOptions