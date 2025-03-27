import api from "../services/api"

const loadGendersOptions = (setGendersOptions) => {
  return (
    api
      .get(`/genders`)
      .then((response) => {
        let options = response?.data.map((gender) => ({
          value: gender.id,
          label: gender.name
        }))

        setGendersOptions(options)
      })
  )
}

export default loadGendersOptions