import { useEffect, useState } from "react"
import { ArrowClockwise, PersonAdd } from "react-bootstrap-icons"
import ReactDOMServer from 'react-dom/server'
import ReactSelect from "react-select"
import Nav from "../../components/Nav"
import SideMenu from "../../components/SideMenu"
import useUserSessionStore from "../../data/userSession"
import { useScreenSize } from "../../hooks/useScreenSize"
import api from "../../services/api"
import AdmissionsReportModal from "./AdmissionsReportModal"
import ChangeWorkerSubsidiarieModal from "./ChangeWorkerSubsidiarieModal"
import ChecklistModal from "./ChecklistModal"
import CreateWorkerModal from "./CreateWorkerModal"
import DeleteWorkerModal from "./DeleteWorkerModal"
import DocsModal from "./DocsModal"
import EditWorkerModal from "./EditWorkerModal"
import ExperienceTimeModal from "./ExperienceTimeModal"
import ModifyWorkpointModal from "./ModifyWorkpointModal"
import MonthBirthdaysModal from "./MonthBirthdaysModal"
import NrModal from "./NrModal"
import OpenAccountModal from "./OpenAccountModal"
import PrintBadgeContent from "./PrintBadgeContent"
import ReactivateWorkerModal from "./ReactivateWorkerModal"
import RequestBadgesModal from "./RequestBadgesModal"
import ResignationReasonsReportModal from "./ResignationReasonsReportModal"
import TransportVoucherModal from "./TransportVoucherModal"
import WorkerAwayModal from "./WorkerAwayModal"
import WorkerDocsModal from "./WorkerDocsModal"
import WorkerInfoModal from "./WorkerInfoModal"
import WorkerNotationModal from "./WorkerNotationModal"
import WorkerReturnModal from "./WorkerReturnModal"
import WorkersByTurnModal from "./WorkersByTurnModal"
import WorkersDiscountsModal from "./WorkersDiscountsModal"
import WorkersMetricsModal from "./WorkersMetricsModal"

