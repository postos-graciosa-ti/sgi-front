import "driver.js/dist/driver.css"
import { useEffect, useState } from "react"
import { Pencil, Plus, Question, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import mountDriver from "../../driverjs/mountDriver"
import turnsSteps from "../../driverjs/turnsSteps"
import api from "../../services/api"
import AddTurnModal from "./AddTurnModal"
import DeleteTurnModal from "./DeleteTurnModal"
import EditTurnModal from "./EditTurnModal"

const Turns = () => {
  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [addTurnModalOpen, setAddTurnModalOpen] = useState(false)

  const [turnsList, setTurnsList] = useState()

  const [turnToEdit, setTurnToEdit] = useState()

  const [editTurnModalOpen, setEditTurnModalOpen] = useState(false)

  const [turnToDelete, setTurnToDelete] = useState()

  const [deleteTurnModalOpen, setDeleteTurnModalOpen] = useState(false)

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie.value}/turns`)
      .then((response) => setTurnsList(response.data))
  }, [])

  const handleOpenAddTurnModal = () => {
    setAddTurnModalOpen(true)
  }

  const handleOpenEditTurnModal = (turn) => {
    setTurnToEdit()

    setTurnToEdit(turn)

    setEditTurnModalOpen(true)
  }

  const handleOpenDeleteTurnModal = (turn) => {
    setTurnToDelete()

    setTurnToDelete(turn)

    setDeleteTurnModalOpen(true)
  }

  const initTour = () => {
    const driverObj = mountDriver(turnsSteps)

    driverObj.drive()
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div className="mt-3 mb-3">
          <h4>Cadastro de turnos</h4>
        </div>

        <div className="mt-3 mb-3">
          <button
            className="btn btn-warning me-2"
            onClick={initTour}
          >
            <Question />
          </button>

          <button
            id="addTurn"
            type="button"
            className="btn btn-primary"
            onClick={handleOpenAddTurnModal}
            title="Adicionar turno"
          >
            <Plus />
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Início do turno</th>
                <th>Início do intervalo</th>
                <th>Fim do intervalo</th>
                <th>Fim do turno</th>
              </tr>
            </thead>

            <tbody id="turnsTable">
              {
                turnsList && turnsList.map((turn) => (
                  <tr id="turnRow" key={turn.id}>
                    <td>{turn.name}</td>
                    <td>{turn.start_time.replace(/:\d{2}$/, '')}</td>
                    <td>{turn.start_interval_time.replace(/:\d{2}$/, '')}</td>
                    <td>{turn.end_interval_time.replace(/:\d{2}$/, '')}</td>
                    <td>{turn.end_time.replace(/:\d{2}$/, '')}</td>
                    <td>
                      <button
                        id="editTurn"
                        type="button"
                        className="btn btn-warning mt-2 me-2"
                        onClick={() => handleOpenEditTurnModal(turn)}
                        title="Editar turno"
                      >
                        <Pencil />
                      </button>

                      <button
                        id="deleteTurn"
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={() => handleOpenDeleteTurnModal(turn)}
                        title="Apagar turno"
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

      <AddTurnModal
        addTurnModalOpen={addTurnModalOpen}
        setAddTurnModalOpen={setAddTurnModalOpen}
        setTurnsList={setTurnsList}
      />

      <EditTurnModal
        editTurnModalOpen={editTurnModalOpen}
        setEditTurnModalOpen={setEditTurnModalOpen}
        turnToEdit={turnToEdit}
        setTurnToEdit={setTurnToEdit}
        setTurnsList={setTurnsList}
      />

      <DeleteTurnModal
        deleteTurnModalOpen={deleteTurnModalOpen}
        setDeleteTurnModalOpen={setDeleteTurnModalOpen}
        turnToDelete={turnToDelete}
        setTurnToDelete={setTurnToDelete}
        setTurnsList={setTurnsList}
      />
    </>
  )
}

export default Turns
