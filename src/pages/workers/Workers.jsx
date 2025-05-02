import { useEffect, useState } from "react"
import { ArrowClockwise, FileEarmarkPdf, FiletypeDocx, Funnel, HourglassSplit, Pen, PersonAdd, PersonBadge, PersonGear, PersonSlash, PersonX, Printer, Question } from "react-bootstrap-icons"
import ReactDOMServer from 'react-dom/server'
import ReactSelect from "react-select"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import initTour from "../../driverjs/initTour"
import workersSteps from "../../driverjs/workersSteps"
import api from "../../services/api"
import CreateWorkerModal from "./CreateWorkerModal"
import DeleteWorkerModal from "./DeleteWorkerModal"
import DocsModal from "./DocsModal"
import EditWorkerModal from "./EditWorkerModal"
import ExperienceTimeModal from "./ExperienceTimeModal"
import NrModal from "./NrModal"
import PrintBadgeContent from "./PrintBadgeContent"
import ReactivateWorkerModal from "./ReactivateWorkerModal"
import ResignationReasonsReportModal from "./ResignationReasonsReportModal"
import WorkerAwayModal from "./WorkerAwayModal"
import WorkerDataPrintContent from "./WorkerDataPrintContent"
import WorkerDocsModal from "./WorkerDocsModal"
import WorkerInfoModal from "./WorkerInfoModal"
import WorkerNotationModal from "./WorkerNotationModal"
import WorkerReturnModal from "./WorkerReturnModal"
import WorkersByTurnModal from "./WorkersByTurnModal"

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

  const [workersByTurnModalOpen, setWorkersByTurnModalOpen] = useState(false)

  const [nrModalOpen, setNrModalOpen] = useState(false)

  const [workerInfoModalOpen, setWorkerInfoModalOpen] = useState(false)

  const [workerAwayModalOpen, setWorkerAwayModalOpen] = useState(false)

  const [workerReturnModalOpen, setWorkerReturnModalOpen] = useState(false)

  const [addWorkersParentsModalOpen, setAddWorkersParentsModalOpen] = useState(false)

  const [definitellyWorkerModalOpen, setDefinitellyWorkerModalOpen] = useState(false)

  const [docsModalOpen, setDocsModalOpen] = useState(false)

  const [workerDocsModalOpen, setWorkerDocsModalOpen] = useState(false)

  useEffect(() => {
    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
      .then((response) => {
        let allWorkers = response.data

        let statusWorkers = allWorkers.filter((worker) => worker.worker_is_active == true && worker.is_away == false)

        let sortStatusWorkers = statusWorkers.sort()

        setWorkersList(sortStatusWorkers)
      })
  }, [])

  useEffect(() => {
    if (workersStatus) {
      api
        .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
        .then((response) => {
          if (workersStatus.value == 1) {
            let allWorkers = response.data

            let statusWorkers = allWorkers.filter((worker) => worker.worker_is_active == true && worker.is_away == false)

            let sortStatusWorkers = statusWorkers.sort()

            setWorkersList(sortStatusWorkers)
          }

          if (workersStatus.value == 2) {
            let allWorkers = response.data

            let statusWorkers = allWorkers.filter((worker) => worker.is_away == true)

            let sortStatusWorkers = statusWorkers.sort()

            setWorkersList(sortStatusWorkers)
          }

          if (workersStatus.value == 3) {
            let allWorkers = response.data

            let statusWorkers = allWorkers.filter((worker) => worker.worker_is_active == false)

            let sortStatusWorkers = statusWorkers.sort()

            setWorkersList(sortStatusWorkers)
          }

          if (workersStatus.value == 4) {
            let allWorkers = response.data

            let sortStatusWorkers = allWorkers.sort()

            setWorkersList(sortStatusWorkers)
          }
        })
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

  const handleOpenWorkerByTurnModal = () => {
    setWorkersByTurnModalOpen(true)
  }

  const handleOpenGetNrList = () => {
    setNrModalOpen(true)
  }

  const handleOpenWorkerInfoModal = (worker) => {
    setSelectedWorker(worker)

    setWorkerInfoModalOpen(true)
  }

  const handleOpenWorkerAwayModal = (worker) => {
    setSelectedWorker(worker)

    setWorkerAwayModalOpen(true)
  }

  const handleOpenWorkerReturnModal = (worker) => {
    setSelectedWorker(worker)

    setWorkerReturnModalOpen(true)
  }

  // const handleOpenAddWorkersParentsModal = (worker) => {
  //   setSelectedWorker(worker)

  //   setAddWorkersParentsModalOpen(true)
  // }

  // const handleOpenDefinitellyWorkerModalOpen = (worker) => {
  //   setSelectedWorker(worker)

  //   setDefinitellyWorkerModalOpen(true)
  // }

  const handleOpenDocsModal = (worker) => {
    setSelectedWorker(worker)

    setDocsModalOpen(true)
  }

  const handleOpenWorkerDocsModal = (worker) => {
    setSelectedWorker(worker)

    setWorkerDocsModalOpen(true)
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
              <Funnel />
            </button>

            <button
              className="btn btn-success me-2"
              onClick={handleOpenWorkerByTurnModal}
              title="Filtrar colaboradores por turno e por função"
            >
              <Funnel />
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

            <button
              className="btn btn-primary ms-2"
              onClick={handleOpenGetNrList}
            >
              NR20
            </button>
          </div>

          <div className="col">
            <ReactSelect
              options={[
                { value: 1, label: "Somente ativos" },
                { value: 2, label: "Somente afastados" },
                { value: 3, label: "Somente inativos" },
                { value: 4, label: "Sem filtros" },
              ]}
              placeholder="Filtrar colaboradores"
              onChange={(value) => setWorkersStatus(value)}
              defaultValue={{ value: 1, label: "Somente ativos" }}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nome</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                workersList?.map((worker) => (
                  <tr
                    className={
                      !worker.worker_is_active
                        ? "table-danger"
                        : worker.is_away
                          ? "table-warning"
                          : "table-success"
                    }
                  >
                    {
                      worker.worker_enrolment && (
                        <td>{worker.worker_enrolment} - {worker.worker_name}</td>
                      ) || (
                        <td>{worker.worker_name}</td>
                      )
                    }

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
                        className="btn btn-warning me-2 mt-2"
                        onClick={() => handleOpenWorkerDocsModal(worker)}
                        title="Visualizar documentos"
                      >
                        <FileEarmarkPdf />
                      </button>

                      <button
                        className="btn btn-primary me-2 mt-2"
                        title="Emitir documentos"
                        onClick={() => handleOpenDocsModal(worker)}
                      >
                        <FiletypeDocx />
                      </button>

                      <button
                        className="btn btn-primary me-2 mt-2"
                        title="Emitir crachá"
                        onClick={() => handleIssueBadge(worker)}
                      >
                        <PersonBadge />
                      </button>

                      {/* <button
                        className="btn btn-primary me-2 mt-2"
                        title="Adicionar parentes"
                        onClick={() => handleOpenAddWorkersParentsModal(worker)}
                      >
                        <HouseAdd />
                      </button> */}

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
                        <HourglassSplit />
                      </button>

                      <button
                        className="btn btn-danger me-2 mt-2"
                        title="Afastar colaborador"
                        onClick={() => handleOpenWorkerAwayModal(worker)}
                      >
                        <PersonSlash />
                      </button>

                      <button
                        className="btn btn-danger me-2 mt-2"
                        onClick={() => handleOpenDeleteWorkerModal(worker)}
                        id="deleteWorker"
                        aria-label={`Excluir ${worker.worker_name}`}
                        title="Demitir colaborador"
                      >
                        <PersonX />
                      </button>

                      {
                        worker.is_away && (
                          <button
                            className="btn btn-warning me-2 mt-2"
                            title="Retorno ao trabalho"
                            onClick={() => handleOpenWorkerReturnModal(worker)}
                          >
                            <ArrowClockwise />
                          </button>
                        )
                      }

                      {
                        !worker.worker_is_active && (
                          <>
                            <button
                              className="btn btn-warning me-2 mt-2"
                              onClick={() => handleOpenReactivateWorkerModal(worker)}
                              title="readmitir"
                            >
                              <ArrowClockwise />
                            </button>

                            {/* <button
                              className="btn btn-danger me-2 mt-2"
                              title="Excluir definitivamente"
                              onClick={() => handleOpenDefinitellyWorkerModalOpen(worker)}
                            >
                              <X />
                            </button> */}
                          </>
                        )
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {/* <div className="table-responsive">
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
        </div> */}
      </div>

      <CreateWorkerModal
        createWorkerModalOpen={createWorkerModalOpen}
        setCreateWorkerModalOpen={setCreateWorkerModalOpen}
        setWorkersList={setWorkersList}
        setAddWorkersParentsModalOpen={setAddWorkersParentsModalOpen}
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

      <WorkersByTurnModal
        workersByTurnModalOpen={workersByTurnModalOpen}
        setWorkersByTurnModalOpen={setWorkersByTurnModalOpen}
      />

      <NrModal
        nrModalOpen={nrModalOpen}
        setNrModalOpen={setNrModalOpen}
      />

      <WorkerInfoModal
        workerInfoModalOpen={workerInfoModalOpen}
        setWorkerInfoModalOpen={setWorkerInfoModalOpen}
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
      />

      <WorkerAwayModal
        workerAwayModalOpen={workerAwayModalOpen}
        setWorkerAwayModalOpen={setWorkerAwayModalOpen}
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        setWorkersList={setWorkersList}
      />

      <WorkerReturnModal
        workerReturnModalOpen={workerReturnModalOpen}
        setWorkerReturnModalOpen={setWorkerReturnModalOpen}
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        setWorkersList={setWorkersList}
      />

      {/* <AddWorkerParentsModal
        addWorkersParentsModalOpen={addWorkersParentsModalOpen}
        setAddWorkersParentsModalOpen={setAddWorkersParentsModalOpen}
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
      /> */}

      {/* <DefinitellyDeleteWorkerModal
        definitellyWorkerModalOpen={definitellyWorkerModalOpen}
        setDefinitellyWorkerModalOpen={setDefinitellyWorkerModalOpen}
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        setWorkersList={setWorkersList}
      /> */}

      <DocsModal
        docsModalOpen={docsModalOpen}
        setDocsModalOpen={setDocsModalOpen}
        selectedWorker={selectedWorker}
      />

      <WorkerDocsModal
        workerDocsModalOpen={workerDocsModalOpen}
        setWorkerDocsModalOpen={setWorkerDocsModalOpen}
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
      />
    </>
  )
}

export default Workers