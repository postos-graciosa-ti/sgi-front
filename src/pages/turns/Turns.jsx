import { Pencil, Plus, Question, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import AddTurnModal from "./AddTurnModal"
import { useEffect, useState } from "react"
import getTurns from "../../requests/getTurns"
import EditTurnModal from "./EditTurnModal"
import DeleteTurnModal from "./DeleteTurnModal"
import { useLocation } from "react-router-dom"
import mountTour from "../../functions/mountTour"

const Turns = () => {
  const location = useLocation()

  const [addTurnModalOpen, setAddTurnModalOpen] = useState(false)

  const [turnsList, setTurnsList] = useState()

  const [turnToEdit, setTurnToEdit] = useState()

  const [editTurnModalOpen, setEditTurnModalOpen] = useState(false)

  const [turnToDelete, setTurnToDelete] = useState()

  const [deleteTurnModalOpen, setDeleteTurnModalOpen] = useState(false)

  useEffect(() => {
    GetTurns()
  }, [])

  const handleOpenAddTurnModal = () => {
    setAddTurnModalOpen(true)
  }

  const handleOpenEditTurnModal = (turn) => {
    setTurnToEdit(turn)

    setEditTurnModalOpen(true)
  }

  const handleOpenDeleteTurnModal = (turn) => {
    setTurnToDelete(turn)

    setDeleteTurnModalOpen(true)
  }

  const GetTurns = () => {
    getTurns()
      .then((response) => {
        setTurnsList(response.data)
      })
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
        <div className="mt-3 mb-3">
          <h4>Cadastro de turnos</h4>
        </div>

        <div className="mt-3 mb-3">
          <button
            id="help"
            type="button"
            className="btn btn-warning me-2"
            onClick={setTour}
          >
            <Question />
          </button>

          <button
            id="addTurn"
            type="button"
            className="btn btn-primary"
            onClick={handleOpenAddTurnModal}
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
                  <tr key={turn.id}>
                    <td>{turn.name}</td>
                    <td>{turn.start_time}</td>
                    <td>{turn.start_interval_time}</td>
                    <td>{turn.end_interval_time}</td>
                    <td>{turn.end_time}</td>
                    <td>
                      <button
                        id="editTurn"
                        type="button"
                        className="btn btn-warning mt-2 me-2"
                        onClick={() => handleOpenEditTurnModal(turn)}
                      >
                        <Pencil />
                      </button>

                      <button
                        id="deleteTurn"
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={() => handleOpenDeleteTurnModal(turn)}
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
        GetTurns={GetTurns}
      />

      <EditTurnModal
        editTurnModalOpen={editTurnModalOpen}
        setEditTurnModalOpen={setEditTurnModalOpen}
        GetTurns={GetTurns}
        turnToEdit={turnToEdit}
      />

      <DeleteTurnModal
        deleteTurnModalOpen={deleteTurnModalOpen}
        setDeleteTurnModalOpen={setDeleteTurnModalOpen}
        GetTurns={GetTurns}
        turnToDelete={turnToDelete}
      />
    </>
  )
}

export default Turns
