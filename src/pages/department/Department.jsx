import { useEffect, useState } from "react"
import { Pencil, Plus, Question, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import departmentSteps from "../../driverjs/departmentsSteps"
import initTour from "../../driverjs/initTour"
import api from "../../services/api"
import AddDepartmentModal from "./AddDepartmentModal"
import DeleteDepartmentModal from "./DeleteDepartmentModal"
import EditDepartmentModal from "./EditDepartmentModal"

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

  const handleOpenAddDepartmentModal = () => {
    setAddDepartmentModalOpen(true)
  }

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
            className="btn btn-warning me-2"
            onClick={() => initTour(departmentSteps)}
          >
            <Question />
          </button>

          <button
            id="addDepartment"
            type="button"
            className="btn btn-primary"
            onClick={handleOpenAddDepartmentModal}
            title="Adicionar setor"
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
                <tr id="departmentRow" key={department.id}>
                  <td>{department.name}</td>
                  <td>{department.description}</td>
                  <td>
                    <button
                      id="editDepartment"
                      type="button"
                      className="btn btn-warning mt-2 me-2"
                      onClick={() => handleOpenEditDepartmentModal(department)}
                      title="Editar setor"
                    >
                      <Pencil />
                    </button>

                    <button
                      id="deleteDepartment"
                      type="button"
                      className="btn btn-danger mt-2"
                      onClick={() => handleOpenDeleteDepartmentModal(department)}
                      title="Apagar setor"
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
