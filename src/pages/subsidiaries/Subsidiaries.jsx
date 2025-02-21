import { useEffect, useState } from "react"
import getSubsidiaries from "../../requests/getSubsidiaries"
import Nav from "../../components/Nav"
import { Pencil, Plus, Question, Trash } from "react-bootstrap-icons"
import mountTour from "../../functions/mountTour"
import AddSubsidiarieModal from "./AddSubsidiarieModal"
import EditSubsidiarieModal from "./EditSubsidiarieModal"
import DeleteSubsidiarieModal from "./DeleteSubsidiarieModal"

const Subsidiaries = () => {
  const [subsidiaries, setSubsidiaries] = useState()

  const [selectedSubsidiarie, setSelectedSubsidiarie] = useState()

  const [addSubsidiarieModalOpen, setAddSubsidiarieModalOpen] = useState(false)

  const [editSubsidiarieModalOpen, setEditSubsidiarieModalOpen] = useState(false)

  const [deleteSubsidiarieModalOpen, setDeleteSubsidiarieModalOpen] = useState(false)

  useEffect(() => {
    getSubsidiaries()
      .then((response) => setSubsidiaries(response.data))
  }, [])

  const handleOpenAddModal = () => {
    setAddSubsidiarieModalOpen(true)
  }

  const handleOpenEditModal = (subsidiarie) => {
    setSelectedSubsidiarie(subsidiarie)

    setEditSubsidiarieModalOpen(true)
  }

  const handleOpenDeleteModal = (subsidiarie) => {
    setSelectedSubsidiarie(subsidiarie)

    setDeleteSubsidiarieModalOpen(true)
  }

  const setTour = () => {
    let driverObj = mountTour('/subsidiaries')

    driverObj.drive()
  }

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de filiais</h4>

        <div className="mt-3 mb-3">
          {/* <button
            className="btn btn-warning me-2"
            onClick={setTour}
            id="help"
          >
            <Question />
          </button> */}

          <button
            className="btn btn-primary"
            onClick={handleOpenAddModal}
            id="add-subsidiarie"
            title="Adicionar filial"
          >
            <Plus />
          </button>
        </div>

        <div id="table-container" className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  Nome
                </th>

                <th>
                  Endereço
                </th>

                <th>
                  Telefone
                </th>

                <th>
                  E-mail
                </th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                subsidiaries && subsidiaries.map((subsidiarie) => (
                  <tr>
                    <td>
                      {subsidiarie.name}
                    </td>

                    <td>
                      {subsidiarie.adress}
                    </td>

                    <td>
                      {subsidiarie.phone}
                    </td>

                    <td>
                      {subsidiarie.email}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-warning mt-1 ms-1"
                        onClick={() => handleOpenEditModal(subsidiarie)}
                        id="edit-subsidiarie"
                        title="Editar filial"
                      >
                        <Pencil />
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger mt-1 ms-1"
                        onClick={() => handleOpenDeleteModal(subsidiarie)}
                        id="delete-subsidiarie"
                        title="Apagar filial"
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

      <AddSubsidiarieModal
        addSubsidiarieModalOpen={addSubsidiarieModalOpen}
        setAddSubsidiarieModalOpen={setAddSubsidiarieModalOpen}
        setSubsidiaries={setSubsidiaries}
      />

      <EditSubsidiarieModal
        selectedSubsidiarie={selectedSubsidiarie}
        editSubsidiarieModalOpen={editSubsidiarieModalOpen}
        setEditSubsidiarieModalOpen={setEditSubsidiarieModalOpen}
        setSubsidiaries={setSubsidiaries}
        setSelectedSubsidiarie={setSelectedSubsidiarie}
      />

      <DeleteSubsidiarieModal
        selectedSubsidiarie={selectedSubsidiarie}
        deleteSubsidiarieModalOpen={deleteSubsidiarieModalOpen}
        setDeleteSubsidiarieModalOpen={setDeleteSubsidiarieModalOpen}
        setSubsidiaries={setSubsidiaries}
        setSelectedSubsidiarie={setSelectedSubsidiarie}
      />
    </>
  )
}

export default Subsidiaries
