import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from 'react-select'
import useUserSessionStore from '../../data/userSession'
import useWorkersExperienceTimeStore from "../../data/workersExperienceTime"
import api from '../../services/api'
import loadCivilStatusOptions from "../../utils/loadCivilStatusOptions"
import loadCostCenterOptions from "../../utils/loadCostCenterOptions"
import loadDepartmentOptions from '../../utils/loadDepartmentsOptions'
import loadFunctionsOptions from '../../utils/loadFunctionsOptions'
import loadGendersOptions from "../../utils/loadGendersOptions"
import loadTurnsOptions from '../../utils/loadTurnsOptions'

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

  // Informações gerais
  const [enrolment, setEnrolment] = useState('')
  const [salesCode, setSalesCode] = useState('')
  const [name, setName] = useState('')
  const [functionsOptions, setFunctionsOptions] = useState([])
  const [selectedFunction, setSelectedFunction] = useState(null)
  const [turnsOptions, setTurnsOptions] = useState([])
  const [selectedTurn, setSelectedTurn] = useState(null)
  const [costCenterOptions, setCostCenterOptions] = useState([])
  const [selectedCostCenter, setSelectedCostCenter] = useState(null)
  const [departmentsOptions, setDepartmentsOptions] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [admissionDate, setAdmissionDate] = useState('')
  const [picture, setPicture] = useState(null)
  const [timecode, setTimecode] = useState('')
  const [esocial, setEsocial] = useState('')

  // Ficha da contabilidade
  const [gendersOptions, setGendersOptions] = useState([])
  const [selectedGender, setSelectedGender] = useState(null)
  const [civilStatusOptions, setCivilSatusOptions] = useState([])
  const [selectedCivilStatus, setSelectedCivilStatus] = useState(null)

  // Endereço residencial
  const [statesOptions, setStatesOptions] = useState([])
  const [selectedState, setSelectedState] = useState(null)
  const [citiesOptions, setCitiesOptions] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)
  const [neighborhoodOptions, setNeighborhoodOptions] = useState([])
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null)
  const [street, setStreet] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [addressComplement, setAddressComplement] = useState('')
  const [cep, setCep] = useState('')

  // Dados pessoais
  const [phone, setPhone] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [ethnicityOptions, setEthnicityOptions] = useState([])
  const [selectedEthnicity, setSelectedEthnicity] = useState(null)
  const [birthdate, setBirthdate] = useState('')
  const [nationality, setNationality] = useState(null)
  const [birthstate, setBirthstate] = useState(null)
  const [birthcityOptions, setBirthcityOptions] = useState([])
  const [birthcity, setBirthcity] = useState(null)
  const [mothername, setMothername] = useState('')
  const [fathername, setFathername] = useState('')
  const [children, setChildren] = useState(null)

  // Documentos
  const [cpf, setCpf] = useState('')
  const [rg, setRg] = useState('')
  const [issuingBody, setIssuingBody] = useState('')
  const [dateIssue, setDateIssue] = useState('')
  const [militaryCert, setMilitaryCert] = useState('')
  const [pisNumber, setPisNumber] = useState('')
  const [pisDateRegister, setPisDateRegister] = useState('')
  const [electoralTitle, setElectoralTitle] = useState('')
  const [electoralZone, setElectoralZone] = useState('')
  const [electoralSection, setElectoralSection] = useState('')
  const [ctps, setCtps] = useState('')
  const [ctpsSeries, setCtpsSeries] = useState('')
  const [ctpsUf, setCtpsUf] = useState('')
  const [ctpsIssueDate, setCtpsIssueDate] = useState('')
  const [cnh, setCnh] = useState('')
  const [cnhCategory, setCnhCategory] = useState('')
  const [cnhIssueDate, setCnhIssueDate] = useState('')
  const [cnhExpiration, setCnhExpiration] = useState('')

  // Perguntas adicionais
  const [firstJob, setFirstJob] = useState(null)
  const [formerEmployee, setFormerEmployee] = useState(null)
  const [unionContribution, setUnionContribution] = useState(null)
  const [unemploymentInsurance, setUnemploymentInsurance] = useState(null)
  const [previousExperience, setPreviousExperience] = useState(null)

  // Informações da função
  const [monthlySalary, setMonthlySalary] = useState('')
  const [hourlySalary, setHourlySalary] = useState('')
  const [proportionalSalary, setProportionalSalary] = useState('')
  const [hazardousExposure, setHazardousExposure] = useState(null)

  // Escolaridade
  const [educationLevel, setEducationLevel] = useState(null)

  useEffect(() => {
    loadFunctionsOptions(selectedSubsdiarie, setFunctionsOptions)
    loadTurnsOptions(selectedSubsdiarie, setTurnsOptions)
    loadCostCenterOptions(setCostCenterOptions)
    loadDepartmentOptions(setDepartmentsOptions)
    loadGendersOptions(setGendersOptions)
    loadCivilStatusOptions(setCivilSatusOptions)

    api
      .get("/states")
      .then((response) => {
        let options = response?.data.map((state) => ({
          value: state.id,
          label: state.sail
        }))
        setStatesOptions(options)
      })

    api
      .get("/ethnicities")
      .then((response) => {
        let options = response?.data.map((ethnicity) => ({
          value: ethnicity.id,
          label: ethnicity.name
        }))
        setEthnicityOptions(options)
      })
  }, [])

  useEffect(() => {
    if (selectedState) {
      api
        .get(`/states/${selectedState?.value}/cities`)
        .then((response) => {
          let options = response?.data.map((city) => ({
            value: city.id,
            label: city.name
          }))
          setCitiesOptions(options)
        })
    }
  }, [selectedState])

  useEffect(() => {
    if (selectedCity) {
      api
        .get(`/cities/${selectedCity?.value}/neighborhoods`)
        .then((response) => {
          let options = response?.data.map((neighborhood) => ({
            value: neighborhood.id,
            label: neighborhood.name
          }))
          setNeighborhoodOptions(options)
        })
    }
  }, [selectedCity])

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

    // Reset all states
    setName('')
    setSelectedFunction(null)
    setSelectedTurn(null)
    setSelectedCostCenter(null)
    setSelectedDepartment(null)
    setAdmissionDate('')
    setPicture(null)
    setTimecode('')
    setEsocial('')
    setSelectedGender(null)
    setSelectedCivilStatus(null)
    setSelectedState(null)
    setSelectedCity(null)
    setSelectedNeighborhood(null)
    setStreet('')
    setHouseNumber('')
    setAddressComplement('')
    setCep('')
    setPhone('')
    setMobile('')
    setEmail('')
    setSelectedEthnicity(null)
    setBirthdate('')
    setNationality(null)
    setBirthstate(null)
    setBirthcity(null)
    setMothername('')
    setFathername('')
    setChildren(null)
    setCpf('')
    setRg('')
    setIssuingBody('')
    setDateIssue('')
    setMilitaryCert('')
    setPisNumber('')
    setPisDateRegister('')
    setElectoralTitle('')
    setElectoralZone('')
    setElectoralSection('')
    setCtps('')
    setCtpsSeries('')
    setCtpsUf('')
    setCtpsIssueDate('')
    setCnh('')
    setCnhCategory('')
    setCnhIssueDate('')
    setCnhExpiration('')
    setFirstJob(null)
    setFormerEmployee(null)
    setUnionContribution(null)
    setUnemploymentInsurance(null)
    setPreviousExperience(null)
    setMonthlySalary('')
    setHourlySalary('')
    setProportionalSalary('')
    setHazardousExposure(null)
    setEducationLevel(null)

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
        let submitData = {
          "esocial": esocial,
          "enrolment": enrolment,
          "sales_code": salesCode,
          "timecode": timecode,
          "name": name,
          "function_id": selectedFunction?.value,
          "turn_id": selectedTurn?.value,
          "cost_center_id": selectedCostCenter?.value,
          "department_id": selectedDepartment?.value,
          "admission_date": admissionDate,
          "picture": cloudinaryResponse?.data.secure_url,
          "gender_id": selectedGender?.value,
          "civil_status": selectedCivilStatus?.value,
          "state_id": selectedState?.value,
          "city_id": selectedCity?.value,
          "neighborhood_id": selectedNeighborhood?.value,
          "street": street,
          "house_number": houseNumber,
          "address_complement": addressComplement,
          "cep": cep,
          "phone": phone,
          "mobile": mobile,
          "email": email,
          "ethnicity_id": selectedEthnicity?.value,
          "birthdate": birthdate,
          "nationality": nationality?.value,
          "birthstate": birthstate?.value,
          "birthcity": birthcity?.value,
          "mothername": mothername,
          "fathername": fathername,
          "cpf": cpf,
          "children": children?.value,
          "rg": rg,
          "issuing_body": issuingBody,
          "date_issue": dateIssue,
          "militaryCert": militaryCert,
          "pisNumber": pisNumber,
          "pisDateRegister": pisDateRegister,
          "electoralTitle": electoralTitle,
          "electoralZone": electoralZone,
          "electoralSection": electoralSection,
          "ctps": ctps,
          "ctpsSeries": ctpsSeries,
          "ctpsUf": ctpsUf,
          "ctpsIssueDate": ctpsIssueDate,
          "cnh": cnh,
          "cnhCategory": cnhCategory,
          "cnhIssueDate": cnhIssueDate,
          "cnhExpiration": cnhExpiration,
          "firstJob": firstJob?.value,
          "formerEmployee": formerEmployee?.value,
          "unionContribution": unionContribution?.value,
          "unemploymentInsurance": unemploymentInsurance?.value,
          "previousExperience": previousExperience?.value,
          "monthlySalary": monthlySalary,
          "hourlySalary": hourlySalary,
          "proportionalSalary": proportionalSalary,
          "hazardousExposure": hazardousExposure?.value,
          "educationLevel": educationLevel?.value
        }

        console.log(submitData)
        debugger

        api
        .post("/workers", submitData)
        .then((response) => {
          console.log(response)
          debugger
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
            <h5>Informações gerais</h5>
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="E-Social"
              className="form-control"
              value={esocial}
              onChange={(e) => setEsocial(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Matrícula"
              className="form-control"
              value={enrolment}
              onChange={(e) => setEnrolment(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Código de vendas"
              className="form-control"
              value={salesCode}
              onChange={(e) => setSalesCode(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Código de ponto"
              className="form-control"
              value={timecode}
              onChange={(e) => setTimecode(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Nome"
              className='form-control'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <ReactSelect
              placeholder="Função"
              options={functionsOptions}
              value={selectedFunction}
              onChange={(value) => setSelectedFunction(value)}
            />
          </div>

          <div className='mb-3'>
            <ReactSelect
              placeholder="Turnos"
              options={turnsOptions}
              value={selectedTurn}
              onChange={(value) => setSelectedTurn(value)}
            />
          </div>

          <div className='mb-3'>
            <ReactSelect
              placeholder="C. de custos"
              options={costCenterOptions}
              value={selectedCostCenter}
              onChange={(value) => setSelectedCostCenter(value)}
            />
          </div>

          <div className='mb-3'>
            <ReactSelect
              placeholder="Setor"
              options={departmentsOptions}
              value={selectedDepartment}
              onChange={(value) => setSelectedDepartment(value)}
            />
          </div>

          <div className="mb-3">
            <label><b>Data de admissão</b></label>
            <input
              type="date"
              className="form-control"
              value={admissionDate}
              onChange={(e) => setAdmissionDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label><b>Foto</b></label>
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
              value={selectedGender}
              onChange={(value) => setSelectedGender(value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Estado civil"
              options={civilStatusOptions}
              value={selectedCivilStatus}
              onChange={(value) => setSelectedCivilStatus(value)}
            />
          </div>

          <div>
            <h5>Endereço residencial</h5>
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Estado"
              options={statesOptions}
              value={selectedState}
              onChange={(value) => setSelectedState(value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Cidade"
              options={citiesOptions}
              value={selectedCity}
              onChange={(value) => setSelectedCity(value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Bairro"
              options={neighborhoodOptions}
              value={selectedNeighborhood}
              onChange={(value) => setSelectedNeighborhood(value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Logradouro"
              className="form-control"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Número"
              className="form-control"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Complemento"
              className="form-control"
              value={addressComplement}
              onChange={(e) => setAddressComplement(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="CEP"
              className="form-control"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </div>

          <div>
            <h5>Dados pessoais</h5>
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Telefone fixo"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Celular"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Etnia"
              options={ethnicityOptions}
              value={selectedEthnicity}
              onChange={(value) => setSelectedEthnicity(value)}
            />
          </div>

          <div className="mb-3">
            <label><b>Data de nascimento</b></label>
            <input
              type="date"
              className="form-control"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Nacionalidade"
              options={[
                { "value": 1, "label": "brasileiro" },
              ]}
              value={nationality}
              onChange={(value) => setNationality(value)}
            />
          </div>

          <div className="mb-4">
            <ReactSelect
              placeholder="Estado de nascimento"
              options={statesOptions}
              value={birthstate}
              onChange={(value) => setBirthstate(value)}
            />
          </div>

          <div className="mb-4">
            <ReactSelect
              placeholder="Cidade de nascimento"
              options={birthcityOptions}
              value={birthcity}
              onChange={(value) => setBirthcity(value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Nome da mãe"
              className="form-control"
              value={mothername}
              onChange={(e) => setMothername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Nome do pai"
              className="form-control"
              value={fathername}
              onChange={(e) => setFathername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Possui filhos menores de 14 anos?"
              options={[
                { value: "true", label: "sim" },
                { value: "false", label: "não" },
              ]}
              value={children}
              onChange={(value) => setChildren(value)}
            />
          </div>

          <div>
            <h5>Documentos</h5>
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="RG"
              value={rg}
              onChange={(e) => setRg(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Órgão emissor"
              value={issuingBody}
              onChange={(e) => setIssuingBody(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label><b>Data de expedição</b></label>
            <input
              type="date"
              className="form-control"
              placeholder="Data de expedição"
              value={dateIssue}
              onChange={(e) => setDateIssue(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Escolaridade"
              options={[
                { value: "fundamental_incompleto", label: "Fundamental Incompleto" },
                { value: "fundamental_completo", label: "Fundamental Completo" },
                { value: "medio_incompleto", label: "Médio Incompleto" },
                { value: "medio_completo", label: "Médio Completo" },
                { value: "superior_incompleto", label: "Superior Incompleto" },
                { value: "superior_completo", label: "Superior Completo" },
                { value: "pos_graduacao", label: "Pós-graduação" },
                { value: "mestrado", label: "Mestrado" },
                { value: "doutorado", label: "Doutorado" }
              ]}
              value={educationLevel}
              onChange={(value) => setEducationLevel(value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Certificado de reservista"
              value={militaryCert}
              onChange={(e) => setMilitaryCert(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Número do PIS"
              value={pisNumber}
              onChange={(e) => setPisNumber(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              placeholder="Data de cadastro do PIS"
              value={pisDateRegister}
              onChange={(e) => setPisDateRegister(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Título de eleitor"
              value={electoralTitle}
              onChange={(e) => setElectoralTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Zona"
              value={electoralZone}
              onChange={(e) => setElectoralZone(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Sessão"
              value={electoralSection}
              onChange={(e) => setElectoralSection(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="CTPS"
              value={ctps}
              onChange={(e) => setCtps(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Série"
              value={ctpsSeries}
              onChange={(e) => setCtpsSeries(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="UF"
              value={ctpsUf}
              onChange={(e) => setCtpsUf(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Data de emissão"
              value={ctpsIssueDate}
              onChange={(e) => setCtpsIssueDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="CNH"
              value={cnh}
              onChange={(e) => setCnh(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Categoria"
              value={cnhCategory}
              onChange={(e) => setCnhCategory(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Data de emissão"
              value={cnhIssueDate}
              onChange={(e) => setCnhIssueDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Validade"
              value={cnhExpiration}
              onChange={(e) => setCnhExpiration(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Primerio emprego?"
              options={[
                { value: "true", label: "sim" },
                { value: "false", label: "não" },
              ]}
              value={firstJob}
              onChange={(value) => setFirstJob(value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Já foi funcionário da empresa?"
              options={[
                { value: "true", label: "sim" },
                { value: "false", label: "não" },
              ]}
              value={formerEmployee}
              onChange={(value) => setFormerEmployee(value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Recebeu contribuição sindical nesse ano?"
              options={[
                { value: "true", label: "sim" },
                { value: "false", label: "não" },
              ]}
              value={unionContribution}
              onChange={(value) => setUnionContribution(value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Está recebendo seguro desemprego?"
              options={[
                { value: "true", label: "sim" },
                { value: "false", label: "não" },
              ]}
              value={unemploymentInsurance}
              onChange={(value) => setUnemploymentInsurance(value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Possui experiência anterior na função requerida?"
              options={[
                { value: "true", label: "sim" },
                { value: "false", label: "não" },
              ]}
              value={previousExperience}
              onChange={(value) => setPreviousExperience(value)}
            />
          </div>

          <div>
            <h5>Função</h5>
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Salário mensal"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Salário por hora"
              value={hourlySalary}
              onChange={(e) => setHourlySalary(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Salário proporcional a jornada"
              value={proportionalSalary}
              onChange={(e) => setProportionalSalary(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Funcionário ficará exposto a agente nocivo?"
              options={[
                { value: "true", label: "sim" },
                { value: "false", label: "não" },
              ]}
              value={hazardousExposure}
              onChange={(value) => setHazardousExposure(value)}
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