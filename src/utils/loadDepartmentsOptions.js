import api from "../services/api"

const loadDepartmentOptions = (setDepartmentsOptions) => {
  api
    .get("/departments")
    .then((response) => {
      let options = response?.data.map((department) => ({
        value: department.id,
        label: department.name
      }))

      setDepartmentsOptions(options)
    })
}

export default loadDepartmentOptions