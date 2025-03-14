import { useEffect, useState } from "react"
import { Pen, PenFill, Plus, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import AddNeighborhoodModal from "./AddNeighborhoodModal"
import api from "../../services/api"
import EditNeighborhoodModal from "./EditNeighborhoodModal"

const Neighborhood = () => {
  const [neighborhoods, setNeighborhoods] = useState()

  const [selectedNeighborhood, setSelectedNeighborhood] = useState()

  const [addNeighborhoodModalOpen, setAddNeighborhoodModalOpen] = useState(false)

  const [editNeighborhoodModalOpen, setEditNeighborhoodModalOpen] = useState(false)

  const [deleteNeighborhoodModalOpen, setDeleteNeighborhoodModalOpen] = useState(false)

  useEffect(() => {
    api
      .get("/neighborhoods")
      .then((response) => setNeighborhoods(response.data))

  }, [])

  const handleOpenAddNeighborhoodModalOpen = () => {
    setAddNeighborhoodModalOpen(true)
  }

  const handleOpenEditNeighborhoodModalOpen = (neighborhood) => {
    setSelectedNeighborhood(neighborhood)

    setEditNeighborhoodModalOpen(true)
  }

  const handleOpenDeleteNeighborhoodModalOpen = (neighborhood) => {
    setSelectedNeighborhood(neighborhood)

    setDeleteNeighborhoodModalOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de bairros</h4>

        <button
          className="btn btn-primary"
          onClick={handleOpenAddNeighborhoodModalOpen}
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
                neighborhoods?.map((neighborhood) => (
                  <tr>
                    <td>{neighborhood.name}</td>

                    <td>
                      <button className="btn btn-warning mt-2 me-2" onClick={() => handleOpenEditNeighborhoodModalOpen(neighborhood)}>
                        <Pen />
                      </button>

                      <button className="btn btn-danger mt-2 me-2" onClick={() => handleOpenDeleteNeighborhoodModalOpen(neighborhood)}>
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

      <AddNeighborhoodModal
        addNeighborhoodModalOpen={addNeighborhoodModalOpen}
        setAddNeighborhoodModalOpen={setAddNeighborhoodModalOpen}
        setNeighborhoods={setNeighborhoods}
      />

      <EditNeighborhoodModal 
        editNeighborhoodModalOpen={editNeighborhoodModalOpen}
        setEditNeighborhoodModalOpen={setEditNeighborhoodModalOpen}
        selectedNeighborhood={selectedNeighborhood}
        setSelectedNeighborhood={setSelectedNeighborhood}
        setNeighborhoods={setNeighborhoods}
      />
    </>
  )
}

export default Neighborhood