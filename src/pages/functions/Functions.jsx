import { useEffect, useState } from "react"
import { Pencil, Plus, Question, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import getFunctions from "../../requests/getFunctions"
import AddFunctionsModal from "./AddFunctionsModal"
import DeleteFunctionsModal from "./DeleteFunctionsModal"
import EditFunctionsModal from "./EditFunctionsModal"

const Functions = () => {
  const [functionsList, setFunctionsList] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

  const [addFunctionModalOpen, setAddFunctionModalOpen] = useState(false)

  const [editFunctionModalOpen, setEditFunctionModalOpen] = useState(false)

  const [deleteFunctionModalOpen, setDeleteFunctionModalOpen] = useState(false)

  useEffect(() => {
    getFunctions()
      .then(response => setFunctionsList(response.data))
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
        <button className="btn btn-warning me-2">
          <Question />
        </button>

        <button className="btn btn-primary" onClick={handleOnClickAddFunction}>
          <Plus />
        </button>

        <div className="table-responsive mt-3">
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
                functionsList?.map((func) => (
                  <tr key={func.id}>
                    <td>{func.name}</td>

                    <td>{func.description}</td>

                    <td>
                      <button className="btn btn-warning me-2 mt-1" onClick={() => handleOnClickEditFunction(func)}>
                        <Pencil />
                      </button>

                      <button className="btn btn-danger me-2 mt-1" onClick={() => handleOnClickDeleteFunction(func)}>
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
      />

      <DeleteFunctionsModal
        deleteFunctionModalOpen={deleteFunctionModalOpen}
        setDeleteFunctionModalOpen={setDeleteFunctionModalOpen}
        selectedFunction={selectedFunction}
        setFunctionsList={setFunctionsList}
      />
    </>
  )
}

export default Functions
