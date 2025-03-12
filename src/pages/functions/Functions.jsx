import { useEffect, useState } from "react"
import { Pencil, Plus, Question, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import functionsSteps from "../../driverjs/functionsSteps"
import initTour from "../../driverjs/initTour"
import api from "../../services/api"
import AddFunctionsModal from "./AddFunctionsModal"
import DeleteFunctionsModal from "./DeleteFunctionsModal"
import EditFunctionsModal from "./EditFunctionsModal"

const Functions = () => {
  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [functionsList, setFunctionsList] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

  const [addFunctionModalOpen, setAddFunctionModalOpen] = useState(false)

  const [editFunctionModalOpen, setEditFunctionModalOpen] = useState(false)

  const [deleteFunctionModalOpen, setDeleteFunctionModalOpen] = useState(false)

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie.value}/functions`)
      .then((response) => {
        setFunctionsList(response.data)
      })
  }, [])

  const handleOnClickAddFunction = () => {
    setAddFunctionModalOpen(true)
  }

  const handleOnClickEditFunction = (func) => {
    setSelectedFunction(func)

    setEditFunctionModalOpen(true)
  }

  const handleOnClickDeleteFunction = (func) => {
    setSelectedFunction(func)

    setDeleteFunctionModalOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div className="mt-3 mb-3">
          <h4>Cadastro de funções</h4>
        </div>

        <button
          className="btn btn-warning me-2"
          onClick={() => initTour(functionsSteps)}
        >
          <Question />
        </button>

        <button
          id="addFunction"
          className="btn btn-primary"
          onClick={handleOnClickAddFunction}
          title="Adicionar função"
        >
          <Plus />
        </button>

        <div className="table-responsive mt-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nome</th>

                <th>Descrição</th>

                <th>Quantidade ideal por turno</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                functionsList?.map((func) => (
                  <tr key={func.id} id="functionsRow">
                    <td>{func.name}</td>

                    <td>{func.description}</td>

                    <td>{func.ideal_quantity || "indefenido"}</td>

                    <td>
                      <button
                        id="editFunction"
                        className="btn btn-warning me-2 mt-1"
                        onClick={() => handleOnClickEditFunction(func)}
                        title="Editar função"
                      >
                        <Pencil />
                      </button>

                      <button
                        id="deleteFunction"
                        className="btn btn-danger me-2 mt-1"
                        onClick={() => handleOnClickDeleteFunction(func)}
                        title="Apagar função"
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

      <AddFunctionsModal
        addFunctionModalOpen={addFunctionModalOpen}
        setAddFunctionModalOpen={setAddFunctionModalOpen}
        setFunctionsList={setFunctionsList}
      />

      <EditFunctionsModal
        editFunctionModalOpen={editFunctionModalOpen}
        setEditFunctionModalOpen={setEditFunctionModalOpen}
        selectedFunction={selectedFunction}
        setFunctionsList={setFunctionsList}
        setSelectedFunction={setSelectedFunction}
      />

      <DeleteFunctionsModal
        deleteFunctionModalOpen={deleteFunctionModalOpen}
        setDeleteFunctionModalOpen={setDeleteFunctionModalOpen}
        selectedFunction={selectedFunction}
        setFunctionsList={setFunctionsList}
        setSelectedFunction={setSelectedFunction}
      />
    </>
  )
}

export default Functions
