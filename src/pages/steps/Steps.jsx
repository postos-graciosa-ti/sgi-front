import { Link, useNavigate } from "react-router-dom"
import Select from "react-select"
import useUserSessionStore from "../../data/userSession"

const Steps = () => {
  const navigate = useNavigate()

  const userSession = useUserSessionStore(state => state.userSession)

  const setSelectedSubsidiarie = useUserSessionStore(state => state.setSelectedSubsidiarie)

  const handleSubmit = () => {
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

        <div className="mt-3">
          <Select
            options={userSession.user_subsidiaries}
            placeholder="Filial"
            onChange={(e) => setSelectedSubsidiarie(e)}
          />
        </div>

        <div className="mt-3 text-end">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Próximo
          </button>
        </div>
      </div>
    </>
  )
}

export default Steps