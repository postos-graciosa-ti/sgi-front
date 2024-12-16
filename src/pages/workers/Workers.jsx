import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import getWorkersBySubsidiarie from "../../requests/getWorkersBySubsidiarie"
import api from "../../services/api"
import CreateWorkerModal from "./CreateWorkerModal"
import SecurityPasswordModal from "./SecurityPasswordModal"
import { Pencil, Plus, Question, Trash } from "react-bootstrap-icons"

const Workers = () => {
  const userSession = useUserSessionStore(state => state.userSession)

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [createWorkerModalOpen, setCreateWorkerModalOpen] = useState(false)

  const setWorkersList = useUserSessionStore((state) => state.setWorkersList)

  const workersList = useUserSessionStore((state) => state.workersList)

  const [securityPasswordModalOpen, setSecurityPasswordModalOpen] = useState(false)

  const [selectedWorker, setSelectedWorker] = useState()

  useEffect(() => {
    getWorkersBySubsidiarie(selectedSubsdiarie.value)
      .then((response) => setWorkersList(response.data))
  }, [])

  const handleUpdateWorker = () => {

  }

  const handleDeleteWorker = (worker) => {
    api
      .put(`/workers/deactivate/${worker.id}`)
      .then((response) => {
        console.log(response)

        if (response.status == 200) {
          Swal.fire({
            title: `${worker.name} foi desativado`,
            // text: "You clicked the button!",
            icon: "success"
          })

          getWorkersBySubsidiarie(selectedSubsdiarie.value)
            .then((response) => setWorkersList(response.data))
        }
      })
  }

  console.log(userSession)

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de colaboradores</h4>

        <button
          type="button"
          className="btn btn-warning me-2"
        >
          <Question />
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setCreateWorkerModalOpen(true)}
        >
          <Plus />
        </button>

        <div className="table-responsive mt-3">
          <table className="table">
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Ativo</th>
              <th></th>
            </tr>
            {
              workersList && workersList.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.name}</td>
                  <td>{worker.function_id == 1 && "Frentista"}</td>
                  <td>{worker.is_active == true && "Sim" || "Não"}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdateWorker(worker)}
                    >
                      <Pencil />
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteWorker(worker)}
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))
            }
          </table>
        </div>
      </div>

      <CreateWorkerModal
        createWorkerModalOpen={createWorkerModalOpen}
        setCreateWorkerModalOpen={setCreateWorkerModalOpen}
      />

      <SecurityPasswordModal
        selectedWorker={selectedWorker}
        securityPasswordModalOpen={securityPasswordModalOpen}
        setSecurityPasswordModalOpen={setSecurityPasswordModalOpen}
      />
    </>
  )
}

export default Workers