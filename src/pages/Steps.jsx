import { useEffect, useState } from "react"
import Select from "react-select"
import useUserSessionStore from "../data/userSession"
import api from "../services/api"
import { Link, useNavigate } from "react-router-dom"

const Steps = () => {
  const navigate = useNavigate()

  const userSession = useUserSessionStore(state => state.userSession)

  const [subsidiariesList, setSubsidiariesList] = useState()

  const setSelectedSubsidiarie = useUserSessionStore(state => state.setSelectedSubsidiarie)

  useEffect(() => {
    api
      .post("/test", {
        "arr": userSession.subsidiaries_id
      })
      .then((response) => {
        let formData = response.data

        let options = []

        formData && formData.map((data) => {
          options.push({ "label": data.name, "value": data.id })
        }, [])

        setSubsidiariesList(options)
      })
      .catch((error) => console.error(error))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    navigate('/home', { replace: true })
  }

  return (
    <>
      <div className="container">
        <div className="mt-3">
          <Link to="/" className="btn btn-primary">
            Voltar
          </Link>
        </div>

        <h1 className="mt-3">
          Selecione sua filial
        </h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mt-3">
            <Select
              options={subsidiariesList}
              placeholder="Filial"
              // onChange={(e) => setSelectedSubsidiarie({ "id": e.value, "name": e.label })}
              onChange={(e) => setSelectedSubsidiarie(e)}
            />
          </div>

          <div className="mt-3 text-end">
            <button type="submit" className="btn btn-primary">
              Próximo
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Steps