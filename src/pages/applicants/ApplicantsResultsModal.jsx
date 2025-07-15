import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'

const opinionsOptions = [
  { value: "aprovado", label: "aprovado" },
  { value: "reprovado", label: "reprovado" },
]

const ApplicantsResultsModal = (props) => {
  const { setApplicantsList, selectedApplicant, applicantsResultsModalOpen, setApplicantsResultsModalOpen, applicantToSearch, setSelectiveProcessModalOpen } = props

  const [rhOpinion, setRhOpinion] = useState()

  const [coordinatorOpinion, setCoordinatorOpinion] = useState()

  const [specialNotation, setSpecialNotation] = useState()

  const [subsidiariesOptions, setSubsidiariesOptions] = useState()

  const [selectedSubsidiarieOption, setSelectedSubsidiarieOption] = useState()

  useEffect(() => {
    api
      .get("/subsidiaries")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setSubsidiariesOptions(options)
      })
  }, [])

  const handleClose = () => {
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
    } else {
      api
        .get("/applicants")
        .then((response) => {
          setApplicantsList(response.data)
        })
    }

    setRhOpinion()

    setCoordinatorOpinion()

    setSelectiveProcessModalOpen(false)

    setApplicantsResultsModalOpen(false)
  }

  const handleSubmit = () => {
    const requestBody = {
      rh_opinion: rhOpinion?.value,
      coordinator_opinion: coordinatorOpinion?.value,
      special_notation: specialNotation,
      talents_bank_subsidiaries: selectedSubsidiarieOption && selectedSubsidiarieOption.length > 0
        ? `[${selectedSubsidiarieOption.map(option => option.value).join(",")}]`
        : "[]"
    }

    api
      .patch(`/applicants/${selectedApplicant?.id}`, requestBody)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={applicantsResultsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>RESULTADOS DE PROCESSO SELETIVO</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">
            PARECER RH
          </label>

          <ReactSelect
            options={opinionsOptions}
            onChange={(option) => setRhOpinion(option)}
            defaultValue={opinionsOptions?.find((option) => option.value == selectedApplicant?.rh_opinion)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            PARECER GERENTE/COORDENADOR
          </label>

          <ReactSelect
            options={opinionsOptions}
            onChange={(option) => setCoordinatorOpinion(option)}
            defaultValue={opinionsOptions?.find((option) => option.value == selectedApplicant?.coordinator_opinion)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            ANOTAÇÃO ESPECIAL (OPCIONAL)
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setSpecialNotation(e.target.value)}
            defaultValue={selectedApplicant?.special_notation}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            BANCO DE TALENTOS (OPCIONAL)
          </label>

          <ReactSelect
            placeholder={""}
            isMulti={true}
            options={subsidiariesOptions}
            onChange={(options) => setSelectedSubsidiarieOption(options)}
            defaultValue={
              subsidiariesOptions?.filter(option =>
                JSON.parse(selectedApplicant.talents_bank_subsidiaries || "[]").includes(option.value)
              )
            }
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>FECHAR</Button>

        <Button variant="success" onClick={handleSubmit}>CONFIRMAR</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ApplicantsResultsModal