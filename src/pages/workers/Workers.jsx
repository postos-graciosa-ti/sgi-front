import moment from "moment"
import { useEffect, useState } from "react"
import { ArrowClockwise, ClipboardData, Clock, Pen, PersonAdd, PersonBadge, PersonGear, Question, SlashCircle } from "react-bootstrap-icons"
import ReactDOMServer from 'react-dom/server'
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import initTour from "../../driverjs/initTour"
import workersSteps from "../../driverjs/workersSteps"
import api from "../../services/api"
import CreateWorkerModal from "./CreateWorkerModal"
import DeleteWorkerModal from "./DeleteWorkerModal"
import EditWorkerModal from "./EditWorkerModal"
import ExperienceTimeModal from "./ExperienceTimeModal"
import PrintBadgeContent from "./PrintBadgeContent"
import ReactivateWorkerModal from "./ReactivateWorkerModal"
import ResignationReasonsReportModal from "./ResignationReasonsReportModal"
import WorkerNotationModal from "./WorkerNotationModal"
import ReactSelect from "react-select"

const Workers = () => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [workersList, setWorkersList] = useState()

  const [selectedWorker, setSelectedWorker] = useState()

  const [createWorkerModalOpen, setCreateWorkerModalOpen] = useState(false)

  const [editWorkerModalOpen, setEditWorkerModalOpen] = useState(false)

  const [deleteWorkerModalOpen, setDeleteWorkerModalOpen] = useState(false)

  const [resignationReasonsModal, setResignationReasonsModal] = useState(false)

  const [reactivateWorkerModalOpen, setReactivateWorkerModalOpen] = useState(false)

  const [workerNotationModalOpen, setWorkerNotationModalOpen] = useState(false)

  const [experienceTimeModalOpen, setExperienceTimeModalOpen] = useState(false)

  const [workersStatus, setWorkersStatus] = useState()

  useEffect(() => {
    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
      .then((response) => {
        setWorkersList(response.data)
      })
  }, [])

  useEffect(() => {
    if (workersStatus) {
      if (workersStatus.value == 3) {
        api
          .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
          .then((response) => {
            let allWorkers = response.data

            setWorkersList(allWorkers)
          })
      } else {
        api
          .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
          .then((response) => {
            let allWorkers = response.data

            const status = workersStatus.value == 1 && true || false

            const workersByStatus = allWorkers.filter((worker) => worker.worker_is_active === status)

            setWorkersList(workersByStatus)
          })
      }
    }
  }, [workersStatus])

  const handleOpenAddWorkerModal = () => {
    setCreateWorkerModalOpen(true)
  }

  const handleOpenEditWorkerModal = (worker) => {
    setSelectedWorker(worker)

    setEditWorkerModalOpen(true)
  }

  const handleIssueBadge = (worker) => {
    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}`)
      .then((response) => {
        let subsidiarieData = response.data

        const printableContent = ReactDOMServer.renderToString(
          <PrintBadgeContent
            worker={worker}
            selectedSubsidiarie={subsidiarieData}
          />
        )

        printJS({
          printable: printableContent,
          type: 'raw-html',
          header: null,
        })
      })
  }

  const handleOpenDeleteWorkerModal = (worker) => {
    setSelectedWorker(worker)

    setDeleteWorkerModalOpen(true)
  }

  const handleOpenResigntaionReasonsReportModal = () => {
    setResignationReasonsModal(true)
  }

  const handleOpenReactivateWorkerModal = (worker) => {
    setSelectedWorker(worker)

    setReactivateWorkerModalOpen(true)
  }

  const handleOpenWorkerNotation = (worker) => {
    setSelectedWorker(worker)

    setWorkerNotationModalOpen(true)
  }

  const handleOpenExperienceTimeModal = (worker) => {
    setSelectedWorker(worker)

    setExperienceTimeModalOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de colaboradores</h4>

        <div className="row mt-3 mb-3">
          <div className="col">
            <button
              className="btn btn-warning me-2"
              onClick={() => initTour(workersSteps)}
            >
              <Question />
            </button>

            <button
              id="workerResignation"
              className="btn btn-danger me-2"
              onClick={handleOpenResigntaionReasonsReportModal}
              title="Filtrar demissões"
            >
              <ClipboardData />
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOpenAddWorkerModal}
              id="addWorker"
              title="Adicionar colaborador"
            >
              <PersonAdd />
            </button>
          </div>

          <div className="col">
            <ReactSelect
              options={[
                { value: 1, label: "Somente ativos" },
                { value: 2, label: "Somente inativos" },
                { value: 3, label: "Sem filtros" },
              ]}
              placeholder="Filtrar colaboradores"
              onChange={(value) => setWorkersStatus(value)}
              defaultValue={{ value: 3, label: "Sem filtros" }}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th style={{ width: "15%" }}>Nome</th>
                <th style={{ width: "15%" }}>Função</th>
                <th style={{ width: "10%" }}>Turno</th>
                <th style={{ width: "5%" }}>Ativo</th>
                <th style={{ width: "10%" }}>C. de custo</th>
                <th style={{ width: "10%" }}>Setor</th>
                <th style={{ width: "10%" }}>Admissão</th>
                <th style={{ width: "10%" }}>Demissão</th>
                <th style={{ width: "10%" }}>Razão</th>
                <th style={{ width: "15%" }}>Ações</th>
              </tr>
            </thead>

            <tbody>
              {workersList?.map((worker) => (
                <tr
                  id="workerRow"
                  key={worker.worker_id}
                  className={!worker.worker_is_active ? "table-danger" : undefined}
                >
                  <td>{worker.worker_name}</td>
                  <td>{worker.function_name}</td>
                  <td>
                    {worker.turn_start_time.replace(/:\d{2}$/, "")} -{" "}
                    {worker.turn_end_time.replace(/:\d{2}$/, "")}
                  </td>
                  <td>{worker.worker_is_active ? "Sim" : "Não"}</td>
                  <td>{worker.cost_center}</td>
                  <td>{worker.department}</td>
                  <td>{moment(worker.admission_date).format("DD-MM-YYYY")}</td>
                  <td>{!worker.worker_is_active ? worker.resignation_date : "Ativo"}</td>
                  <td>{!worker.worker_is_active ? worker.resignation_reason_name : "Ativo"}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2 mt-2"
                      onClick={() => handleOpenEditWorkerModal(worker)}
                      id="editWorker"
                      aria-label={`Editar informações de ${worker.worker_name}`}
                      title="Editar colaborador"
                    >
                      <PersonGear />
                    </button>

                    <button
                      className="btn btn-primary me-2 mt-2"
                      title="cara-crachá"
                      onClick={() => handleIssueBadge(worker)}
                    >
                      <PersonBadge />
                    </button>

                    <button
                      className="btn btn-primary me-2 mt-2"
                      onClick={() => handleOpenWorkerNotation(worker)}
                      title="Adicionar observação"
                      id="workerObservation"
                    >
                      <Pen />
                    </button>

                    <button
                      className="btn btn-primary me-2 mt-2"
                      title="Avaliação de tempo de experiência"
                      onClick={() => handleOpenExperienceTimeModal(worker)}
                    >
                      <Clock />
                    </button>

                    <button
                      className="btn btn-danger me-2 mt-2"
                      onClick={() => handleOpenDeleteWorkerModal(worker)}
                      id="deleteWorker"
                      aria-label={`Excluir ${worker.worker_name}`}
                      title="Demitir colaborador"
                    >
                      <SlashCircle />
                    </button>

                    {!worker.worker_is_active && (
                      <button
                        className="btn btn-primary me-2 mt-2"
                        onClick={() => handleOpenReactivateWorkerModal(worker)}
                        title="readmitir"
                      >
                        <ArrowClockwise />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateWorkerModal
        createWorkerModalOpen={createWorkerModalOpen}
        setCreateWorkerModalOpen={setCreateWorkerModalOpen}
        setWorkersList={setWorkersList}
      />

      <EditWorkerModal
        editWorkerModalOpen={editWorkerModalOpen}
        setEditWorkerModalOpen={setEditWorkerModalOpen}
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        setWorkersList={setWorkersList}
      />

      <DeleteWorkerModal
        deleteWorkerModalOpen={deleteWorkerModalOpen}
        setDeleteWorkerModalOpen={setDeleteWorkerModalOpen}
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        setWorkersList={setWorkersList}
      />

      <ResignationReasonsReportModal
        resignationReasonsModal={resignationReasonsModal}
        setResignationReasonsModal={setResignationReasonsModal}
      />

      <ReactivateWorkerModal
        reactivateWorkerModalOpen={reactivateWorkerModalOpen}
        setReactivateWorkerModalOpen={setReactivateWorkerModalOpen}
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        setWorkersList={setWorkersList}
      />

      <WorkerNotationModal
        workerNotationModalOpen={workerNotationModalOpen}
        setWorkerNotationModalOpen={setWorkerNotationModalOpen}
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
      />

      <ExperienceTimeModal
        experienceTimeModalOpen={experienceTimeModalOpen}
        setExperienceTimeModalOpen={setExperienceTimeModalOpen}
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
      />
    </>
  )
}

export default Workers