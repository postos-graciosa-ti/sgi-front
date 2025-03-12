import { useEffect, useState } from "react"
import { Pencil, Plus, Question, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import costCenterSteps from "../../driverjs/costCenterSteps"
import initTour from "../../driverjs/initTour"
import api from "../../services/api"
import AddCostCenterModal from "./AddCostCenterModal"
import DeleteCostCenterModal from "./DeleteCostCenterModal"
import EditCostCenterModal from "./EditCostCenterModal"

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

  const handleOpenAddCostCenterModal = () => {
    setAddCostCenterModalOpen(true)
  }

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
            className="btn btn-warning me-2"
            onClick={() => initTour(costCenterSteps)}
          >
            <Question />
          </button>

          <button
            id="addCostCenter"
            type="button"
            className="btn btn-primary"
            onClick={handleOpenAddCostCenterModal}
            title="Adicionar centro de custo"
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
                  <tr id="costCenterRow" key={costCenter.id}>
                    <td>{costCenter.name}</td>

                    <td>{costCenter.description}</td>

                    <td>
                      <button
                        id="editCostCenter"
                        type="button"
                        className="btn btn-warning mt-2 me-2"
                        onClick={() => handleOpenEditCostCenterModal(costCenter)}
                        title="Editar centro de custo"
                      >
                        <Pencil />
                      </button>

                      <button
                        id="deleteCostCenter"
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={() => handleOpenDeleteCostCenterModal(costCenter)}
                        title="Apagar centro de custo"
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
