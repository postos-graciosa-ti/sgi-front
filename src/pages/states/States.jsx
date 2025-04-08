import { useEffect, useState } from "react"
import { Pencil, Plus, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import getStates from "../../requests/states/getStates"
import AddStateModal from "./AddStateModal"
import DeleteStateModal from "./DeleteStateModal"
import EditStateModal from "./EditStateModal"

const States = () => {
  const [statesList, setStatesList] = useState()

  const [selectedState, setSelectedState] = useState()

  const [addStateModalOpen, setAddStateModalOpen] = useState(false)

  const [editStateModalOpen, setEditStateModalOpen] = useState(false)

  const [deleteStateModalOpen, setDeleteStateModalOpen] = useState(false)

  useEffect(() => {
    getStates()
      .then((response) => setStatesList(response?.data))
  }, [])

  const handleOpenAddStateModal = () => {
    setAddStateModalOpen(true)
  }

  const handleOpenEditStateModal = (state) => {
    setSelectedState(state)

    setEditStateModalOpen(true)
  }

  const handleOpenDeleteStateModal = (state) => {
    setSelectedState(state)

    setDeleteStateModalOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de estados</h4>

        <button
          className="btn btn-primary"
          onClick={handleOpenAddStateModal}
        >
          <Plus />
        </button>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nome</th>

                <th>Sigla</th>

                <th>Nacionalidade</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                statesList?.map((state) => (
                  <tr key={state.id}>
                    <td>{state.name}</td>

                    <td>{state.sail}</td>

                    <td>{state.nationalitie_name}</td>

                    <td>
                      <button
                        className="btn btn-warning me-2 mt-2"
                        onClick={() => handleOpenEditStateModal(state)}
                      >
                        <Pencil />
                      </button>

                      <button
                        className="btn btn-danger me-2 mt-2"
                        onClick={() => handleOpenDeleteStateModal(state)}
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

      <AddStateModal
        addStateModalOpen={addStateModalOpen}
        setAddStateModalOpen={setAddStateModalOpen}
        setStatesList={setStatesList}
      />

      <EditStateModal
        editStateModalOpen={editStateModalOpen}
        setEditStateModalOpen={setEditStateModalOpen}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        setStatesList={setStatesList}
      />

      <DeleteStateModal
        deleteStateModalOpen={deleteStateModalOpen}
        setDeleteStateModalOpen={setDeleteStateModalOpen}
        selectedState={selectedState}
        setStatesList={setStatesList}
      />
    </>
  )
}

export default States