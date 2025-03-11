import { useEffect, useState } from "react"
import { Pencil, Plus, Question, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import mountDriver from "../../driverjs/mountDriver"
import subsidiarieSteps from "../../driverjs/subsidiarieSteps"
import api from "../../services/api"
import AddSubsidiarieModal from "./AddSubsidiarieModal"
import DeleteSubsidiarieModal from "./DeleteSubsidiarieModal"
import EditSubsidiarieModal from "./EditSubsidiarieModal"

const Subsidiaries = () => {
  const [subsidiaries, setSubsidiaries] = useState()

  const [selectedSubsidiarie, setSelectedSubsidiarie] = useState()

  const [addSubsidiarieModalOpen, setAddSubsidiarieModalOpen] = useState(false)

  const [editSubsidiarieModalOpen, setEditSubsidiarieModalOpen] = useState(false)

  const [deleteSubsidiarieModalOpen, setDeleteSubsidiarieModalOpen] = useState(false)

  useEffect(() => {
    api
      .get("/subsidiaries")
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

  const initTour = () => {
    const driverObj = mountDriver(subsidiarieSteps)

    driverObj.drive()
  }

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de filiais</h4>

        <div className="mt-3 mb-3">
          <button
            className="btn btn-warning me-2"
            onClick={initTour}
          >
            <Question />
          </button>

          <button
            id="addSubsidiarie"
            className="btn btn-primary"
            onClick={handleOpenAddModal}
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
                  <tr id="subsidiarieRow" key={subsidiarie.id}>
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
                        id="editSubsidiarie"
                        title="Editar filial"
                      >
                        <Pencil />
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger mt-1 ms-1"
                        onClick={() => handleOpenDeleteModal(subsidiarie)}
                        id="deleteSubsidiarie"
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
