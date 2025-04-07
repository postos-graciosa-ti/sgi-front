import api from "../../services/api"

const loadSchoolLevels = (setSchoolLevelsOptions) => {
  return (
    api
      .get("/school-levels")
      .then((response) => {
        let options = response?.data.map((schoolLevel) => ({ value: schoolLevel.id, label: schoolLevel.name }))

        setSchoolLevelsOptions(options)
      })
  )
}

export default loadSchoolLevels