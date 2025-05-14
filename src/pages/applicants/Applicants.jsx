import { useEffect, useState } from "react"
import { Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import ConfirmApplicantDeleteModal from "./ConfirmApplicantDeleteModal"
import ExamsCorrectionModal from "./ExamsCorrectionModal"
import ExamsEmissionModal from "./ExamsEmissionModal"
import HireApplicantModal from "./HireApplicantModal"
import NewApplicantModal from "./NewApplicantModal"
import SelectiveProcessModal from "./SelectiveProcessModal"

const Applicants = () => {
  const userSession = useUserSessionStore((state) => state.userSession)

  const [applicantsList, setApplicantsList] = useState()

  const [selectedApplicant, setSelectedApplicant] = useState()

  const [examsEmissionModalOpen, setExamsEmissionModalOpen] = useState(false)

  const [examsCorrectionModalOpen, setExamsCorrectionModalOpen] = useState(false)

  const [newApplicantModalOpen, setNewApplicantModalOpen] = useState(false)

  const [selectiveProcessModalOpen, setSelectiveProcessModalOpen] = useState(false)

  const [hireApplicantModalOpen, setHireApplicantModalOpen] = useState(false)

  const [confirmApplicantDeleteModalOpen, setConfirmApplicantDeleteModalOpen] = useState(false)

  useEffect(() => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))
  }, [])

  const handleOpenExamsEmissionModal = () => {
    setExamsEmissionModalOpen(true)
  }

  const handleOpenExamsCorrectionModal = () => {
    setExamsCorrectionModalOpen(true)
  }

  const handleOpenNewApplicantModal = () => {
    setNewApplicantModalOpen(true)
  }

  const handleOpenSelectiveProcessModal = (applicant) => {
    setSelectedApplicant(applicant)

    setSelectiveProcessModalOpen(true)
  }

  const handleOpenHireApplicantModal = (applicant) => {
    setSelectedApplicant(applicant)

    setHireApplicantModalOpen(true)
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
          <button className="btn btn-primary me-1 mb-3" onClick={handleOpenExamsEmissionModal}>
            Emitir provas
          </button>

          <button className="btn btn-primary me-1 mb-3" onClick={handleOpenExamsCorrectionModal}>
            Corrigir provas
          </button>

          <button className="btn btn-primary mb-3" onClick={handleOpenNewApplicantModal}>
            Novo candidato
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th></th>

                <th>Nome</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                applicantsList && applicantsList.map((applicant, i) => (
                  <tr key={applicant.id} className={applicant.is_aproved == true && "table-success" || "table-light"}>
                    <td className="text-muted text-center">#0{i + 1}</td>

                    <td>{applicant.name}</td>

                    <td>
                      <button
                        className="btn btn-primary me-2"
                        disabled={!(userSession?.id === applicant.created_by || userSession?.id === applicant.redirect_to)}
                        onClick={() => handleOpenSelectiveProcessModal(applicant)}
                      >
                        Processo seletivo
                      </button>

                      {
                        applicant.is_aproved && (
                          <button className="btn btn-primary" onClick={() => handleOpenHireApplicantModal(applicant)}>
                            Efetivar
                          </button>
                        )
                      }

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

      <ExamsEmissionModal
        examsEmissionModalOpen={examsEmissionModalOpen}
        setExamsEmissionModalOpen={setExamsEmissionModalOpen}
      />

      <ExamsCorrectionModal
        examsCorrectionModalOpen={examsCorrectionModalOpen}
        setExamsCorrectionModalOpen={setExamsCorrectionModalOpen}
      />

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

      <HireApplicantModal
        hireApplicantModalOpen={hireApplicantModalOpen}
        setHireApplicantModalOpen={setHireApplicantModalOpen}
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