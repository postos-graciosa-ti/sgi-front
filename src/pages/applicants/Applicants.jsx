import { useEffect, useState } from "react"
import { Filter, Trash } from "react-bootstrap-icons"
import ReactSelect from "react-select"
import Nav from "../../components/Nav"
import api from "../../services/api"
import ConfirmApplicantDeleteModal from "./ConfirmApplicantDeleteModal"
import ExamsCorrectionModal from "./ExamsCorrectionModal"
import ExamsEmissionModal from "./ExamsEmissionModal"
import HireApplicantModal from "./HireApplicantModal"
import NewApplicantModal from "./NewApplicantModal"
import ProcessChecklistModal from "./ProcessChecklistModal"
import RedirectToModal from "./RedirectToModal"
import SelectiveProcessModal from "./SelectiveProcessModal"
import SpecialNotationModal from "./SpecialNotationModal"
import TalentsDatabaseModal from "./TalentsDatabaseModal"

const Applicants = () => {
  const [applicantToSearch, setApplicantToSearch] = useState()

  const [applicantsOptions, setApplicantsOptions] = useState()

  const [applicantsList, setApplicantsList] = useState()

  const [selectedApplicant, setSelectedApplicant] = useState()

  const [examsEmissionModalOpen, setExamsEmissionModalOpen] = useState(false)

  const [examsCorrectionModalOpen, setExamsCorrectionModalOpen] = useState(false)

  const [newApplicantModalOpen, setNewApplicantModalOpen] = useState(false)

  const [selectiveProcessModalOpen, setSelectiveProcessModalOpen] = useState(false)

  const [hireApplicantModalOpen, setHireApplicantModalOpen] = useState(false)

  const [confirmApplicantDeleteModalOpen, setConfirmApplicantDeleteModalOpen] = useState(false)

  const [redirectToModalOpen, setRedirectToModalOpen] = useState(false)

  const [specialNotatioModalOpen, setSpecialNotatioModalOpen] = useState(false)

  const [processChecklistModalOpen, setProcessChecklistModalOpen] = useState(false)

  const [talentsDatabaseModalOpen, setTalentsDatabaseModalOpen] = useState(false)

  const [defaultTalentsDatabaseTurn, setDefaultTalentsDatabaseTurn] = useState()

  const [defaultTalentsDatabaseFunction, setDefaultTalentsDatabaseFunction] = useState()

  useEffect(() => {
    api
      .get("/applicants")
      .then((response) => {
        let options = []

        options.push({ value: "todos", label: "Todos" })

        response.data.map((option) => {
          options.push({ value: option.id, label: option.name })
        })

        setApplicantsOptions(options)

        setApplicantsList(response.data)
      })
  }, [])

  useEffect(() => {
    if (applicantToSearch) {
      if (applicantToSearch.value == "todos") {
        api
          .get("/applicants")
          .then((response) => {
            setApplicantsList(response.data)
          })
      } else {
        api
          .get("/applicants")
          .then((response) => {
            const applicantToShow = response.data.filter((applicant) => applicant.id == applicantToSearch.value)

            setApplicantsList(applicantToShow)
          })
      }
    }
  }, [applicantToSearch])

  const handleOpenNewApplicantModal = () => {
    setSelectedApplicant(null)

    setNewApplicantModalOpen(true)
  }

  const handleOpenSelectiveProcessModal = (applicant) => {
    setSelectedApplicant(applicant)

    setSelectiveProcessModalOpen(true)
  }

  const handleInactivateApplicant = (applicant) => {
    let requestBody = {
      is_active: false
    }

    api
      .patch(`/applicants/${applicant?.id}`, requestBody)
      .then(() => {
        api
          .get("/applicants")
          .then((response) => setApplicantsList(response.data))
      })
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div className="row">
          <div className="col-auto">
            <button className="btn btn-primary" onClick={handleOpenNewApplicantModal}>
              NOVO CANDIDATO
            </button>
          </div>

          <div className="col">
            <ReactSelect
              options={applicantsOptions}
              defaultValue={{ value: "todos", label: "Todos" }}
              onChange={(value) => setApplicantToSearch(value)}
            />
          </div>
        </div>

        <div className="mt-3">
          {
            applicantsList && applicantsList.map((applicant) => (
              <div className="card mb-3 shadow">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <h5 className="card-title mb-0">{applicant.name}</h5>

                    <div>
                      <button className="btn btn-primary me-2" onClick={() => handleOpenSelectiveProcessModal(applicant)}>
                        <Filter />
                      </button>

                      <button className="btn btn-danger" type="button" aria-label="Excluir" onClick={() => handleInactivateApplicant(applicant)}>
                        <Trash />
                      </button>
                    </div>
                  </div>
                </div>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item p-3">
                    {
                      applicant.rh_opinion == null && applicant.coordinator_opinion == null && (
                        <span className="badge text-bg-success p-2 me-2">EM PROCESSO</span>
                      )
                    }

                    {
                      applicant.rh_opinion == "aprovado" && applicant.coordinator_opinion == "aprovado" && (
                        <span className="badge text-bg-success p-2 me-2">APROVADO</span>
                      )
                    }

                    {
                      applicant.selective_process_status == "efetivado" && (
                        <span className="badge text-bg-success p-2 me-2">EFETIVADO</span>
                      )
                    }

                    {
                      applicant.rh_opinion == "reprovado" && applicant.coordinator_opinion == "reprovado" && (
                        <span className="badge text-bg-success p-2 me-2">REPROVADO</span>
                      )
                    }

                    {
                      applicant.special_notation && (
                        <span className="badge text-bg-success p-2 me-2">ANOTAÇÃO ESPECIAL</span>
                      )
                    }

                    {
                      applicant.email_feedback === "sim" && (
                        <span className="badge text-bg-success p-2 me-2">RETORNO E-MAIL</span>
                      )
                    }

                    {
                      applicant.whatsapp_feedback === "sim" && (
                        <span className="badge text-bg-success p-2 me-2">RETORNO WHATSAPP</span>
                      )
                    }
                  </li>
                </ul>
              </div>
            ))
          }
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
        setSelectedApplicant={setSelectedApplicant}
        applicantToSearch={applicantToSearch}
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

      <RedirectToModal
        redirectToModalOpen={redirectToModalOpen}
        setRedirectToModalOpen={setRedirectToModalOpen}
      />

      <SpecialNotationModal
        specialNotatioModalOpen={specialNotatioModalOpen}
        setSpecialNotatioModalOpen={setSpecialNotatioModalOpen}
        selectedApplicant={selectedApplicant}
        setSelectedApplicant={setSelectedApplicant}
        setApplicantsList={setApplicantsList}
      />

      <ProcessChecklistModal
        processChecklistModalOpen={processChecklistModalOpen}
        setProcessChecklistModalOpen={setProcessChecklistModalOpen}
        applicantId={selectedApplicant?.id}
      />

      <TalentsDatabaseModal
        selectedApplicant={selectedApplicant}
        talentsDatabaseModalOpen={talentsDatabaseModalOpen}
        setTalentsDatabaseModalOpen={setTalentsDatabaseModalOpen}
        defaultTalentsDatabaseTurn={defaultTalentsDatabaseTurn}
        setDefaultTalentsDatabaseTurn={setDefaultTalentsDatabaseTurn}
        defaultTalentsDatabaseFunction={defaultTalentsDatabaseFunction}
        setDefaultTalentsDatabaseFunction={setDefaultTalentsDatabaseFunction}
      />
    </>
  )
}

export default Applicants