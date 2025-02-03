import { useEffect, useState } from "react"
import { Pencil, Plus, Question, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import mountTour from "../../functions/mountTour"
import getWorkersBySubsidiarie from "../../requests/getWorkersBySubsidiarie"
import CreateWorkerModal from "./CreateWorkerModal"
import DeleteWorkerModal from "./DeleteWorkerModal"
import EditWorkerModal from "./EditWorkerModal"

const Workers = () => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [workersList, setWorkersList] = useState()

  const [selectedWorker, setSelectedWorker] = useState()

  const [createWorkerModalOpen, setCreateWorkerModalOpen] = useState(false)

  const [editWorkerModalOpen, setEditWorkerModalOpen] = useState(false)

  const [deleteWorkerModalOpen, setDeleteWorkerModalOpen] = useState(false)

  useEffect(() => {
    getWorkersBySubsidiarie(selectedSubsdiarie.value)
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

  const setTour = () => {
    let route = location.pathname

    let driverObj = mountTour(route)

    driverObj.drive()
  }

  console.log(workersList)

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de colaboradores</h4>

        {/* <button
          type="button"
          className="btn btn-warning me-2"
          onClick={setTour}
          id="help"
        >
          <Question />
        </button> */}

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setCreateWorkerModalOpen(true)}
          id="add-worker"
        >
          <Plus />
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
                <th>Ações</th>
              </tr>
            </thead>
            <tbody style={{ display: "block", maxHeight: "400px", overflowY: "scroll" }}>
              {workersList?.map((worker) => (
                <tr key={worker.id} style={{ display: "table", width: "100%", tableLayout: "fixed" }}>
                  <td>{worker.worker_name}</td>
                  <td>{worker.function_name}</td>
                  <td>{worker.turn_start_time.replace(/:\d{2}$/, '')} - {worker.turn_end_time.replace(/:\d{2}$/, '')}</td>
                  <td>{worker.worker_is_active ? "Sim" : "Não"}</td>
                  <td>{worker.cost_center}</td>
                  <td>{worker.department}</td>
                  <td>{worker.admission_date}</td>
                  <td>{!worker.worker_is_active ? worker.resignation_date : "Ativo"}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2 mt-2"
                      onClick={() => handleOpenEditWorkerModal(worker)}
                      id="edit-worker"
                      aria-label={`Editar informações de ${worker.worker_name}`}
                    >
                      <Pencil />
                    </button>
                    <button
                      className="btn btn-danger me-2 mt-2"
                      onClick={() => handleOpenDeleteWorkerModal(worker)}
                      id="delete-worker"
                      aria-label={`Excluir ${worker.worker_name}`}
                    >
                      <Trash />
                    </button>
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

      <style>
        {`
          .table thead, .table tbody tr {
            display: table;
            width: 100%;
            table-layout: fixed;
          }

          .table tbody {
            display: block;
            max-height: 400px;
            overflow-y: scroll;
          }
        `}
      </style>
    </>
  )
}

export default Workers