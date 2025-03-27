import api from "../services/api"

const loadCostCenterOptions = (setCostCenterOptions) => {
  return (
    api
      .get("/cost-center")
      .then((response) => {
        let options = response?.data.map((costCenter) => ({
          value: costCenter.id,
          label: costCenter.name
        }))

        setCostCenterOptions(options)
      })
  )
}

export default loadCostCenterOptions