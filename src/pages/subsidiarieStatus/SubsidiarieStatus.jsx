import { useEffect, useState } from "react"
import { ExclamationTriangle } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import getSubsidiarieById from "../../requests/getSubsidiarieById"
import api from "../../services/api"

const SubsidiarieStatus = () => {
  const userSession = useUserSessionStore(state => state.userSession)

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [selectedSubsidiarieInfo, setSelectedSubsidiarieInfo] = useState()

  const [usersWithoutScale, setUsersWithoutScale] = useState([])

  const [openJobs, setOpenJobs] = useState([])

  const [workersWithLessThanIdealDaysOff, setWorkersWithLessThanIdealDaysOff] = useState([])

  const [idealDaysOffQuantity, setIdealDaysOffQuantity] = useState()

  const [workersStatus, setWorkersStatus] = useState([])

  useEffect(() => {
    getSubsidiarieById(selectedSubsdiarie.value)
      .then((response) => {
        setSelectedSubsidiarieInfo(response.data)
      })

    api
      .get(`/subsidiaries/${selectedSubsdiarie.value}/notifications`)
      .then((response) => {
        setUsersWithoutScale(response.data.workers_without_scales)

        setOpenJobs(response.data.open_jobs)

        setWorkersWithLessThanIdealDaysOff(response.data.workers_with_less_than_ideal_days_off)

        setIdealDaysOffQuantity(response.data.ideal_days_off)
      })

    api
      .get(`/subsidiaries/${selectedSubsdiarie.value}/workers-status`)
      .then((response) => {
        setWorkersStatus(response.data)
      })
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <div className="mt-3">
          <div>
            <div className="row">
              <div className="col">
                <h5>Frentistas:</h5>

                {
                  workersStatus && workersStatus.dados_frentistas && workersStatus.dados_frentistas.map((worker) => (
                    <div className="mb-2">
                      <span>
                        {worker.name}
                      </span>
                    </div>
                  ))
                }
              </div>

              <div className="col">
                <h5>Frentistas-caixa:</h5>

                {
                  workersStatus && workersStatus.dados_frentistas_caixa && workersStatus.dados_frentistas_caixa.map((worker) => (
                    <div className="mb-2">
                      <span>
                        {worker.name}
                      </span>
                    </div>
                  ))
                }
              </div>

              <div className="col">
                <h5>Trocadores:</h5>

                {
                  workersStatus && workersStatus.dados_trocadores && workersStatus.dados_trocadores.map((worker) => (
                    <div className="mb-2">
                      <span>
                        {worker.name}
                      </span>
                    </div>
                  ))
                }
              </div>

              <div className="col">
                <h5>Caixas:</h5>

                {
                  workersStatus && workersStatus.dados_caixas && workersStatus.dados_caixas.map((worker) => (
                    <div className="mb-2">
                      <span>
                        {worker.name}
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <h5>Resumo de colaboradores:</h5>

            <div className="col">
              <div className="mb-2">
                <span>
                  <button className="btn btn-warning"><ExclamationTriangle /></button> Tem <b>{workersStatus.quantidade_frentistas} frentistas cadastrados</b>
                </span>
              </div>

              <div className="mb-2">
                <span>
                  <button className="btn btn-warning"><ExclamationTriangle /></button>A <b>quantidade ideal de frentistas cadastrados é {workersStatus.frentistas_ideal_quantity}</b>
                </span>
              </div>

              <div>
                <span>
                  <button className="btn btn-warning"><ExclamationTriangle /></button>Precisa-se de <b>{workersStatus.frentistas_diference} frentistas</b>
                </span>
              </div>
            </div>

            <div className="col">
              <div className="mb-2">
                <span>
                  <button className="btn btn-warning"><ExclamationTriangle /></button>Tem <b>{workersStatus.quantidade_trocadores} trocadores cadastrados</b>
                </span>
              </div>

              <div className="mb-2">
                <span>
                  <button className="btn btn-warning"><ExclamationTriangle /></button>A <b>quantidade ideal de trocadores cadastrados é {workersStatus.trocadores_ideal_quantity}</b>
                </span>
              </div>

              <div>
                <span>
                  <i>
                    <button className="btn btn-warning"><ExclamationTriangle /></button>Precisa-se de <b>{workersStatus.trocadores_diference} trocadores</b>
                  </i>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h5>Contratações em aberto:</h5>

            {
              openJobs && openJobs.map((job) => (
                <>
                  {
                    job.name && (
                      <div className="mb-2">
                        <span>
                          <button className="btn btn-warning"><ExclamationTriangle /></button> É necessária uma contratação para <b>{job.name}</b>
                        </span>
                      </div>
                    )
                  }
                </>
              ))
            }
          </div>

          <div className="mt-4">
            <h5>Colaboradores sem escala:</h5>

            {
              usersWithoutScale && usersWithoutScale.map((user) => (
                <>
                  {
                    user.name && (
                      <div className="mb-2">
                        <span>
                          <button className="btn btn-warning"><ExclamationTriangle /></button> Colaborador <b>{user.name}</b> não possui escala de trabalho
                        </span>
                      </div>
                    )
                  }
                </>
              ))
            }
          </div>

          <div className="mt-4">
            <h5>Colaboradores com menos dias que o ideal de folga:</h5>

            <div className="mb-2"><i>Lembre-se, o número de dias de folga ideal para esse mês é {idealDaysOffQuantity}</i></div>

            {
              workersWithLessThanIdealDaysOff && workersWithLessThanIdealDaysOff.map((worker) => (
                <>
                  {
                    worker.name && (
                      <div className="mb-2">
                        <span>
                          <button className="btn btn-warning"><ExclamationTriangle /></button> Colaborador <b>{worker.name}</b> tem menos dias de folga que o ideal
                        </span>
                      </div>
                    )
                  }
                </>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default SubsidiarieStatus
