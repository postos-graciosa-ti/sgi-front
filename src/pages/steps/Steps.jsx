import { Link, useNavigate } from "react-router-dom"
import Select from "react-select"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import { useEffect } from "react"

const Steps = () => {
  const navigate = useNavigate()

  const userSession = useUserSessionStore(state => state.userSession)

  const setSelectedSubsidiarie = useUserSessionStore(state => state.setSelectedSubsidiarie)

  // const workersFirstReview = useWorkersExperienceTimeStore(state => state.workersFirstReview)

  // const setWorkersFirstReview = useWorkersExperienceTimeStore(state => state.setWorkersFirstReview)

  // const workersSecondReview = useWorkersExperienceTimeStore(state => state.workersSecondReview)

  // const setWorkersSecondReview = useWorkersExperienceTimeStore(state => state.setWorkersSecondReview)

  useEffect(() => {
    let allSubsidiariesIds = [1, 2, 3, 4, 5, 6]

    allSubsidiariesIds?.map((subsidiarieId) => {
      api
        .get(`/subsidiaries/${subsidiarieId}/workers/experience-time-no-first-review`)
        .then((response) => {
          console.log(response.data)
        })
    })

    // api
    //   .get(`/subsidiaries/${selectedSubsidiarie?.value}/workers/experience-time-no-first-review`)
    //   .then((response) => setWorkersFirstReview(response?.data))

    // api
    //   .get(`/subsidiaries/${selectedSubsidiarie?.value}/workers/experience-time-no-second-review`)
    //   .then((response) => setWorkersSecondReview(response?.data))
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

        {/* {
          workersFirstReview.length > 0 && (
            <div className="container">
              {
                workersFirstReview.length > 0 && (
                  <div><h5>Funcionários que vão expirar o tempo de experiência (1° período)</h5></div>
                )
              }

              <div className="d-inline-flex">
                {
                  workersFirstReview && (
                    workersFirstReview.map((worker) => (
                      <div>
                        <div className="alert alert-danger me-1">
                          {worker.name} ({moment(worker.first_review_date).format("DD-MM-YYYY")})
                        </div>
                      </div>
                    ))
                  )
                }
              </div>
            </div>
          )
        }

        {
          workersSecondReview.length > 0 && (
            <div className="container">
              {
                workersSecondReview.length > 0 && (
                  <div><h5>Funcionários que vão expirar o tempo de experiência (2° período)</h5></div>
                )
              }

              <div className="d-inline-flex">
                {
                  workersSecondReview && (
                    workersSecondReview.map((worker) => (
                      <div>
                        <div className="alert alert-danger me-1">
                          {worker.name} ({moment(worker.second_review_date).format("DD-MM-YYYY")})
                        </div>
                      </div>
                    ))
                  )
                }
              </div>
            </div>
          )
        } */}
      </div>
    </>
  )
}

export default Steps