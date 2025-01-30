import { useEffect, useState } from "react"
import { ExclamationTriangle } from "react-bootstrap-icons"
import PostoBemerIcon from "../../assets/posto-bemer.jpg"
import PostoFatimaIcon from "../../assets/posto-fatima.jpg"
import PostoGraciosaVIcon from "../../assets/posto-graciosa-v.jpg"
import PostoGraciosaIcon from "../../assets/posto-graciosa.jpg"
import PostoJarivaIcon from "../../assets/posto-jariva.jpg"
import PostoPiraiIcon from "../../assets/posto-pirai.jpg"
import Nav from "../../components/Nav.jsx"
import useUserSessionStore from "../../data/userSession.js"
import getSubsidiarieById from "../../requests/getSubsidiarieById.js"
import api from "../../services/api.js"

const Home = () => {
  const userSession = useUserSessionStore(state => state.userSession)

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [selectedSubsidiarieInfo, setSelectedSubsidiarieInfo] = useState()

  const subsidiarieIcon = (
    selectedSubsdiarie.value == "1" && PostoGraciosaIcon ||
    selectedSubsdiarie.value == "2" && PostoFatimaIcon ||
    selectedSubsdiarie.value == "3" && PostoBemerIcon ||
    selectedSubsdiarie.value == "4" && PostoJarivaIcon ||
    selectedSubsdiarie.value == "5" && PostoGraciosaVIcon ||
    selectedSubsdiarie.value == "6" && PostoPiraiIcon ||
    "none"
  )

  const isPiraiSecondPhone = selectedSubsdiarie.value == "6" && "/(47) 3433-8225"

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
        console.log(response.data)
        setWorkersStatus(response.data)
      })

  }, [])

  return (
    <>
      <Nav />

      <div className="container mt-4">
        <div className="mt-3">
          <h4>{userSession && userSession.name}, seja bem-vindo(a) ao painel de {selectedSubsidiarieInfo && selectedSubsidiarieInfo.name}:</h4>

          <div className="mt-3">
            <h5>Status de colaboradores:</h5>

            <div className="row">
              <div className="col">
                <h5>Frentistas ({workersStatus.quantidade_frentistas}/16):</h5>

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
                <h5>Frentistas-caixa ({workersStatus.quantidade_frentistas_caixa}):</h5>

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
                <h5>Trocadores ({workersStatus.quantidade_trocadores}/6):</h5>

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
                <h5>Caixas ({workersStatus.quantidade_caixas}):</h5>

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

        <div className="text-center mt-5">
          <img
            src={subsidiarieIcon}
            alt="ícone de posto não disponível"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        <div className="text-center mt-3 mb-5">
          <b>
            {selectedSubsidiarieInfo && selectedSubsidiarieInfo.email} | {selectedSubsidiarieInfo && selectedSubsidiarieInfo.phone}{isPiraiSecondPhone} | {selectedSubsidiarieInfo && selectedSubsidiarieInfo.adress}
          </b>
        </div>

        <div className="text-center">
          <p><b>&#169; 2025 Postos Graciosa. Todos os direitos reservados.</b></p>
        </div>
      </div>
    </>
  )
}

export default Home;