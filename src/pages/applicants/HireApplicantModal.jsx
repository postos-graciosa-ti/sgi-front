import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import useWorkersExperienceTimeStore from "../../data/workersExperienceTime"
import api from '../../services/api'

const HireApplicantModal = (props) => {
  const { hireApplicantModalOpen, setHireApplicantModalOpen, selectedApplicant, setApplicantsList } = props

  const setWorkersFirstReview = useWorkersExperienceTimeStore(state => state.setWorkersFirstReview)

  const setWorkersSecondReview = useWorkersExperienceTimeStore(state => state.setWorkersSecondReview)

  const [subsidiariesList, setSubsidiariesList] = useState()

  const [functionsList, setFunctionsList] = useState()

  const [turnsList, setTurnsList] = useState()

  const [costCenterList, setCostCenterList] = useState()

  const [departmentList, setDepartmentList] = useState()

  const [selectedSubsidiarie, setSelectedSubsidiarie] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

  const [selectedTurn, setSelectedTurn] = useState()

  const [selectedCostCenter, setSelectedCostCenter] = useState()

  const [selectedDepartment, setSelectedDepartment] = useState()

  const [admissionDate, setAdmissionDate] = useState()

  useEffect(() => {
    api
      .get(`/subsidiaries`)
      .then((response) => {
        let options = response.data.map((subsidiarie) => ({ value: subsidiarie.id, label: subsidiarie.name }))

        setSubsidiariesList(options)
      })
  }, [])

  useEffect(() => {
    if (selectedSubsidiarie) {
      api
        .get(`/subsidiaries/${selectedSubsidiarie?.value}/functions`)
        .then((response) => {
          let options = response.data.map((func) => ({ value: func.id, label: func.name }))

          setFunctionsList(options)
        })

      api
        .get(`/subsidiaries/${selectedSubsidiarie?.value}/turns`)
        .then((response) => {
          let options = response.data.map((turn) => ({ value: turn.id, label: turn.name }))

          setTurnsList(options)
        })

      api
        .get(`/cost-center`)
        .then((response) => {
          let options = response.data.map((costCenter) => ({ value: costCenter.id, label: costCenter.name }))

          setCostCenterList(options)
        })

      api
        .get(`/departments`)
        .then((response) => {
          let options = response.data.map((department) => ({ value: department.id, label: department.name }))

          setDepartmentList(options)
        })
    }
  }, [selectedSubsidiarie])

  const handleClose = () => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))

    setSelectedSubsidiarie()

    setSelectedFunction()

    setSelectedTurn()

    setSelectedCostCenter()

    setSelectedDepartment()

    setAdmissionDate()

    setHireApplicantModalOpen(false)
  }

  const handleSubmit = () => {
    debugger

    let requestBody = {
      applicant_id: selectedApplicant?.id,
      worker_data: {
        name: selectedApplicant?.name,
        subsidiarie_id: selectedSubsidiarie.value,
        function_id: selectedFunction.value,
        turn_id: selectedTurn.value,
        cost_center_id: selectedCostCenter.value,
        department_id: selectedDepartment.value,
        admission_date: admissionDate,
        resignation_date: admissionDate,
      },
    }

    api
      .post("/applicants/hire", requestBody)
      .then(() => {
        api
          .get(`/subsidiaries/${selectedSubsidiarie?.value}/workers/experience-time-no-first-review`)
          .then((response) => setWorkersFirstReview(response?.data))

        api
          .get(`/subsidiaries/${selectedSubsidiarie?.value}/workers/experience-time-no-second-review`)
          .then((response) => setWorkersSecondReview(response?.data))

        handleClose()
      })
  }

  return (
    <Modal
      show={hireApplicantModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Efetivar</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="mb-1"><b>Filial</b></label>

          <ReactSelect
            placeholder={""}
            options={subsidiariesList}
            onChange={(value) => setSelectedSubsidiarie(value)}
          />
        </div>

        <div className="mb-3">
          <label className="mb-1"><b>Função</b></label>

          <ReactSelect
            placeholder={""}
            options={functionsList}
            onChange={(value) => setSelectedFunction(value)}
          />
        </div>

        <div className="mb-3">
          <label className="mb-1"><b>Turno</b></label>

          <ReactSelect
            placeholder={""}
            options={turnsList}
            onChange={(value) => setSelectedTurn(value)}
          />
        </div>

        <div className="mb-3">
          <label className="mb-1"><b>Centro de custos</b></label>

          <ReactSelect
            placeholder={""}
            options={costCenterList}
            onChange={(value) => setSelectedCostCenter(value)}
          />
        </div>

        <div className="mb-3">
          <label className="mb-1"><b>Setor</b></label>

          <ReactSelect
            placeholder={""}
            options={departmentList}
            onChange={(value) => setSelectedDepartment(value)}
          />
        </div>

        <div className="mb-3">
          <label className="mb-1"><b>Data de admissão</b></label>

          <input
            type='date'
            className="form-control"
            onChange={(e) => setAdmissionDate(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Concluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default HireApplicantModal