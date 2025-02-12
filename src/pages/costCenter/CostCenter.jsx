import { useEffect, useState } from "react"
import { Pencil, Plus, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import api from "../../services/api"
import AddCostCenterModal from "./AddCostCenterModal"
import EditCostCenterModal from "./EditCostCenterModal"
import DeleteCostCenterModal from "./DeleteCostCenterModal"

const CostCenter = () => {
  const [costCenterList, setCostCenterList] = useState([])

  const [selectedCostCenter, setSelectedCostCenter] = useState(null)

  const [addCostCenterModalOpen, setAddCostCenterModalOpen] = useState(false)

  const [editCostCenterModalOpen, setEditCostCenterModalOpen] = useState(false)

  const [deleteCostCenterModalOpen, setDeleteCostCenterModalOpen] = useState(false)

  useEffect(() => {
    api
      .get("/cost-center")
      .then((response) => setCostCenterList(response.data))
  }, [])

  const handleOpenEditCostCenterModal = (costCenter) => {
    setSelectedCostCenter(costCenter)

    setEditCostCenterModalOpen(true)
  }

  const handleOpenDeleteCostCenterModal = (costCenter) => {
    setSelectedCostCenter(costCenter)

    setDeleteCostCenterModalOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div>
          <h4>Cadastro de centro de custos</h4>
        </div>

        <div className="mt-3 mb-3">
          <button
            id="addTurn"
            type="button"
            className="btn btn-primary"
            onClick={() => setAddCostCenterModalOpen(true)}
          >
            <Plus />
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {costCenterList &&
                costCenterList.map((costCenter) => (
                  <tr key={costCenter.id}>
                    <td>{costCenter.name}</td>
                    <td>{costCenter.description}</td>
                    <td>
                      <button
                        id="editTurn"
                        type="button"
                        className="btn btn-warning mt-2 me-2"
                        onClick={() => handleOpenEditCostCenterModal(costCenter)}
                      >
                        <Pencil />
                      </button>
                      <button
                        id="deleteTurn"
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={() => handleOpenDeleteCostCenterModal(costCenter)}
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddCostCenterModal
        addCostCenterModalOpen={addCostCenterModalOpen}
        setAddCostCenterModalOpen={setAddCostCenterModalOpen}
        setCostCenterList={setCostCenterList}
      />

      <EditCostCenterModal
        editCostCenterModalOpen={editCostCenterModalOpen}
        setEditCostCenterModalOpen={setEditCostCenterModalOpen}
        selectedCostCenter={selectedCostCenter}
        setCostCenterList={setCostCenterList}
        setSelectedCostCenter={setSelectedCostCenter}
      />

      <DeleteCostCenterModal
        deleteCostCenterModalOpen={deleteCostCenterModalOpen}
        setDeleteCostCenterModalOpen={setDeleteCostCenterModalOpen}
        selectedCostCenter={selectedCostCenter}
        setCostCenterList={setCostCenterList}
        setSelectedCostCenter={setSelectedCostCenter}
      />
    </>
  )
}

export default CostCenter