const Workers = () => {
  const userSession = useUserSessionStore((state) => state.userSession)

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const { isMobile } = useScreenSize()

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

  const [modifyWorkpointModalOpen, setModifyWorkpointModalOpen] = useState(false)

  const [admissionsReportModalOpen, setAdmissionsReportModalOpen] = useState(false)

  const [transportVoucherModalOpen, setTransportVoucherModalOpen] = useState(false)

  const [openAccountModalOpen, setOpenAccountModalOpen] = useState(false)

  const [monthBirthdaysModalOpen, setMonthBirthdaysModalOpen] = useState(false)

  const [changeWorkerSubsidiarieModalOpen, setChangeWorkerSubsidiarieModalOpen] = useState(false)

  const [requestBadgesModalOpen, setRequestBadgesModalOpen] = useState(false)

  const [checklistModalOpen, setChecklistModalOpen] = useState(false)

  const [workersMetricsModalOpen, setWorkersMetricsModalOpen] = useState(false)

  const [workersDiscountsModalOpen, setWorkersDiscountsModalOpen] = useState(false)

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

  const handleResetWorkersList = () => {
    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
      .then((response) => {
        let allWorkers = response.data

        let statusWorkers = allWorkers.filter((worker) => worker.worker_is_active == true && worker.is_away == false)

        let sortStatusWorkers = statusWorkers.sort()

        setWorkersList(sortStatusWorkers)
      })
  }

  const handleOpenAddWorkerModal = () => {
    setCreateWorkerModalOpen(true)
  }

  const handleOpenEditWorkerModal = (worker) => {
    setSelectedWorker(worker)

    setEditWorkerModalOpen(true)
  }

  const handleIssueBadge = async (worker) => {
    let subsidiarieData = await api.get(`/subsidiaries/${selectedSubsdiarie?.value}`).then((response) => response.data)

    let workerPicture

    try {
      const response = await api.get(`/workers-pictures/${worker.worker_id}`)

      workerPicture = response.data || { picture_url: "https://res.cloudinary.com/drvzslkwn/image/upload/v1743692323/qtgm9fevvkfi09p4vczt.svg" }
    } catch (error) {
      workerPicture = { picture_url: "https://res.cloudinary.com/drvzslkwn/image/upload/v1743692323/qtgm9fevvkfi09p4vczt.svg" }
    }

    const printableContent = ReactDOMServer.renderToString(
      <PrintBadgeContent
        worker={worker}
        selectedSubsidiarie={subsidiarieData}
        workerPicture={workerPicture}
      />
    )

    printJS({
      printable: printableContent,
      type: 'raw-html',
      style: '',
      scanStyles: false
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

  const handleOpenModifyWorkpointModal = () => {
    setModifyWorkpointModalOpen(true)
  }

  const handleOpenAdmissionsReportModal = () => {
    setAdmissionsReportModalOpen(true)
  }

  const handleOpenMonthBirthdaysModal = () => {
    setMonthBirthdaysModalOpen(true)
  }

  const handleOpenChangeWorkerSubsidiarieModal = (worker) => {
    setSelectedWorker(worker)

    setChangeWorkerSubsidiarieModalOpen(true)
  }

  const handleOpenRequestBadgesModal = () => {
    setRequestBadgesModalOpen(true)
  }

  const handleOpenChecklistModal = (worker) => {
    setSelectedWorker(worker)

    setChecklistModalOpen(true)
  }

  const handleOpenWorkersMetricsModal = (worker) => {
    setSelectedWorker(worker)

    setWorkersMetricsModalOpen(true)
  }

  const handleOpenWorkersDiscountsModal = (worker) => {
    setSelectedWorker(worker)

    setWorkersDiscountsModalOpen(true)
  }

  const handleAutorizeApp = (worker) => {
    api
      .post(`/workers/${worker.worker_id}/autorize-app`)
      .then(() => {
        api
          .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
          .then((response) => {
            let allWorkers = response.data

            let statusWorkers = allWorkers.filter((worker) => worker.worker_is_active == true && worker.is_away == false)

            let sortStatusWorkers = statusWorkers.sort()

            setWorkersList(sortStatusWorkers)
          })
      })
  }

  return (
    <>
      <SideMenu />

      <Nav />

      <div className="container">
        <h4>Cadastro de colaboradores</h4>

        <div className="d-inline-flex">
          <button
            type="button"
            className="btn btn-primary me-3 mt-3 mb-3"
            onClick={handleOpenAddWorkerModal}
            id="addWorker"
            title="Adicionar colaborador"
            disabled={userSession.role_id == 1 ? false : true}
          >
            <PersonAdd />
          </button>

          <div className="dropdown mt-3">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              disabled={userSession.role_id == 1 ? false : true}
            >
              Mais operações
            </button>

            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={handleOpenModifyWorkpointModal}
                >
                  Atualizar planilha de ponto
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={handleOpenResigntaionReasonsReportModal}
                >
                  Filtro de demissões
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={handleOpenWorkerByTurnModal}
                >
                  Filtrar colaboradores por turno e por função
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={handleOpenGetNrList}
                >
                  NR-20
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={handleOpenAdmissionsReportModal}
                >
                  Filtro de admitidos
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setTransportVoucherModalOpen(true)}
                >
                  Vale transporte
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setOpenAccountModalOpen(true)}
                >
                  Abertura de conta
                </button>
              </li>

              <li
                className="dropdown-item"
                onClick={() => handleOpenMonthBirthdaysModal(true)}
              >
                Aniversariantes do mês
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={handleOpenRequestBadgesModal}
                >
                  Solicitar crachá definitivo
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <div className="row">
            <div className="col-5">
              <ReactSelect
                options={workersList?.map((option) => ({
                  value: option.worker_id,
                  label: option.worker_name,
                }))}
                onChange={(option) => {
                  const selectedWorker = workersList?.find(
                    (worker) => worker.worker_id === option?.value
                  )
                  if (selectedWorker) {
                    setWorkersList([selectedWorker])
                  }
                }}
              />
            </div>

            <div className="col-5">
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

            <div className="col-2 text-center">
              <button
                className="btn btn-primary"
                onClick={handleResetWorkersList}
              >
                <ArrowClockwise />
              </button>
            </div>
          </div>
        </div>

        {
          workersList && workersList.map((worker) => (
            <div key={worker.id} className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{worker.worker_name}</h5>

                <div className="mt-2 mb-2">
                  <b>CPF:</b> <span className="text-muted">{worker.cpf}</span>
                </div>

                <div className="mb-2">
                  <b>Endereço:</b> <span className="text-muted">{worker.street}, {worker.street_number}, {worker.street_complement}</span>
                </div>

                {
                  worker.worker_is_active && !worker.is_away && (
                    <span className="badge text-bg-success p-2">Ativo</span>
                  )
                }

                {
                  !worker.worker_is_active && (
                    <span className="badge text-bg-danger p-2">Inativo</span>
                  )
                }

                {
                  worker.is_away && (
                    <span className="badge text-bg-warning p-2">Afastado</span>
                  )
                }

                {
                  worker.app_login && (
                    <span className="badge text-bg-primary p-2 ms-2">Aplicativo Autorizado</span>
                  )
                }
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handleOpenEditWorkerModal(worker)}
                    id="editWorker"
                    aria-label={`Editar informações de ${worker.worker_name}`}
                    title="Editar colaborador"
                    disabled={userSession.role_id == 1 ? false : true}
                  >
                    Dados de Colaborador
                  </button>
                </li>

                <li className="list-group-item">
                  <div className="dropdown">
                    <button className="btn btn-light dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Operações de Colaborador
                    </button>

                    <ul className="dropdown-menu w-100">
                      <li>
                        <button className="dropdown-item" onClick={() => handleAutorizeApp(worker)}>
                          Autorizar Aplicativo
                        </button>
                      </li>

                      <li>
                        <button className="dropdown-item" onClick={() => handleOpenWorkersDiscountsModal(worker)}>
                          Descontos de Colaborador
                        </button>
                      </li>

                      <li>
                        <button className="dropdown-item" onClick={() => handleOpenWorkersMetricsModal(worker)}>
                          Métricas de Colaborador
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleOpenChecklistModal(worker)}
                        >
                          Lista de Documentos
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleOpenEditWorkerModal(worker)}
                          id="editWorker"
                          aria-label={`Editar informações de ${worker.worker_name}`}
                          title="Editar colaborador"
                          disabled={userSession.role_id == 1 ? false : true}
                        >
                          Edição de Colaborador
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleOpenWorkerDocsModal(worker)}
                          title="Visualizar documentos"
                          disabled={userSession.role_id == 1 ? false : true}
                        >
                          Visualização de Documentos
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          title="Alterar filial de colaborador"
                          onClick={() => handleOpenChangeWorkerSubsidiarieModal(worker)}
                        >
                          Alterar Filial de Colaborador
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          title="Afastar colaborador"
                          onClick={() => handleOpenWorkerAwayModal(worker)}
                          disabled={userSession.role_id == 1 ? false : true}
                        >
                          Afastar Colaborador
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleOpenDeleteWorkerModal(worker)}
                          id="deleteWorker"
                          aria-label={`Excluir ${worker.worker_name}`}
                          title="Demitir colaborador"
                          disabled={userSession.role_id == 1 ? false : true}
                        >
                          Demissão de Colaborador
                        </button>
                      </li>

                      <li>
                        {
                          worker.is_away && (
                            <button
                              className="dropdown-item"
                              title="Retorno ao trabalho"
                              onClick={() => handleOpenWorkerReturnModal(worker)}
                              disabled={userSession.role_id == 1 ? false : true}
                            >
                              Retorno de Colaborador
                            </button>
                          )
                        }
                      </li>

                      <li>
                        {
                          !worker.worker_is_active && (
                            <>
                              <button
                                className="dropdown-item"
                                onClick={() => handleOpenReactivateWorkerModal(worker)}
                                title="readmitir"
                                disabled={userSession.role_id == 1 ? false : true}
                              >
                                Readmissão de Colaborador
                              </button>
                            </>
                          )
                        }
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          title="Emitir documentos"
                          onClick={() => handleOpenDocsModal(worker)}
                          disabled={userSession.role_id == 1 ? false : true}
                        >
                          Emissão de Documentos
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          title="Emitir crachá"
                          onClick={() => handleIssueBadge(worker)}
                          disabled={userSession.role_id == 1 ? false : true}
                        >
                          Emissão de Crachá
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleOpenWorkerNotation(worker)}
                          title="Adicionar observação"
                          id="workerObservation"
                          disabled={userSession.role_id == 1 ? false : true}
                        >
                          Observação de Colaborador
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          title="Avaliação de tempo de experiência"
                          onClick={() => handleOpenExperienceTimeModal(worker)}
                          disabled={userSession.role_id == 1 ? false : true}
                        >
                          Avaliação de tempo de experiência de colaborador
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          ))
        }
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
        setWorkersList={setWorkersList}
      />

      <ModifyWorkpointModal
        modifyWorkpointModalOpen={modifyWorkpointModalOpen}
        setModifyWorkpointModalOpen={setModifyWorkpointModalOpen}
      />

      <AdmissionsReportModal
        admissionsReportModalOpen={admissionsReportModalOpen}
        setAdmissionsReportModalOpen={setAdmissionsReportModalOpen}
      />

      <TransportVoucherModal
        transportVoucherModalOpen={transportVoucherModalOpen}
        setTransportVoucherModalOpen={setTransportVoucherModalOpen}
      />

      <OpenAccountModal
        openAccountModalOpen={openAccountModalOpen}
        setOpenAccountModalOpen={setOpenAccountModalOpen}
      />

      <MonthBirthdaysModal
        monthBirthdaysModalOpen={monthBirthdaysModalOpen}
        setMonthBirthdaysModalOpen={setMonthBirthdaysModalOpen}
      />

      <ChangeWorkerSubsidiarieModal
        changeWorkerSubsidiarieModalOpen={changeWorkerSubsidiarieModalOpen}
        setChangeWorkerSubsidiarieModalOpen={setChangeWorkerSubsidiarieModalOpen}
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        setWorkersList={setWorkersList}
      />

      <RequestBadgesModal
        requestBadgesModalOpen={requestBadgesModalOpen}
        setRequestBadgesModalOpen={setRequestBadgesModalOpen}
      />

      <ChecklistModal
        checklistModalOpen={checklistModalOpen}
        setChecklistModalOpen={setChecklistModalOpen}
        workerId={selectedWorker?.worker_id}
      />

      <WorkersMetricsModal
        selectedWorker={selectedWorker}
        workersMetricsModalOpen={workersMetricsModalOpen}
        setWorkersMetricsModalOpen={setWorkersMetricsModalOpen}
      />

      <WorkersDiscountsModal
        selectedWorker={selectedWorker}
        workersDiscountsModalOpen={workersDiscountsModalOpen}
        setWorkersDiscountsModalOpen={setWorkersDiscountsModalOpen}
      />
    </>
  )
}

export default Workers