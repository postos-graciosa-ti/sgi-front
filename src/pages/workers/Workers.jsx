import { useEffect, useState } from "react"
import { ArrowClockwise, ClipboardData, Pen, PersonAdd, PersonGear, SlashCircle } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import CreateWorkerModal from "./CreateWorkerModal"
import DeleteWorkerModal from "./DeleteWorkerModal"
import EditWorkerModal from "./EditWorkerModal"
import ReactivateWorkerModal from "./ReactivateWorkerModal"
import ResignationReasonsReportModal from "./ResignationReasonsReportModal"
import WorkerNotationModal from "./WorkerNotationModal"

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

  useEffect(() => {
    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
      .then((response) => {
        setWorkersList(response.data)
      })
  }, [])

  const handleOpenEditWorkerModal = (worker) => {
    setSelectedWorker(worker)

    setEditWorkerModalOpen(true)
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

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de colaboradores</h4>

        <button
          className="btn btn-danger me-2"
          onClick={handleOpenResigntaionReasonsReportModal}
          title="Filtrar demissões"
        >
          <ClipboardData />
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setCreateWorkerModalOpen(true)}
          id="add-worker"
          title="Adicionar colaborador"
        >
          <PersonAdd />
        </button>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Função</th>
                <th>Turno</th>
                <th>Ativo</th>
                <th>C. de custo</th>
                <th>Setor</th>
                <th>Admissão</th>
                <th>Demissão</th>
                <th>Razão</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {workersList?.map((worker) => (
                <tr key={worker.id} className={!worker.worker_is_active && "table-danger"}>
                  <td>{worker.worker_name}</td>
                  <td>{worker.function_name}</td>
                  <td>{worker.turn_start_time.replace(/:\d{2}$/, '')} - {worker.turn_end_time.replace(/:\d{2}$/, '')}</td>
                  <td>{worker.worker_is_active ? "Sim" : "Não"}</td>
                  <td>{worker.cost_center}</td>
                  <td>{worker.department}</td>
                  <td>{worker.admission_date}</td>
                  <td>{!worker.worker_is_active ? worker.resignation_date : "Ativo"}</td>
                  <td>{!worker.worker_is_active ? worker.resignation_reason_name : "Ativo"}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2 mt-2"
                      onClick={() => handleOpenEditWorkerModal(worker)}
                      id="edit-worker"
                      aria-label={`Editar informações de ${worker.worker_name}`}
                      title="Editar colaborador"
                    >
                      <PersonGear />
                    </button>

                    <button
                      className="btn btn-primary me-2 mt-2"
                      onClick={() => handleOpenWorkerNotation(worker)}
                      title="Adicionar observação"
                    >
                      <Pen />
                    </button>

                    <button
                      className="btn btn-danger me-2 mt-2"
                      onClick={() => handleOpenDeleteWorkerModal(worker)}
                      id="delete-worker"
                      aria-label={`Excluir ${worker.worker_name}`}
                      title="Demitir colaborador"
                    >
                      <SlashCircle />
                    </button>

                    {
                      !worker.worker_is_active && (
                        <button
                          className="btn btn-primary me-2 mt-2"
                          onClick={() => handleOpenReactivateWorkerModal(worker)}
                          title="readimitir"
                        >
                          <ArrowClockwise />
                        </button>
                      )
                    }
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
    </>
  )
}

export default Workers