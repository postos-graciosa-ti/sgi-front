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
        console.log(response.data)
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

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de colaboradores</h4>

        <button
          type="button"
          className="btn btn-warning me-2"
          onClick={setTour}
          id="help"
        >
          <Question />
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setCreateWorkerModalOpen(true)}
          id="add-worker"
        >
          <Plus />
        </button>

        <div id="table-container" className="table-responsive" style={{ maxHeight: "800px", overflowY: "auto" }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Função</th>
                <th>Turno</th>
                <th>Ativo</th>
                <th></th>
              </tr>
            </thead>
          </table>

          <div style={{ overflowY: "auto", maxHeight: "500px" }}>
            <table className="table table-hover">
              <tbody>
                {
                  workersList?.map((worker) => (
                    <tr key={worker.id}>
                      <td>{worker.worker_name}</td>
                      <td>{worker.function_name}</td>
                      <td>{worker.turn_start_time} - {worker.turn_end_time}</td>
                      <td>{worker.worker_is_active == true ? "Sim" : "Não"}</td>
                      <td>
                        <button
                          className="btn btn-warning me-2 mt-2"
                          onClick={() => handleOpenEditWorkerModal(worker)}
                          id="edit-worker"
                        >
                          <Pencil />
                        </button>
                        <button
                          className="btn btn-danger me-2 mt-2"
                          onClick={() => handleOpenDeleteWorkerModal(worker)}
                          id="delete-worker"
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
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
    </>
  )
}

export default Workers