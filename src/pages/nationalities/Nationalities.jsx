import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import api from "../../services/api"
import { Pencil, Plus, Trash } from "react-bootstrap-icons"
import AddNationalitieModal from "./AddNationalitieModal"
import getNationalities from "../../requests/nationalities/getNationalities"
import EditNationalitieModal from "./EditNationalitieModal"
import DeleteNationalitieModal from "./DeleteNationalitieModal"

const Nationalities = () => {
  const [nationalitiesList, setNationalitiesList] = useState()

  const [selectedNationalitie, setSelectedNationalitie] = useState()

  const [addNationalitieModalOpen, setAddNationalitieModalOpen] = useState(false)

  const [editNationalitieModalOpen, setEditNationalitieModalOpen] = useState(false)

  const [deleteNationalitieModalOpen, setDeleteNationalitieModalOpen] = useState(false)

  useEffect(() => {
    getNationalities()
      .then((response) => setNationalitiesList(response?.data))
  }, [])

  const handleOpenAddNationalitieModal = () => {
    setAddNationalitieModalOpen(true)
  }

  const handleOpenEditNationalitieModal = (nationalitie) => {
    setSelectedNationalitie(nationalitie)

    setEditNationalitieModalOpen(true)
  }

  const handleOpenDeleteNationalitieModal = (nationalitie) => {
    setSelectedNationalitie(nationalitie)

    setDeleteNationalitieModalOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de nacionalidades</h4>

        <button
          className="btn btn-primary"
          onClick={handleOpenAddNationalitieModal}
        >
          <Plus />
        </button>

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
                nationalitiesList?.map((nationalitie) => (
                  <tr key={nationalitie.id}>
                    <td>{nationalitie.name}</td>

                    <td>
                      <button
                        className="btn btn-warning mt-2 me-2"
                        onClick={() => handleOpenEditNationalitieModal(nationalitie)}
                      >
                        <Pencil />
                      </button>

                      <button
                        className="btn btn-danger mt-2 me-2"
                        onClick={() => handleOpenDeleteNationalitieModal(nationalitie)}
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

      <AddNationalitieModal
        addNationalitieModalOpen={addNationalitieModalOpen}
        setAddNationalitieModalOpen={setAddNationalitieModalOpen}
        setNationalitiesList={setNationalitiesList}
      />

      <EditNationalitieModal
        editNationalitieModalOpen={editNationalitieModalOpen}
        setEditNationalitieModalOpen={setEditNationalitieModalOpen}
        selectedNationalitie={selectedNationalitie}
        setNationalitiesList={setNationalitiesList}
        setSelectedNationalitie={setSelectedNationalitie}
      />

      <DeleteNationalitieModal
        deleteNationalitieModalOpen={deleteNationalitieModalOpen}
        setDeleteNationalitieModalOpen={setDeleteNationalitieModalOpen}
        selectedNationalitie={selectedNationalitie}
        setNationalitiesList={setNationalitiesList}
        setSelectedNationalitie={setSelectedNationalitie}
      />
    </>
  )
}

export default Nationalities