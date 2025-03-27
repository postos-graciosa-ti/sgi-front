import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from 'react-select'
import useUserSessionStore from '../../data/userSession'
import useWorkersExperienceTimeStore from "../../data/workersExperienceTime"
import api from '../../services/api'

const CreateWorkerModal = (props) => {
  const {
    createWorkerModalOpen,
    setCreateWorkerModalOpen,
    setWorkersList
  } = props

  const userSession = useUserSessionStore(state => state.userSession)

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const setWorkersFirstReview = useWorkersExperienceTimeStore(state => state.setWorkersFirstReview)

  const setWorkersSecondReview = useWorkersExperienceTimeStore(state => state.setWorkersSecondReview)

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

  const [esocial, setEsocial] = useState()

  const [gendersOptions, setGendersOptions] = useState()

  const [selectedGender, setSelectedGender] = useState()

  const [civilStatusOptions, setCivilStatusOptions] = useState()

  const [selectedCivilStatus, setSelectedCivilStatus] = useState()

  const [street, setStreet] = useState()

  const [streetNumber, setStreetNumber] = useState()

  const [streetComplement, setStreetComplement] = useState()

  const [neighborhoodOptions, setNeighborhoodOptions] = useState()

  const [selectedNeighborhood, setSelectedNeighborhood] = useState()

  const [cep, setSelectedCep] = useState()

  const [citiesOptions, setCitiesOptions] = useState()

  const [selectedCity, setSelectedCity] = useState()

  const [statesOptions, setStatesOptions] = useState()

  const [selectedState, setSelectedState] = useState()

  const [selectedPhone, setSelectedPhone] = useState()

  const [selectedMobile, setSelectedMobile] = useState()

  const [email, setEmail] = useState()

  const [ethnicitiesOptions, setEthnicitiesOptions] = useState()

  const [selectedEthnicity, setSelectedEthnicity] = useState()

  const [birthdate, setBirthdate] = useState()

  const [birthcity, setBirthcity] = useState()

  const [selectedBirthstate, setSelectedBirthstate] = useState()

  const nationalityOptions = [{ value: 1, label: "brasileiro" }]

  const [selectedNationality, setSelectedNationality] = useState()

  const [fathername, setFathername] = useState()

  const [mothername, setMothername] = useState()

  const [hasChildren, setHasChildren] = useState(false)

  const [cpf, setCpf] = useState()

  const [rg, setRg] = useState()

  const [rgIssuingAgency, setRgIssuingAgency] = useState()

  const [rgState, setRgState] = useState()

  const [rgExpeditionDate, setRgExpeditionDate] = useState()

  const [militaryCertNumber, setMilitaryCertNumber] = useState()

  const [pis, setPis] = useState()

  const [pisRegisterDate, setPisRegisterDate] = useState()

  const [votantTitle, setVotantTitle] = useState()

  const [votantZone, setVotantZone] = useState()

  const [votantSession, setVotantSession] = useState()

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

    api
      .get("/genders")
      .then((response) => {
        let options = response?.data.map((gender) => ({ value: gender.id, label: gender.name }))

        setGendersOptions(options)
      })

    api
      .get("/civil-status")
      .then((response) => {
        let options = response?.data.map((civilStatus) => ({ value: civilStatus.id, label: civilStatus.name }))

        setCivilStatusOptions(options)
      })

    api
      .get("/neighborhoods")
      .then((response) => {
        let options = response?.data.map((neighborhood) => ({ value: neighborhood.id, label: neighborhood.name }))

        setNeighborhoodOptions(options)
      })

    api
      .get("/cities")
      .then((response) => {
        let options = response?.data.map((city) => ({ value: city.id, label: city.name }))

        setCitiesOptions(options)
      })

    api
      .get("/states")
      .then((response) => {
        let options = response?.data.map((state) => ({ value: state.id, label: state.name }))

        setStatesOptions(options)
      })

    api
      .get("/ethnicities")
      .then((response) => {
        let options = response?.data.map((ethnicity) => ({ value: ethnicity.id, label: ethnicity.name }))

        setEthnicitiesOptions(options)
      })

  }, [])

  const handleClose = () => {
    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/workers/experience-time-no-first-review`)
      .then((response) => setWorkersFirstReview(response?.data))

    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/workers/experience-time-no-second-review`)
      .then((response) => setWorkersSecondReview(response?.data))

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

    setEsocial()

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
          "timecode": timecode,
          "esocial": esocial,

          "gender_id": selectedGender?.value,
          "civil_status_id": selectedCivilStatus?.value,

          "street": street,
          "street_number": streetNumber,
          "street_complement": streetComplement,
          "neighborhood_id": selectedNeighborhood?.value,
          "cep": cep,
          "city": selectedCity?.value,
          "state": selectedState?.value,

          "phone": selectedPhone,
          "mobile": selectedMobile,
          "email": email,
          "ethnicity_id": selectedEthnicity?.value,

          "birthdate": birthdate,
          "birthcity": birthcity?.value,
          "birthstate": selectedBirthstate?.value,
          "nationality": selectedNationality?.value,

          "fathername": fathername,
          "mothername": mothername,

          "has_children": hasChildren?.value,
          "children_data": "[]",

          "cpf": cpf,
          "rg": rg,
          "rg_issuing_agency": rgIssuingAgency,
          "rg_state": rgState?.value,
          "rg_expedition_date": rgExpeditionDate,

          "military_cert_number": militaryCertNumber,
          "pis": pis,
          "pis_register_date": pisRegisterDate,

          "vontant_title": votantTitle,
          "votant_zone": votantZone,
          "votant_session": votantSession,
        }

        console.log(formData)
        debugger

        api
          .post("/workers", formData)
          .then((response) => {

            console.log(response)
            debugger

            // let newWorkerData = response.data

            // let newWorkerFunc = functionsOptions.find((func) => func.value == newWorkerData.function_id)

            // let newWorkerTurn = turnsOptions.find((turn) => turn.value == newWorkerData.turn_id)

            // let newWorkerCostCenter = costCenterOptions.find((costCenter) => costCenter.value == newWorkerData.cost_center_id)

            // let newWorkerDepartment = departmentsOptions.find((department) => department.value == newWorkerData.department_id)

            // let logStr = `
            //   ${userSession.name} criou ${newWorkerData.name}
            //   (
            //     nome=${newWorkerData.name},
            //     função=${newWorkerFunc.label},
            //     filial=${selectedSubsdiarie.label}),
            //     ativo=sim,
            //     turno=${newWorkerTurn.label},
            //     centro de custo=${newWorkerCostCenter.label},
            //     setor=${newWorkerDepartment.label},
            //     data de admissão=${newWorkerData.admission_date}
            //   )
            // `

            // let logFormData = {
            //   "log_str": logStr,
            //   "happened_at": moment(new Date()).format("HH:mm"),
            //   "happened_at_time": moment(new Date()).format("DD-MM-YYYY"),
            //   "user_id": userSession.id,
            //   "subsidiarie_id": selectedSubsdiarie.value
            // }

            // api
            //   .post(`/logs/subsidiaries/${selectedSubsdiarie.value}/workers`, logFormData)
            //   .then(() => handleClose())
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
          <div>
            <h5>Dados de trabalho</h5>
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="E-Social"
              className="form-control"
              onChange={(e) => setEsocial(e.target.value)}
            />
          </div>

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

          <div>
            <h5>Ficha da contabilidade</h5>
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Genero"
              options={gendersOptions}
              onChange={(value) => setSelectedGender(value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Estado civil"
              options={civilStatusOptions}
              onChange={(value) => setSelectedCivilStatus(value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Logradouro"
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Número"
              onChange={(e) => setStreetNumber(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Complemento"
              onChange={(e) => setStreetComplement(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Bairro"
              options={neighborhoodOptions}
              onChange={(value) => setSelectedNeighborhood(value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="CEP"
              onChange={(e) => setSelectedCep(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Cidade"
              options={citiesOptions}
              onChange={(value) => setSelectedCity(value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Estado"
              options={statesOptions}
              onChange={(value) => setSelectedState(value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Telefone fixo"
              onChange={(e) => setSelectedPhone(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Celular"
              onChange={(e) => setSelectedMobile(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Etnia"
              options={ethnicitiesOptions}
              onChange={(value) => setSelectedEthnicity(value)}
            />
          </div>

          <div className="mb-3">
            <label><b>Data de nascimento</b></label>

            <input
              className="form-control"
              type="date"
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Cidade de nascimento"
              options={citiesOptions}
              onChange={(value) => setBirthcity(value)}
            />
          </div>

          <div className="mb-4">
            <ReactSelect
              placeholder="Estado de nascimento"
              options={statesOptions}
              onChange={(value) => setSelectedBirthstate(value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Nacionalidade"
              options={nationalityOptions}
              onChange={(value) => setSelectedNationality(value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome do pai"
              onChange={(e) => setFathername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome da mãe"
              onChange={(e) => setMothername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Filhos menores de 14?"
              options={[{ value: true, label: "sim" }, { value: false, label: "não" }]}
              onChange={(value) => setHasChildren(value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder='CPF'
              onChange={(e) => setCpf(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder='RG'
              onChange={(e) => setRg(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder='Órgão emissor'
              onChange={(e) => setRgIssuingAgency(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Estado de RG"
              options={statesOptions}
              onChange={(value) => setRgState(value)}
            />
          </div>

          <div className="mb-3">
            <label><b>Data de expedição</b></label>

            <input
              type="date"
              className="form-control"
              onChange={(e) => setRgExpeditionDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Certificado de reservista"
              className="form-control"
              onChange={(e) => setMilitaryCertNumber(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder='PIS'
              className="form-control"
              onChange={(e) => setPis(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder='Data de cadastro de PIS'
              className="form-control"
              onChange={(e) => setPisRegisterDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder='Título de eleitor'
              className="form-control"
              onChange={(e) => setVotantTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder='Zona de eleitor'
              className="form-control"
              onChange={(e) => setVotantZone(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder='Sessão de eleitor'
              className="form-control"
              onChange={(e) => setVotantSession(e.target.value)}
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