import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from 'react-select'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'
import moment from 'moment'
import axios from 'axios'

const CreateWorkerModal = (props) => {
  const {
    createWorkerModalOpen,
    setCreateWorkerModalOpen,
    setWorkersList
  } = props

  const userSession = useUserSessionStore(state => state.userSession)

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [enrolment, setEnrolment] = useState()

  const [salesCode, setSalesCode] = useState()

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

  const [picture, setPicture] = useState()

  const [timecode, setTimecode] = useState()

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsdiarie.value}/functions`)
      .then((response) => {
        let functionsData = response.data

        let options = []

        functionsData && functionsData.map((data) => {
          options.push({ "value": data.id, "label": data.name })
        })

        setFunctionsOptions(options)
      })

    api
      .get(`/subsidiaries/${selectedSubsdiarie.value}/turns`)
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

    setPicture()

    setTimecode()

    setCreateWorkerModalOpen(false)
  }

  const handleSubmit = () => {
    let cloudinaryEndpoint = import.meta.env.VITE_CLOUDINARY_ENDPOINT

    const cloudinaryFormData = new FormData()

    cloudinaryFormData.append("file", picture)

    cloudinaryFormData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET)

    axios
      .post(cloudinaryEndpoint, cloudinaryFormData)
      .then((cloudinaryResponse) => {
        let formData = {
          "name": name,
          "function_id": selectedFunction.value,
          "subsidiarie_id": selectedSubsdiarie.value,
          "is_active": true,
          "turn_id": selectedTurn.value,
          "cost_center_id": selectedCostCenter.value,
          "department_id": selectedDepartment.value,
          "admission_date": admissionDate,
          "resignation_date": admissionDate,
          "enrolment": enrolment,
          "sales_code": salesCode,
          "picture": cloudinaryResponse?.data.secure_url,
          "timecode": timecode
        }

        console.log(formData.admission_date)
        debugger

        api
          .post("/workers", formData)
          .then((response) => {
            let newWorkerData = response.data

            let newWorkerFunc = functionsOptions.find((func) => func.value == newWorkerData.function_id)

            let newWorkerTurn = turnsOptions.find((turn) => turn.value == newWorkerData.turn_id)

            let newWorkerCostCenter = costCenterOptions.find((costCenter) => costCenter.value == newWorkerData.cost_center_id)

            let newWorkerDepartment = departmentsOptions.find((department) => department.value == newWorkerData.department_id)

            let logStr = `
              ${userSession.name} criou ${newWorkerData.name}
              (
                nome=${newWorkerData.name},
                função=${newWorkerFunc.label},
                filial=${selectedSubsdiarie.label}),
                ativo=sim,
                turno=${newWorkerTurn.label},
                centro de custo=${newWorkerCostCenter.label},
                setor=${newWorkerDepartment.label},
                data de admissão=${newWorkerData.admission_date}
              )
            `

            let logFormData = {
              "log_str": logStr,
              "happened_at": moment(new Date()).format("HH:mm"),
              "happened_at_time": moment(new Date()).format("DD-MM-YYYY"),
              "user_id": userSession.id,
              "subsidiarie_id": selectedSubsdiarie.value
            }

            api
              .post(`/logs/subsidiaries/${selectedSubsdiarie.value}/workers`, logFormData)
              .then(() => handleClose())
          })
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
              placeholder="Matrícula"
              className="form-control"
              onChange={(e) => setEnrolment(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Código de vendas"
              className="form-control"
              onChange={(e) => setSalesCode(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Código de ponto"
              className="form-control"
              onChange={(e) => setTimecode(e.target.value)}
            />
          </div>

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
              type="date"
              className="form-control"
              onChange={(e) => setAdmissionDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              onChange={(e) => setPicture(e.target.files[0])}
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