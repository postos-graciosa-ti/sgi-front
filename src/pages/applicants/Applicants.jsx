import { useEffect, useState } from "react"
import { Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import ConfirmApplicantDeleteModal from "./ConfirmApplicantDeleteModal"
import NewApplicantModal from "./NewApplicantModal"
import SelectiveProcessModal from "./SelectiveProcessModal"

const Applicants = () => {
  const userSession = useUserSessionStore((state) => state.userSession)

  const [applicantsList, setApplicantsList] = useState()

  const [selectedApplicant, setSelectedApplicant] = useState()

  const [newApplicantModalOpen, setNewApplicantModalOpen] = useState(false)

  const [selectiveProcessModalOpen, setSelectiveProcessModalOpen] = useState(false)

  const [confirmApplicantDeleteModalOpen, setConfirmApplicantDeleteModalOpen] = useState(false)

  useEffect(() => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))
  }, [])

  const handleOpenNewApplicantModal = () => {
    setNewApplicantModalOpen(true)
  }

  const handleOpenSelectiveProcessModal = (applicant) => {
    setSelectedApplicant(applicant)

    setSelectiveProcessModalOpen(true)
  }

  const handleOpenConfirmApplicantDeleteModal = (applicant) => {
    setSelectedApplicant(applicant)

    setConfirmApplicantDeleteModalOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div>
          <button className="btn btn-primary me-1 mb-3">
            Emissor de provas
          </button>

          <button className="btn btn-primary me-1 mb-3">
            Corretor de provas
          </button>

          <button className="btn btn-primary mb-3" onClick={handleOpenNewApplicantModal}>
            Novo candidato
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nome</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                applicantsList && applicantsList.map((applicant) => (
                  <tr key={applicant.id}>
                    <td>{applicant.name}</td>

                    <td>
                      <button
                        className="btn btn-primary"
                        disabled={!(userSession?.id === applicant.created_by || userSession?.id === applicant.redirect_to)}
                        onClick={() => handleOpenSelectiveProcessModal(applicant)}
                      >
                        Processo seletivo
                      </button>

                      <button
                        className="btn btn-danger ms-2"
                        disabled={!(userSession?.id === applicant.created_by || userSession?.id === applicant.redirect_to)}
                        onClick={() => handleOpenConfirmApplicantDeleteModal(applicant)}
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

      <NewApplicantModal
        newApplicantModalOpen={newApplicantModalOpen}
        setNewApplicantModalOpen={setNewApplicantModalOpen}
        setApplicantsList={setApplicantsList}
      />

      <SelectiveProcessModal
        selectiveProcessModalOpen={selectiveProcessModalOpen}
        setSelectiveProcessModalOpen={setSelectiveProcessModalOpen}
        selectedApplicant={selectedApplicant}
        setApplicantsList={setApplicantsList}
      />

      <ConfirmApplicantDeleteModal
        confirmApplicantDeleteModalOpen={confirmApplicantDeleteModalOpen}
        setConfirmApplicantDeleteModalOpen={setConfirmApplicantDeleteModalOpen}
        selectedApplicant={selectedApplicant}
        setApplicantsList={setApplicantsList}
      />
    </>
  )
}

export default Applicants