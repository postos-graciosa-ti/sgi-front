import { useEffect, useState } from "react"
import { Pencil, Plus, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import SideMenu from "../../components/SideMenu"
import api from "../../services/api"
import AddIndicatorsCriteriaModal from "./AddIndicatorsCriteriaModal"
import DeleteIndicatorsCriteriaModal from "./DeleteIndicatorsCriteriaModal"
import EditIndicatorsCriteriaModal from "./EditIndicatorsCriteriaModal"

const IndicatorsCriteria = () => {
  const [indicatorsCriteria, setIndicatorsCriteria] = useState()

  const [selectedIndicatorCriteria, setSelectedIndicatorCriteria] = useState()

  const [addIndicatorsCriteriaModalOpen, setAddIndicatorsCriteriaModalOpen] = useState(false)

  const [editIndicatorsCriteriaModalOpen, setEditIndicatorsCriteriaModalOpen] = useState(false)

  const [deleteIndicatorsCriteriaModalOpen, setDeleteIndicatorsCriteriaModalOpen] = useState(false)

  useEffect(() => {
    api
      .get(`/indicators-criteria`)
      .then((response) => {
        setIndicatorsCriteria(response.data)
      })
  }, [])

  const handleOpenAddIndicatorsCriteriaModal = () => {
    setAddIndicatorsCriteriaModalOpen(true)
  }

  const handleOpenEditIndicatorsCriteriaModal = (indicatorCriteria) => {
    setSelectedIndicatorCriteria(indicatorCriteria)

    setEditIndicatorsCriteriaModalOpen(true)
  }

  const handleOpenDeleteIndicatorsCriteriaModal = (indicatorCriteria) => {
    setSelectedIndicatorCriteria(indicatorCriteria)

    setDeleteIndicatorsCriteriaModalOpen(true)
  }

  return (
    <>
      <SideMenu />

      <Nav />

      <div className="container">
        <button
          onClick={handleOpenAddIndicatorsCriteriaModal}
          className="btn btn-primary mb-3"
        >
          <Plus />
        </button>

        {
          indicatorsCriteria && indicatorsCriteria.map((criteria) => (
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{criteria.name}</h5>
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item text-end">
                  <button
                    onClick={() => handleOpenEditIndicatorsCriteriaModal(criteria)}
                    className="btn btn-warning me-2"
                  >
                    <Pencil />
                  </button>

                  <button
                    onClick={() => handleOpenDeleteIndicatorsCriteriaModal(criteria)}
                    className="btn btn-danger"
                  >
                    <Trash />
                  </button>
                </li>
              </ul>
            </div>
          ))
        }
      </div>

      <AddIndicatorsCriteriaModal
        addIndicatorsCriteriaModalOpen={addIndicatorsCriteriaModalOpen}
        setAddIndicatorsCriteriaModalOpen={setAddIndicatorsCriteriaModalOpen}
        setIndicatorsCriteria={setIndicatorsCriteria}
      />

      <EditIndicatorsCriteriaModal
        editIndicatorsCriteriaModalOpen={editIndicatorsCriteriaModalOpen}
        setEditIndicatorsCriteriaModalOpen={setEditIndicatorsCriteriaModalOpen}
        selectedIndicatorCriteria={selectedIndicatorCriteria}
        setIndicatorsCriteria={setIndicatorsCriteria}
      />

      <DeleteIndicatorsCriteriaModal
        deleteIndicatorsCriteriaModalOpen={deleteIndicatorsCriteriaModalOpen}
        setDeleteIndicatorsCriteriaModalOpen={setDeleteIndicatorsCriteriaModalOpen}
        selectedIndicatorCriteria={selectedIndicatorCriteria}
        setIndicatorsCriteria={setIndicatorsCriteria}
      />
    </>
  )
}

export default IndicatorsCriteria