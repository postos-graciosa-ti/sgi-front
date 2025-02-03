import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from 'react-select'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const CreateWorkerModal = (props) => {
  const {
    createWorkerModalOpen,
    setCreateWorkerModalOpen,
    setWorkersList
  } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [name, setName] = useState()

  const [functionsOptions, setFunctionsOptions] = useState([])
  const [selectedFunction, setSelectedFunction] = useState()

  const [turnsOptions, setTurnsOptions] = useState([])
  const [selectedTurn, setSelectedTurn] = useState()

  const [costCenterOptions, setCostCenterOptions] = useState([])
  const [selectedCostCenter, setSelectedCostCenter] = useState()

  const [departmentsOptions, setDepartmentsOptions] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState()

  const [admissionDate, setAdmissionDate] = useState()

  useEffect(() => {
    api
      .get("/functions")
      .then((response) => {
        let functionsData = response.data

        let options = []

        functionsData && functionsData.map((data) => {
          options.push({ "value": data.id, "label": data.name })
        })

        setFunctionsOptions(options)
      })

    api
      .get("/turns")
      .then((response) => {
        let turnsData = response.data

        let options = []

        turnsData && turnsData.map((data) => {
          options.push({ "value": data.id, "label": data.name })
        })

        setTurnsOptions(options)
      })

    api
      .get("/cost-center")
      .then((response) => {
        let costCenterData = response.data

        let options = []

        costCenterData && costCenterData.map((data) => {
          options.push({ "value": data.id, "label": data.name })
        })

        setCostCenterOptions(options)
      })

    api
      .get("/departments")
      .then((response) => {
        let departmentsData = response.data

        let options = []

        departmentsData && departmentsData.map((data) => {
          options.push({ "value": data.id, "label": data.name })
        })

        setDepartmentsOptions(options)
      })

  }, [])

  const handleClose = () => {
    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
      .then((response) => setWorkersList(response.data))

    setName()

    setSelectedFunction()

    setSelectedTurn()

    setSelectedTurn()

    setSelectedCostCenter()

    setSelectedDepartment()

    setAdmissionDate()

    setCreateWorkerModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      "name": name,
      "function_id": selectedFunction.value,
      "subsidiarie_id": selectedSubsdiarie.value,
      "is_active": true,
      "turn_id": selectedTurn.value,
      "cost_center_id": selectedCostCenter.value,
      "department_id": selectedDepartment.value,
      "admission_date": admissionDate,
      "resignation_date": admissionDate
    }

    api
      .post("/workers", formData)
      .then((response) => {
        console.log(response)

        handleClose()
      })
  }

  return (
    <>
      <Modal
        show={createWorkerModalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar colaborador</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Nome"
              className='form-control'
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <ReactSelect
              placeholder="Função"
              options={functionsOptions}
              onChange={(value) => setSelectedFunction(value)}
            />
          </div>

          <div className='mb-3'>
            <ReactSelect
              placeholder="Turnos"
              options={turnsOptions}
              onChange={(value) => setSelectedTurn(value)}
            />
          </div>

          <div className='mb-3'>
            <ReactSelect
              placeholder="C. de custos"
              options={costCenterOptions}
              onChange={(value) => setSelectedCostCenter(value)}
            />
          </div>

          <div className='mb-3'>
            <ReactSelect
              placeholder="Setor"
              options={departmentsOptions}
              onChange={(value) => setSelectedDepartment(value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Admissão"
              className='form-control'
              onChange={(e) => setAdmissionDate(e.target.value)}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Fechar
          </Button>

          <Button variant="success" onClick={handleSubmit}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateWorkerModal