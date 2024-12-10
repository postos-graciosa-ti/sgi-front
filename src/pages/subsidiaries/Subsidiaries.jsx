import { useEffect, useState } from "react"
import getSubsidiaries from "../../requests/getSubsidiaries"
import Nav from "../../components/Nav"
import { Pencil, Plus, Question, Trash } from "react-bootstrap-icons"
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

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de filiais</h4>

        <div className="mt-3 mb-3">
          <button
            className="btn btn-warning me-2"
          >
            <Question />
          </button>
          
          <button
            className="btn btn-primary"
            onClick={handleOpenAddModal}
          >
            <Plus />
          </button>
        </div>

        <div className="table-responsive">
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
                      <div className="row">
                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => handleOpenEditModal(subsidiarie)}
                          >
                            <Pencil />
                          </button>
                        </div>

                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleOpenDeleteModal(subsidiarie)}
                          >
                            <Trash />
                          </button>
                        </div>
                      </div>
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
      />

      <DeleteSubsidiarieModal
        selectedSubsidiarie={selectedSubsidiarie}
        deleteSubsidiarieModalOpen={deleteSubsidiarieModalOpen}
        setDeleteSubsidiarieModalOpen={setDeleteSubsidiarieModalOpen}
        setSubsidiaries={setSubsidiaries}
      />
    </>
  )
}

export default Subsidiaries
