import getWorkersBySubsidiarie from "../workers/getWorkersBySubsidiarie"

const loadWorkersOptions = (subsidiarieId, setWorkersOptions) => {
  return (
    getWorkersBySubsidiarie(subsidiarieId)
      .then((response) => {
        let options = response?.data.map((worker) => ({ value: worker.worker_id, label: worker.worker_name }))

        setWorkersOptions(options)
      })
  )
}

export default loadWorkersOptions