import { useEffect, useState } from "react"
import { Pen, Plus, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import api from "../../services/api"
import AddCitiesModal from "./AddCitiesModal"
import EditCitiesModal from "./EditCitiesModal"
import DeleteCitiesModal from "./DeleteCitiesModal"

const Cities = () => {
  const [citiesList, setCitiesList] = useState()

  const [selectedCity, setSelectedCity] = useState()

  const [addCitiesModalOpen, setAddCitiesModalOpen] = useState(false)

  const [editCitiesModalOpen, setEditCitiesModalOpen] = useState(false)

  const [deleteCitiesModalOpen, setDeleteCitiesModalOpen] = useState(false)

  useEffect(() => {
    api
      .get("/cities")
      .then((response) => setCitiesList(response?.data))
  }, [])

  const handleOpenAddCitiesModal = () => {
    setAddCitiesModalOpen(true)
  }

  const handleOpenEditCitiesModal = (city) => {
    setSelectedCity(city)

    setEditCitiesModalOpen(true)
  }

  const handleOpenDeleteCitiesModal = (city) => {
    setSelectedCity(city)

    setDeleteCitiesModalOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de cidades</h4>

        <div>
          <button className="btn btn-primary mb-3" onClick={handleOpenAddCitiesModal}>
            <Plus />
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nome</th>

                <th>Estado</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                citiesList && citiesList.map((city) => (
                  <tr>
                    <td>{city.Cities.name}</td>

                    <td>{city.States.name}</td>

                    <td>
                      <button className="btn btn-warning mt-2 me-2" onClick={() => handleOpenEditCitiesModal(city)}>
                        <Pen />
                      </button>

                      <button className="btn btn-danger mt-2 me-2" onClick={() => handleOpenDeleteCitiesModal(city)}>
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

      <AddCitiesModal
        addCitiesModalOpen={addCitiesModalOpen}
        setAddCitiesModalOpen={setAddCitiesModalOpen}
        setCitiesList={setCitiesList}
      />

      <EditCitiesModal
        editCitiesModalOpen={editCitiesModalOpen}
        setEditCitiesModalOpen={setEditCitiesModalOpen}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setCitiesList={setCitiesList}
      />

      <DeleteCitiesModal
        deleteCitiesModalOpen={deleteCitiesModalOpen}
        setDeleteCitiesModalOpen={setDeleteCitiesModalOpen}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setCitiesList={setCitiesList}
      />
    </>
  )
}

export default Cities