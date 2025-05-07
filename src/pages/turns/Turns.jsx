import "driver.js/dist/driver.css"
import { useEffect, useState } from "react"
import { Pencil, Plus, Question, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import initTour from "../../driverjs/initTour"
import turnsSteps from "../../driverjs/turnsSteps"
import { useScreenSize } from "../../hooks/useScreenSize"
import api from "../../services/api"
import AddTurnModal from "./AddTurnModal"
import DeleteTurnModal from "./DeleteTurnModal"
import EditTurnModal from "./EditTurnModal"

const Turns = () => {
  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const { isMobile, isTablet, isDesktop } = useScreenSize()

  // const isDesktop = useMediaQuery({ minWidth: 1024 })

  // const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 })

  // const isMobile = useMediaQuery({ maxWidth: 767 })

  const [turnsList, setTurnsList] = useState()

  const [selectedTurn, setSelectedTurn] = useState()

  const [addTurnModalOpen, setAddTurnModalOpen] = useState(false)

  const [editTurnModalOpen, setEditTurnModalOpen] = useState(false)

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
    setSelectedTurn(turn)

    setEditTurnModalOpen(true)
  }

  const handleOpenDeleteTurnModal = (turn) => {
    setSelectedTurn(turn)

    setDeleteTurnModalOpen(true)
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
            onClick={() => initTour(turnsSteps)}
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

        {
          isDesktop && (
            <>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Semana</th>
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
                          <td>{turn.week}</td>
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
            </>
          )
        }

        {
          isTablet && (
            <>
              {
                turnsList && turnsList.map((turn) => (
                  <div key={turn.id} className="card mb-5">
                    <div className="card-body">
                      <h5 className="card-title">{turn.name}</h5>
                      {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p> */}
                    </div>

                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <b>Semana</b>: {turn.week || "não consta registro"}
                      </li>

                      <li className="list-group-item">
                        <b>Inicio de turno</b>: {turn.start_time.replace(/:\d{2}$/, '') || "não consta registro"}
                      </li>

                      <li className="list-group-item">
                        <b>Inicio de intervalo</b>: {turn.start_interval_time.replace(/:\d{2}$/, '')}
                      </li>

                      <li className="list-group-item">
                        <b>Final de intervalo</b>: {turn.end_interval_time.replace(/:\d{2}$/, '')}
                      </li>

                      <li className="list-group-item">
                        <b>Final de turno</b>: {turn.end_time.replace(/:\d{2}$/, '') || "não consta registro"}
                      </li>
                    </ul>

                    <div className="card-body text-end">
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
                    </div>
                  </div>
                ))
              }
            </>
          )
        }

        {
          isMobile && (
            <>
              {
                turnsList && turnsList.map((turn) => (
                  <div key={turn.id} className="card mb-5">
                    <div className="card-body">
                      <h5 className="card-title">{turn.name}</h5>
                      {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p> */}
                    </div>

                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <b>Semana</b>: {turn.week || "não consta registro"}
                      </li>

                      <li className="list-group-item">
                        <b>Inicio de turno</b>: {turn.start_time.replace(/:\d{2}$/, '') || "não consta registro"}
                      </li>

                      <li className="list-group-item">
                        <b>Inicio de intervalo</b>: {turn.start_interval_time.replace(/:\d{2}$/, '')}
                      </li>

                      <li className="list-group-item">
                        <b>Final de intervalo</b>: {turn.end_interval_time.replace(/:\d{2}$/, '')}
                      </li>

                      <li className="list-group-item">
                        <b>Final de turno</b>: {turn.end_time.replace(/:\d{2}$/, '') || "não consta registro"}
                      </li>
                    </ul>

                    <div className="card-body text-end">
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
                    </div>
                  </div>
                ))
              }
            </>
          )
        }
      </div>

      <AddTurnModal
        addTurnModalOpen={addTurnModalOpen}
        setAddTurnModalOpen={setAddTurnModalOpen}
        setTurnsList={setTurnsList}
      />

      <EditTurnModal
        editTurnModalOpen={editTurnModalOpen}
        setEditTurnModalOpen={setEditTurnModalOpen}
        turnToEdit={selectedTurn}
        setTurnToEdit={setSelectedTurn}
        setTurnsList={setTurnsList}
      />

      <DeleteTurnModal
        deleteTurnModalOpen={deleteTurnModalOpen}
        setDeleteTurnModalOpen={setDeleteTurnModalOpen}
        turnToDelete={selectedTurn}
        setTurnToDelete={setSelectedTurn}
        setTurnsList={setTurnsList}
      />
    </>
  )
}

export default Turns
