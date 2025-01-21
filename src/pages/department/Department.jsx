import { useEffect, useState } from "react";
import { Pencil, Plus, Trash } from "react-bootstrap-icons";
import Nav from "../../components/Nav";
import api from "../../services/api";
import AddDepartmentModal from "./AddDepartmentModal";

const Department = () => {
  const [departmentsList, setDepartmentsList] = useState([]);
  const [addDepartmentModalOpen, setAddDepartmentModalOpen] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/departments");
        setDepartmentsList(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

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
    </>
  );
};

export default Department;