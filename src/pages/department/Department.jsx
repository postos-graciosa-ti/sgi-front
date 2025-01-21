import { useEffect, useState } from "react"
import { Pencil, Plus, Question, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import api from "../../services/api"

const Department = () => {
  const [departmentsList, setDepartmentsList] = useState()

  useEffect(() => {
    api
      .get("/departments")
      .then((response) => setDepartmentsList(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <div>
          <h4>Cadastro de setores</h4>
        </div>

        <div className="mt-3 mb-3">
          <button
            id="help"
            type="button"
            className="btn btn-warning me-2"
          // onClick={setTour}
          >
            <Question />
          </button>

          <button
            id="addTurn"
            type="button"
            className="btn btn-primary"
          // onClick={handleOpenAddTurnModal}
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
              {
                departmentsList && departmentsList.map((department) => (
                  <tr>
                    <td>{department.name}</td>

                    <td>{department.description}</td>

                    <td>
                      <button
                        id="editTurn"
                        type="button"
                        className="btn btn-warning mt-2 me-2"
                      // onClick={() => handleOpenEditTurnModal(turn)}
                      >
                        <Pencil />
                      </button>

                      <button
                        id="deleteTurn"
                        type="button"
                        className="btn btn-danger mt-2"
                      // onClick={() => handleOpenDeleteTurnModal(turn)}
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
    </>
  )
}

export default Department
