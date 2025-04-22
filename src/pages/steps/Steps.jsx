import moment from "moment"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Select from "react-select"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"

const Steps = () => {
  const navigate = useNavigate()

  const userSession = useUserSessionStore(state => state.userSession)

  const setSelectedSubsidiarie = useUserSessionStore(state => state.setSelectedSubsidiarie)

  const [workersWithoutFirstReview, setWorkersWithoutFirstReview] = useState()

  const [workersWithoutSecondReview, setWorkersWithoutSecondReview] = useState()

  useEffect(() => {
    api
      .post("/subsidiaries/workers/experience-time-no-first-review", { subsidiaries_ids: eval(userSession.subsidiaries_id) })
      .then((response) => setWorkersWithoutFirstReview(response.data))

    api
      .post("/subsidiaries/workers/experience-time-no-second-review", { subsidiaries_ids: eval(userSession.subsidiaries_id) })
      .then((response) => setWorkersWithoutSecondReview(response.data))
  }, [])

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
          Selecione sua filial para prosseguir
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

        {
          workersWithoutFirstReview.length > 0 && (
            <>
              <h4 className="mt-5">Colaboradores sem primeira avaliação de tempo de experiência</h4>

              {
                workersWithoutFirstReview?.map((data) => (
                  <div className="alert alert-warning" key={data.worker_id}>
                    Colaborador {data.worker_name} da filial {data.subsidiarie_name}, admitido em {moment(data.worker_admission_date).format("DD/MM/YYYY")}, tem sua segunda avaliação de tempo de experiência em {moment(data.worker_second_review_date).format("DD/MM/YYYY")}
                  </div>
                ))
              }
            </>
          )
        }

        {
          workersWithoutSecondReview.length > 0 && (
            <>
              <h4 className="mt-5">Colaboradores sem segunda avaliação de tempo de experiência</h4>

              {
                workersWithoutSecondReview?.map((data) => (
                  <div className="alert alert-warning" key={data.worker_id}>
                    Colaborador {data.worker_name} da filial {data.subsidiarie_name}, admitido em {moment(data.worker_admission_date).format("DD/MM/YYYY")}, tem sua segunda avaliação de tempo de experiência em {moment(data.worker_second_review_date).format("DD/MM/YYYY")}
                  </div>
                ))
              }
            </>
          )
        }
      </div>
    </>
  )
}

export default Steps