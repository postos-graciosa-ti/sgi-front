import { useEffect, useState } from "react"
import { Pencil, Plus, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import api from "../../services/api"
import AddDepartmentModal from "./AddDepartmentModal"
import EditDepartmentModal from "./EditDepartmentModal"
import DeleteDepartmentModal from "./DeleteDepartmentModal"

const Department = () => {
  const [departmentsList, setDepartmentsList] = useState([])

  const [selectedDepartment, setSelectedDepartment] = useState()

  const [addDepartmentModalOpen, setAddDepartmentModalOpen] = useState(false)

  const [editDepartmentModalOpen, setEditDepartmentModalOpen] = useState(false)

  const [deleteDepartmentModalOpen, setDeleteDepartmentModalOpen] = useState(false)

  useEffect(() => {
    api
      .get("/departments")
      .then((response) => setDepartmentsList(response.data))
  }, [])

  const handleOpenEditDepartmentModal = (department) => {
    setSelectedDepartment(department)

    setEditDepartmentModalOpen(true)
  }

  const handleOpenDeleteDepartmentModal = (department) => {
    setSelectedDepartment(department)

    setDeleteDepartmentModalOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div>
          <h4>Cadastro de setores</h4>
        </div>

        <div className="mt-3 mb-3">
          <button
            id="addTurn"
            type="button"
            className="btn btn-primary"
            onClick={() => setAddDepartmentModalOpen(true)}
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
              {departmentsList && departmentsList.map((department) => (
                <tr key={department.id}>
                  <td>{department.name}</td>
                  <td>{department.description}</td>
                  <td>
                    <button
                      id="editTurn"
                      type="button"
                      className="btn btn-warning mt-2 me-2"
                      onClick={() => handleOpenEditDepartmentModal(department)}
                    >
                      <Pencil />
                    </button>
                    <button
                      id="deleteTurn"
                      type="button"
                      className="btn btn-danger mt-2"
                      onClick={() => handleOpenDeleteDepartmentModal(department)}
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

      <AddDepartmentModal
        addDepartmentModalOpen={addDepartmentModalOpen}
        setAddDepartmentModalOpen={setAddDepartmentModalOpen}
        setDepartmentsList={setDepartmentsList}
      />

      <EditDepartmentModal
        editDepartmentModalOpen={editDepartmentModalOpen}
        setEditDepartmentModalOpen={setEditDepartmentModalOpen}
        selectedDepartment={selectedDepartment}
        setDepartmentsList={setDepartmentsList}
        setSelectedDepartment={setSelectedDepartment}
      />

      <DeleteDepartmentModal
        deleteDepartmentModalOpen={deleteDepartmentModalOpen}
        setDeleteDepartmentModalOpen={setDeleteDepartmentModalOpen}
        selectedDepartment={selectedDepartment}
        setDepartmentsList={setDepartmentsList}
        setSelectedDepartment={setSelectedDepartment}
      />
    </>
  )
}

export default Department
