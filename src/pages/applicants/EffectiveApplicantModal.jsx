import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'

const EffectiveApplicantModal = (props) => {
  const { selectedApplicant, effectiveApplicantModalOpen, setEffectiveApplicantModalOpen } = props

  const [subsidiariesOptions, setSubsidiariesOptions] = useState()

  const [selectedSubsidiarieOption, setSelectedSubsidiarieOption] = useState()

  const [functionsOptions, setFunctionsOptions] = useState()

  const [selectedFunctionOption, setSelectedFunctionOption] = useState()

  const [turnsOptions, setTurnsOptions] = useState()

  const [selectedTurnOption, setSelectedTurnOption] = useState()

  const [costCenterOptions, setCostCenterOptions] = useState()

  const [selectedCostCenterOption, setSelectedCostCenterOption] = useState()

  const [departmentOptions, setDepartmentOptions] = useState()

  const [selectedDepartmentOption, setSelectedDepartmentOption] = useState()

  const [admissionDate, setAdmissionDate] = useState()

  useEffect(() => {
    api
      .get("/subsidiaries")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setSubsidiariesOptions(options)
      })
  }, [selectedApplicant])

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsidiarieOption?.value}/functions`)
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setFunctionsOptions(options)
      })

    api
      .get(`/subsidiaries/${selectedSubsidiarieOption?.value}/turns`)
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setTurnsOptions(options)
      })

    api
      .get(`/cost-center`)
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setCostCenterOptions(options)
      })

    api
      .get(`/departments`)
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setDepartmentOptions(options)
      })
  }, [selectedSubsidiarieOption])

  const handleClose = () => {
    setSubsidiariesOptions()

    setSelectedSubsidiarieOption()

    setFunctionsOptions()

    setSelectedFunctionOption()

    setTurnsOptions()

    setSelectedTurnOption()

    setCostCenterOptions()

    setSelectedCostCenterOption()

    setDepartmentOptions()

    setSelectedDepartmentOption()

    setAdmissionDate()

    setEffectiveApplicantModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      subsidiarie_id: selectedSubsidiarieOption?.value,
      function_id: selectedFunctionOption?.value,
      turn_id: selectedTurnOption?.value,
      cost_center_id: selectedCostCenterOption?.value,
      department_id: selectedDepartmentOption?.value,
      admission_date: admissionDate,
    }

    api
      .post(`/hire-applicants/${selectedApplicant?.id}`, requestBody)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={effectiveApplicantModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>EFETIVAR CANDIDATO</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">
            FILIAL
          </label>

          <ReactSelect
            placeholder={""}
            options={subsidiariesOptions}
            onChange={(option) => setSelectedSubsidiarieOption(option)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            FUNÇÃO
          </label>

          <ReactSelect
            placeholder={""}
            options={functionsOptions}
            onChange={(option) => setSelectedFunctionOption(option)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            TURNO
          </label>

          <ReactSelect
            placeholder={""}
            options={turnsOptions}
            onChange={(option) => setSelectedTurnOption(option)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            CENTRO DE CUSTOS
          </label>

          <ReactSelect
            placeholder={""}
            options={costCenterOptions}
            onChange={(option) => setSelectedCostCenterOption(option)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            SETOR
          </label>

          <ReactSelect
            placeholder={""}
            options={departmentOptions}
            onChange={(option) => setSelectedDepartmentOption(option)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            DATA DE ADMISSÃO
          </label>

          <input type="date" className="form-control" onChange={(e) => setAdmissionDate(e.target.value)} />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>FECHAR</Button>

        <Button variant="success" onClick={handleSubmit}>CONFIRMAR</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EffectiveApplicantModal