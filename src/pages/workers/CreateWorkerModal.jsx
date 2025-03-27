// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'
// import ReactSelect from 'react-select'
// import useUserSessionStore from '../../data/userSession'
// import useWorkersExperienceTimeStore from "../../data/workersExperienceTime"
// import api from '../../services/api'

// const CreateWorkerModal = (props) => {
//   const {
//     createWorkerModalOpen,
//     setCreateWorkerModalOpen,
//     setWorkersList
//   } = props

//   const userSession = useUserSessionStore(state => state.userSession)

//   const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

//   const setWorkersFirstReview = useWorkersExperienceTimeStore(state => state.setWorkersFirstReview)

//   const setWorkersSecondReview = useWorkersExperienceTimeStore(state => state.setWorkersSecondReview)

//   const [enrolment, setEnrolment] = useState()

//   const [salesCode, setSalesCode] = useState()

//   const [name, setName] = useState()

//   const [functionsOptions, setFunctionsOptions] = useState([])

//   const [selectedFunction, setSelectedFunction] = useState()

//   const [turnsOptions, setTurnsOptions] = useState([])

//   const [gendersOptions, setGendersOptions] = useState()

//   const [civilStatusOptions, setCivilSatusOptions] = useState()

//   const [statesOptions, setStatesOptions] = useState()

//   const [citiesOptions, setCitiesOptions] = useState()

//   const [neighborhoodOptions, setNeighborhoodOptions] = useState()

//   const [selectedTurn, setSelectedTurn] = useState()

//   const [costCenterOptions, setCostCenterOptions] = useState([])

//   const [selectedCostCenter, setSelectedCostCenter] = useState()

//   const [departmentsOptions, setDepartmentsOptions] = useState([])

//   const [ethnicityOptions, setEthnicityOptions] = useState()

//   const [birthcityOptions, setBirthcityOptions] = useState()

//   const [selectedDepartment, setSelectedDepartment] = useState()

//   const [admissionDate, setAdmissionDate] = useState()

//   const [picture, setPicture] = useState()

//   const [timecode, setTimecode] = useState()

//   const [esocial, setEsocial] = useState()

//   const [selectedState, setSelectedState] = useState()

//   const [selectedCity, setSelectedCity] = useState()

//   const [selectedNeighborhood, setSelectedNeighborhood] = useState()

//   const [selectedGender, setSelectedGender] = useState()

//   const [selectedCivilStatus, setSelectedCivilStatus] = useState()

//   const [street, setStreet] = useState()

//   const [houseNumber, setHouseNumber] = useState()

//   const [addressComplement, setAddressComplement] = useState()

//   const [cep, setCep] = useState()

//   const [phone, setPhone] = useState()

//   const [mobile, setMobile] = useState()

//   const [email, setEmail] = useState()

//   const [selectedEthnicity, setSelectedEthnicity] = useState()

//   const [birthdate, setBirthdate] = useState()

//   // const [nationality, setNationality] = useState()

//   // const [birthstate, setBirthstate] = useState()

//   // const [birthcity, setBirthcity] = useState()

//   const [mothername, setMothername] = useState()

//   const [fathername, setFathername] = useState()

//   const [cpf, setCpf] = useState()

//   const [children, setChildren] = useState()

//   const [rg, setRg] = useState()

//   const [issuingBody, setIssuingBody] = useState()

//   const [dateIssue, setDateIssue] = useState()

//   const [militaryCert, setMilitaryCert] = useState()

//   const [pisNumber, setPisNumber] = useState()

//   const [pisDateRegister, setPisDateRegister] = useState()

//   useEffect(() => {
//     api
//       .get(`/subsidiaries/${selectedSubsdiarie.value}/functions`)
//       .then((response) => {
//         let functionsData = response.data

//         let options = []

//         functionsData && functionsData.map((data) => {
//           options.push({ "value": data.id, "label": data.name })
//         })

//         setFunctionsOptions(options)
//       })

//     api
//       .get(`/subsidiaries/${selectedSubsdiarie.value}/turns`)
//       .then((response) => {
//         let turnsData = response.data

//         let options = []

//         turnsData && turnsData.map((data) => {
//           options.push({ "value": data.id, "label": data.name })
//         })

//         setTurnsOptions(options)
//       })

//     api
//       .get("/cost-center")
//       .then((response) => {
//         let costCenterData = response.data

//         let options = []

//         costCenterData && costCenterData.map((data) => {
//           options.push({ "value": data.id, "label": data.name })
//         })

//         setCostCenterOptions(options)
//       })

//     api
//       .get("/departments")
//       .then((response) => {
//         let departmentsData = response.data

//         let options = []

//         departmentsData && departmentsData.map((data) => {
//           options.push({ "value": data.id, "label": data.name })
//         })

//         setDepartmentsOptions(options)
//       })

//     api
//       .get(`/genders`)
//       .then((response) => {
//         let options = response?.data.map((gender) => ({
//           value: gender.id,
//           label: gender.name
//         }))

//         setGendersOptions(options)
//       })

//     api
//       .get(`/civil-status`)
//       .then((response) => {
//         let options = response?.data.map((civilStatus) => ({
//           value: civilStatus.id,
//           label: civilStatus.name
//         }))

//         setCivilSatusOptions(options)
//       })

//     api
//       .get("/states")
//       .then((response) => {
//         let options = response?.data.map((state) => ({
//           value: state.id,
//           label: state.sail
//         }))

//         setStatesOptions(options)
//       })

//     api
//       .get("/ethnicities")
//       .then((response) => {
//         let options = response?.data.map((ethnicity) => ({
//           value: ethnicity.id,
//           label: ethnicity.name
//         }))

//         setEthnicityOptions(options)
//       })

//   }, [])

//   useEffect(() => {
//     if (selectedState) {
//       api
//         .get(`/states/${selectedState?.value}/cities`)
//         .then((response) => {
//           let options = response?.data.map((city) => ({
//             value: city.id,
//             label: city.name
//           }))

//           setCitiesOptions(options)
//         })
//     }

//   }, [selectedState])

//   useEffect(() => {
//     if (selectedCity) {
//       api
//         .get(`/cities/${selectedCity?.value}/neighborhoods`)
//         .then((response) => {
//           console.log(response)

//           let options = response?.data.map((neighborhood) => ({
//             value: neighborhood.id,
//             label: neighborhood.name
//           }))

//           setNeighborhoodOptions(options)
//         })
//     }

//   }, [selectedCity])

//   const handleClose = () => {
//     api
//       .get(`/subsidiaries/${selectedSubsdiarie?.value}/workers/experience-time-no-first-review`)
//       .then((response) => setWorkersFirstReview(response?.data))

//     api
//       .get(`/subsidiaries/${selectedSubsdiarie?.value}/workers/experience-time-no-second-review`)
//       .then((response) => setWorkersSecondReview(response?.data))

//     api
//       .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
//       .then((response) => setWorkersList(response.data))

//     setName()

//     setSelectedFunction()

//     setSelectedTurn()

//     setSelectedTurn()

//     setSelectedCostCenter()

//     setSelectedDepartment()

//     setAdmissionDate()

//     setPicture()

//     setTimecode()

//     setEsocial()

//     setCreateWorkerModalOpen(false)
//   }

//   const handleSubmit = () => {
//     let cloudinaryEndpoint = import.meta.env.VITE_CLOUDINARY_ENDPOINT

//     const cloudinaryFormData = new FormData()

//     cloudinaryFormData.append("file", picture)

//     cloudinaryFormData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET)

//     axios
//       .post(cloudinaryEndpoint, cloudinaryFormData)
//       .then((cloudinaryResponse) => {

//         let submitData = {
//           "esocial": esocial,
//           "enrolment": enrolment,
//           "sales_code": salesCode,
//           "timecode": timecode,
//           "name": name,
//           "function_id": selectedFunction?.value,
//           "turn_id": selectedTurn?.value,
//           "cost_center_id": selectedCostCenter?.value,
//           "department_id": selectedDepartment?.value,
//           "admission_date": admissionDate,
//           "picture": cloudinaryResponse?.data.secure_url,
//           "gender_id": selectedGender?.value,
//           "civil_status": selectedCivilStatus?.value,
//           "state_id": selectedState?.value,
//           "city_id": selectedCity?.value,
//           "neighborhood_id": selectedNeighborhood?.value,
//           "street": street,
//           "house_number": houseNumber,
//           "address_complement": addressComplement,
//           "cep": cep,
//           "phone": phone,
//           "mobile": mobile,
//           "email": email,
//           "ethnicity_id": selectedEthnicity,
//           "birthdate": birthdate,
//           // "birthplace": birthplace,
//           // "nationality": nationality,
//           // "birthstate": birthstate,
//           // "birthcity": birthcity,
//           "mothername": mothername,
//           "fathername": fathername,
//           "cpf": cpf,
//           "children": children,
//           "rg": rg,
//           "issuing_body": issuingBody,
//           "date_issue": dateIssue,
//           "militaryCert": militaryCert,
//           "pisNumber": pisNumber,
//           "pisDateRegister": pisDateRegister,
//         }

//         console.log(submitData)
//         debugger

//         // let formData = {
//         //   "name": name,
//         //   "function_id": selectedFunction.value,
//         //   "subsidiarie_id": selectedSubsdiarie.value,
//         //   "is_active": true,
//         //   "turn_id": selectedTurn.value,
//         //   "cost_center_id": selectedCostCenter.value,
//         //   "department_id": selectedDepartment.value,
//         //   "admission_date": admissionDate,
//         //   "resignation_date": admissionDate,
//         //   "enrolment": enrolment,
//         //   "sales_code": salesCode,
//         //   "picture": cloudinaryResponse?.data.secure_url,
//         //   "timecode": timecode,
//         //   "esocial": esocial
//         // }

//         // api
//         //   .post("/workers", formData)
//         //   .then((response) => {
//         //     let newWorkerData = response.data

//         //     let newWorkerFunc = functionsOptions.find((func) => func.value == newWorkerData.function_id)

//         //     let newWorkerTurn = turnsOptions.find((turn) => turn.value == newWorkerData.turn_id)

//         //     let newWorkerCostCenter = costCenterOptions.find((costCenter) => costCenter.value == newWorkerData.cost_center_id)

//         //     let newWorkerDepartment = departmentsOptions.find((department) => department.value == newWorkerData.department_id)

//         //     let logStr = `
//         //       ${userSession.name} criou ${newWorkerData.name}
//         //       (
//         //         nome=${newWorkerData.name},
//         //         função=${newWorkerFunc.label},
//         //         filial=${selectedSubsdiarie.label}),
//         //         ativo=sim,
//         //         turno=${newWorkerTurn.label},
//         //         centro de custo=${newWorkerCostCenter.label},
//         //         setor=${newWorkerDepartment.label},
//         //         data de admissão=${newWorkerData.admission_date}
//         //       )
//         //     `

//         //     let logFormData = {
//         //       "log_str": logStr,
//         //       "happened_at": moment(new Date()).format("HH:mm"),
//         //       "happened_at_time": moment(new Date()).format("DD-MM-YYYY"),
//         //       "user_id": userSession.id,
//         //       "subsidiarie_id": selectedSubsdiarie.value
//         //     }

//         //     api
//         //       .post(`/logs/subsidiaries/${selectedSubsdiarie.value}/workers`, logFormData)
//         //       .then(() => handleClose())
//         //   })

//       })
//   }

//   return (
//     <>
//       <Modal
//         show={createWorkerModalOpen}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Adicionar colaborador</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <div>
//             <h5>Informações gerais</h5>
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="E-Social"
//               className="form-control"
//               onChange={(e) => setEsocial(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Matrícula"
//               className="form-control"
//               onChange={(e) => setEnrolment(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Código de vendas"
//               className="form-control"
//               onChange={(e) => setSalesCode(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Código de ponto"
//               className="form-control"
//               onChange={(e) => setTimecode(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Nome"
//               className='form-control'
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           <div className='mb-3'>
//             <ReactSelect
//               placeholder="Função"
//               options={functionsOptions}
//               onChange={(value) => setSelectedFunction(value)}
//             />
//           </div>

//           <div className='mb-3'>
//             <ReactSelect
//               placeholder="Turnos"
//               options={turnsOptions}
//               onChange={(value) => setSelectedTurn(value)}
//             />
//           </div>

//           <div className='mb-3'>
//             <ReactSelect
//               placeholder="C. de custos"
//               options={costCenterOptions}
//               onChange={(value) => setSelectedCostCenter(value)}
//             />
//           </div>

//           <div className='mb-3'>
//             <ReactSelect
//               placeholder="Setor"
//               options={departmentsOptions}
//               onChange={(value) => setSelectedDepartment(value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label><b>Data de admissão</b></label>

//             <input
//               type="date"
//               className="form-control"
//               onChange={(e) => setAdmissionDate(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label><b>Foto</b></label>

//             <input
//               type="file"
//               className="form-control"
//               onChange={(e) => setPicture(e.target.files[0])}
//             />
//           </div>

//           <div>
//             <h5>Ficha da contabilidade</h5>
//           </div>

//           <div className="mb-3">
//             <ReactSelect
//               placeholder="Genero"
//               options={gendersOptions}
//               onChange={(value) => setSelectedGender(value)}
//             />
//           </div>

//           <div className="mb-3">
//             <ReactSelect
//               placeholder="Estado civil"
//               options={civilStatusOptions}
//               onChange={(value) => setSelectedCivilStatus(value)}
//             />
//           </div>

//           <div>
//             <h5>Endereço residencial</h5>
//           </div>

//           <div className="mb-3">
//             <ReactSelect
//               placeholder="Estado"
//               options={statesOptions}
//               onChange={(value) => setSelectedState(value)}
//             />
//           </div>

//           <div className="mb-3">
//             <ReactSelect
//               placeholder="Cidade"
//               options={citiesOptions}
//               onChange={(value) => setSelectedCity(value)}
//             />
//           </div>

//           <div className="mb-3">
//             <ReactSelect
//               placeholder="Bairro"
//               options={neighborhoodOptions}
//               onChange={(value) => setSelectedNeighborhood(value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Logradouro"
//               className="form-control"
//               onChange={(e) => setStreet(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Número"
//               className="form-control"
//               onChange={(e) => setHouseNumber(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Complemento"
//               className="form-control"
//               onChange={(e) => setAddressComplement(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="CEP"
//               className="form-control"
//               onChange={(e) => setCep(e.target.value)}
//             />
//           </div>

//           <div>
//             <h5>Dados pessoais</h5>
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Telefone fixo"
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Celular"
//               onChange={(e) => setMobile(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="email"
//               className="form-control"
//               placeholder="E-mail"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <ReactSelect
//               placeholder="Etnia"
//               options={ethnicityOptions}
//               onChange={(value) => setSelectedEthnicity(value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label><b>Data de nascimento</b></label>

//             <input
//               type="date"
//               className="form-control"
//               onChange={(e) => setBirthdate(e.target.value)}
//             />
//           </div>

//           {/* <div className="mb-3">
//             <ReactSelect
//               placeholder="Nacionalidade"
//               options={[
//                 { "value": 1, "label": "brasileiro" },
//               ]}
//               onChange={(value) => setNationality(value)}
//             />
//           </div>

//           <div className="mb-4">
//             <ReactSelect
//               placeholder="Estado de nascimento"
//               options={statesOptions}
//               onChange={(value) => setBirthstate(value)}
//             />
//           </div>

//           <div className="mb-4">
//             <ReactSelect
//               placeholder="Cidade de nascimento"
//               options={birthcityOptions}
//               onChange={(value) => setBirthcity(value)}
//             />
//           </div> */}

//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Nome da mãe"
//               className="form-control"
//               onChange={(e) => setMothername(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Nome do pai"
//               className="form-control"
//               onChange={(e) => setFathername(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <ReactSelect
//               placeholder="Possui filhos menores de 14 anos?"
//               options={[
//                 { value: "true", label: "sim" },
//                 { value: "false", label: "não" },
//               ]}
//               onChange={(value) => setChildren(value)}
//             />
//           </div>

//           <div>
//             <h5>Documentos</h5>
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="CPF"
//               onChange={(e) => setCpf(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="RG"
//               onChange={(e) => setRg(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Órgão emissor"
//               onChange={(e) => setIssuingBody(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label><b>Data de expedição</b></label>

//             <input
//               type="date"
//               className="form-control"
//               placeholder="Data de expedição"
//               onChange={(e) => setDateIssue(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <ReactSelect
//               placeholder="Escolaridade"
//               options={[
//                 { "value": "true", "label": "sim" },
//                 { "value": "false", "label": "não" },
//               ]}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Certificado de reservista"
//               onChange={(e) => setMilitaryCert(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Número do PIS"
//               onChange={(e) => setPisNumber(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="date"
//               className="form-control"
//               placeholder="Data de cadastro do PIS"
//               onChange={(e) => setPisDateRegister(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Título de eleitor"
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Zona"
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Sessão"
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="CTPS"
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Série"
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="UF"
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Data de emissão"
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="CNH"
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Categoria"
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Data de emissão"
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Validade"
//             />
//           </div>

//           <div className="mb-3">
//             <ReactSelect
//               placeholder="Primerio emprego?"
//             />
//           </div>

//           <div className="mb-3">
//             <ReactSelect
//               placeholder="Já foi funcionário da empresa?"
//             />
//           </div>

//           <div className="mb-3">
//             <ReactSelect
//               placeholder="Recebeu contribuição sindical nesse ano?"
//             />
//           </div>

//           <div className="mb-3">
//             <ReactSelect
//               placeholder="Está recebendo seguro desemprego?"
//             />
//           </div>

//           <div className="mb-3">
//             <ReactSelect
//               placeholder="Possui experiência anterior na função requerida?"
//             />
//           </div>

//           <div>
//             <h5>Função</h5>
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Salário mensal"
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Salário por hora"
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Salário proporcional a jornada"
//             />
//           </div>

//           <div className="mb-3">
//             <ReactSelect
//               placeholder="Funcionário ficará exposto a agente nocivo?"
//             />
//           </div>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="light" onClick={handleClose}>
//             Fechar
//           </Button>

//           <Button variant="success" onClick={handleSubmit}>
//             Adicionar
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

// export default CreateWorkerModal

import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from 'react-select'
import useUserSessionStore from '../../data/userSession'
import useWorkersExperienceTimeStore from "../../data/workersExperienceTime"
import api from '../../services/api'
import loadFunctionsOptions from '../../utils/loadFunctionsOptions'

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

  // General Information
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

  // Accounting Information
  const [gendersOptions, setGendersOptions] = useState([])
  const [selectedGender, setSelectedGender] = useState(null)
  const [civilStatusOptions, setCivilSatusOptions] = useState([])
  const [selectedCivilStatus, setSelectedCivilStatus] = useState(null)

  // Address Information
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

  // Personal Information
  const [phone, setPhone] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [ethnicityOptions, setEthnicityOptions] = useState([])
  const [selectedEthnicity, setSelectedEthnicity] = useState(null)
  const [birthdate, setBirthdate] = useState('')
  const [nationality, setNationality] = useState('brasileiro')
  const [birthstate, setBirthstate] = useState(null)
  const [birthcityOptions, setBirthcityOptions] = useState([])
  const [birthcity, setBirthcity] = useState(null)
  const [mothername, setMothername] = useState('')
  const [fathername, setFathername] = useState('')
  const [children, setChildren] = useState(null)

  // Documents
  const [cpf, setCpf] = useState('')
  const [rg, setRg] = useState('')
  const [issuingBody, setIssuingBody] = useState('')
  const [dateIssue, setDateIssue] = useState('')
  const [educationLevel, setEducationLevel] = useState(null)
  const [militaryCert, setMilitaryCert] = useState('')
  const [pisNumber, setPisNumber] = useState('')
  const [pisDateRegister, setPisDateRegister] = useState('')
  const [voterTitle, setVoterTitle] = useState('')
  const [voterZone, setVoterZone] = useState('')
  const [voterSection, setVoterSection] = useState('')
  const [ctps, setCtps] = useState('')
  const [ctpsSeries, setCtpsSeries] = useState('')
  const [ctpsUf, setCtpsUf] = useState('')
  const [ctpsIssueDate, setCtpsIssueDate] = useState('')
  const [cnh, setCnh] = useState('')
  const [cnhCategory, setCnhCategory] = useState('')
  const [cnhIssueDate, setCnhIssueDate] = useState('')
  const [cnhExpiryDate, setCnhExpiryDate] = useState('')
  const [firstJob, setFirstJob] = useState(null)
  const [formerEmployee, setFormerEmployee] = useState(null)
  const [unionContribution, setUnionContribution] = useState(null)
  const [unemploymentInsurance, setUnemploymentInsurance] = useState(null)
  const [previousExperience, setPreviousExperience] = useState(null)

  // Job Information
  const [monthlySalary, setMonthlySalary] = useState('')
  const [hourlySalary, setHourlySalary] = useState('')
  const [proportionalSalary, setProportionalSalary] = useState('')
  const [exposedToHazard, setExposedToHazard] = useState(null)

  useEffect(() => {
    // api
    //   .get(`/subsidiaries/${selectedSubsdiarie.value}/functions`)
    //   .then((response) => {
    //     let functionsData = response.data
    //     let options = functionsData?.map((data) => ({
    //       value: data.id,
    //       label: data.name
    //     })) || []
    //     setFunctionsOptions(options)
    //   })

    loadFunctionsOptions(selectedSubsdiarie, setFunctionsOptions)

    api
      .get(`/subsidiaries/${selectedSubsdiarie.value}/turns`)
      .then((response) => {
        let turnsData = response.data
        let options = turnsData?.map((data) => ({
          value: data.id,
          label: data.name
        })) || []
        setTurnsOptions(options)
      })

    api
      .get("/cost-center")
      .then((response) => {
        let costCenterData = response.data
        let options = costCenterData?.map((data) => ({
          value: data.id,
          label: data.name
        })) || []
        setCostCenterOptions(options)
      })

    api
      .get("/departments")
      .then((response) => {
        let departmentsData = response.data
        let options = departmentsData?.map((data) => ({
          value: data.id,
          label: data.name
        })) || []
        setDepartmentsOptions(options)
      })

    api
      .get(`/genders`)
      .then((response) => {
        let options = response?.data?.map((gender) => ({
          value: gender.id,
          label: gender.name
        })) || []
        setGendersOptions(options)
      })

    api
      .get(`/civil-status`)
      .then((response) => {
        let options = response?.data?.map((civilStatus) => ({
          value: civilStatus.id,
          label: civilStatus.name
        })) || []
        setCivilSatusOptions(options)
      })

    api
      .get("/states")
      .then((response) => {
        let options = response?.data?.map((state) => ({
          value: state.id,
          label: state.sail
        })) || []
        setStatesOptions(options)
      })

    api
      .get("/ethnicities")
      .then((response) => {
        let options = response?.data?.map((ethnicity) => ({
          value: ethnicity.id,
          label: ethnicity.name
        })) || []
        setEthnicityOptions(options)
      })
  }, [])

  useEffect(() => {
    if (selectedState) {
      api
        .get(`/states/${selectedState?.value}/cities`)
        .then((response) => {
          let options = response?.data?.map((city) => ({
            value: city.id,
            label: city.name
          })) || []
          setCitiesOptions(options)
        })
    }
  }, [selectedState])

  useEffect(() => {
    if (selectedCity) {
      api
        .get(`/cities/${selectedCity?.value}/neighborhoods`)
        .then((response) => {
          let options = response?.data?.map((neighborhood) => ({
            value: neighborhood.id,
            label: neighborhood.name
          })) || []
          setNeighborhoodOptions(options)
        })
    }
  }, [selectedCity])

  useEffect(() => {
    if (birthstate) {
      api
        .get(`/states/${birthstate?.value}/cities`)
        .then((response) => {
          let options = response?.data?.map((city) => ({
            value: city.id,
            label: city.name
          })) || []
          setBirthcityOptions(options)
        })
    }
  }, [birthstate])

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
    setEnrolment('')
    setSalesCode('')
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
    setNationality('brasileiro')
    setBirthstate(null)
    setBirthcity(null)
    setMothername('')
    setFathername('')
    setChildren(null)
    setCpf('')
    setRg('')
    setIssuingBody('')
    setDateIssue('')
    setEducationLevel(null)
    setMilitaryCert('')
    setPisNumber('')
    setPisDateRegister('')
    setVoterTitle('')
    setVoterZone('')
    setVoterSection('')
    setCtps('')
    setCtpsSeries('')
    setCtpsUf('')
    setCtpsIssueDate('')
    setCnh('')
    setCnhCategory('')
    setCnhIssueDate('')
    setCnhExpiryDate('')
    setFirstJob(null)
    setFormerEmployee(null)
    setUnionContribution(null)
    setUnemploymentInsurance(null)
    setPreviousExperience(null)
    setMonthlySalary('')
    setHourlySalary('')
    setProportionalSalary('')
    setExposedToHazard(null)

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
          // General Information
          esocial: esocial,
          enrolment: enrolment,
          sales_code: salesCode,
          timecode: timecode,
          name: name,
          function_id: selectedFunction?.value,
          turn_id: selectedTurn?.value,
          cost_center_id: selectedCostCenter?.value,
          department_id: selectedDepartment?.value,
          admission_date: admissionDate,
          picture: cloudinaryResponse?.data.secure_url,
          
          // Accounting Information
          gender_id: selectedGender?.value,
          civil_status: selectedCivilStatus?.value,
          
          // Address Information
          state_id: selectedState?.value,
          city_id: selectedCity?.value,
          neighborhood_id: selectedNeighborhood?.value,
          street: street,
          house_number: houseNumber,
          address_complement: addressComplement,
          cep: cep,
          
          // Personal Information
          phone: phone,
          mobile: mobile,
          email: email,
          ethnicity_id: selectedEthnicity?.value,
          birthdate: birthdate,
          nationality: nationality,
          birthstate: birthstate?.value,
          birthcity: birthcity?.value,
          mothername: mothername,
          fathername: fathername,
          children: children?.value === "true",
          
          // Documents
          cpf: cpf,
          rg: rg,
          issuing_body: issuingBody,
          date_issue: dateIssue,
          education_level: educationLevel?.value,
          militaryCert: militaryCert,
          pisNumber: pisNumber,
          pisDateRegister: pisDateRegister,
          voter_title: voterTitle,
          voter_zone: voterZone,
          voter_section: voterSection,
          ctps: ctps,
          ctps_series: ctpsSeries,
          ctps_uf: ctpsUf,
          ctps_issue_date: ctpsIssueDate,
          cnh: cnh,
          cnh_category: cnhCategory,
          cnh_issue_date: cnhIssueDate,
          cnh_expiry_date: cnhExpiryDate,
          first_job: firstJob?.value === "true",
          former_employee: formerEmployee?.value === "true",
          union_contribution: unionContribution?.value === "true",
          unemployment_insurance: unemploymentInsurance?.value === "true",
          previous_experience: previousExperience?.value === "true",
          
          // Job Information
          monthly_salary: monthlySalary,
          hourly_salary: hourlySalary,
          proportional_salary: proportionalSalary,
          exposed_to_hazard: exposedToHazard?.value === "true",
          
          // Additional required fields
          subsidiarie_id: selectedSubsdiarie.value,
          is_active: true
        }

        console.log("Submitting data:", submitData)
        debugger
        
        api
          .post("/workers", submitData)
          .then((response) => {
            console.log("Worker created successfully:", response.data)
            handleClose()
          })
          .catch((error) => {
            console.error("Error creating worker:", error)
          })
      })
      .catch((error) => {
        console.error("Error uploading image:", error)
      })
  }

  return (
    <>
      <Modal
        show={createWorkerModalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar colaborador</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <div className="mb-4">
            <h5>Informações gerais</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  placeholder="E-Social"
                  className="form-control"
                  value={esocial}
                  onChange={(e) => setEsocial(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  placeholder="Matrícula"
                  className="form-control"
                  value={enrolment}
                  onChange={(e) => setEnrolment(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  placeholder="Código de vendas"
                  className="form-control"
                  value={salesCode}
                  onChange={(e) => setSalesCode(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  placeholder="Código de ponto"
                  className="form-control"
                  value={timecode}
                  onChange={(e) => setTimecode(e.target.value)}
                />
              </div>
              <div className="col-md-12 mb-3">
                <input
                  type="text"
                  placeholder="Nome"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Função"
                  options={functionsOptions}
                  value={selectedFunction}
                  onChange={setSelectedFunction}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Turnos"
                  options={turnsOptions}
                  value={selectedTurn}
                  onChange={setSelectedTurn}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="C. de custos"
                  options={costCenterOptions}
                  value={selectedCostCenter}
                  onChange={setSelectedCostCenter}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Setor"
                  options={departmentsOptions}
                  value={selectedDepartment}
                  onChange={setSelectedDepartment}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label><b>Data de admissão</b></label>
                <input
                  type="date"
                  className="form-control"
                  value={admissionDate}
                  onChange={(e) => setAdmissionDate(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label><b>Foto</b></label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setPicture(e.target.files[0])}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h5>Ficha da contabilidade</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Gênero"
                  options={gendersOptions}
                  value={selectedGender}
                  onChange={setSelectedGender}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Estado civil"
                  options={civilStatusOptions}
                  value={selectedCivilStatus}
                  onChange={setSelectedCivilStatus}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h5>Endereço residencial</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Estado"
                  options={statesOptions}
                  value={selectedState}
                  onChange={setSelectedState}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Cidade"
                  options={citiesOptions}
                  value={selectedCity}
                  onChange={setSelectedCity}
                  isDisabled={!selectedState}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Bairro"
                  options={neighborhoodOptions}
                  value={selectedNeighborhood}
                  onChange={setSelectedNeighborhood}
                  isDisabled={!selectedCity}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  placeholder="Logradouro"
                  className="form-control"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  placeholder="Número"
                  className="form-control"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  placeholder="Complemento"
                  className="form-control"
                  value={addressComplement}
                  onChange={(e) => setAddressComplement(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  placeholder="CEP"
                  className="form-control"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h5>Dados pessoais</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Telefone fixo"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Celular"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="col-md-12 mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Etnia"
                  options={ethnicityOptions}
                  value={selectedEthnicity}
                  onChange={setSelectedEthnicity}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label><b>Data de nascimento</b></label>
                <input
                  type="date"
                  className="form-control"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Nacionalidade"
                  options={[
                    { value: "brasileiro", label: "Brasileiro" },
                    { value: "estrangeiro", label: "Estrangeiro" }
                  ]}
                  value={{ value: nationality, label: nationality === 'brasileiro' ? 'Brasileiro' : 'Estrangeiro' }}
                  onChange={(val) => setNationality(val.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Estado de nascimento"
                  options={statesOptions}
                  value={birthstate}
                  onChange={setBirthstate}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Cidade de nascimento"
                  options={birthcityOptions}
                  value={birthcity}
                  onChange={setBirthcity}
                  isDisabled={!birthstate}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  placeholder="Nome da mãe"
                  className="form-control"
                  value={mothername}
                  onChange={(e) => setMothername(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  placeholder="Nome do pai"
                  className="form-control"
                  value={fathername}
                  onChange={(e) => setFathername(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Possui filhos menores de 14 anos?"
                  options={[
                    { value: "true", label: "Sim" },
                    { value: "false", label: "Não" },
                  ]}
                  value={children}
                  onChange={setChildren}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h5>Documentos</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="RG"
                  value={rg}
                  onChange={(e) => setRg(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Órgão emissor"
                  value={issuingBody}
                  onChange={(e) => setIssuingBody(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label><b>Data de expedição</b></label>
                <input
                  type="date"
                  className="form-control"
                  value={dateIssue}
                  onChange={(e) => setDateIssue(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Escolaridade"
                  options={[
                    { value: "fundamental_incomplete", label: "Fundamental Incompleto" },
                    { value: "fundamental_complete", label: "Fundamental Completo" },
                    { value: "medio_incomplete", label: "Médio Incompleto" },
                    { value: "medio_complete", label: "Médio Completo" },
                    { value: "superior_incomplete", label: "Superior Incompleto" },
                    { value: "superior_complete", label: "Superior Completo" },
                    { value: "pos_graduacao", label: "Pós-graduação" },
                    { value: "mestrado", label: "Mestrado" },
                    { value: "doutorado", label: "Doutorado" },
                  ]}
                  value={educationLevel}
                  onChange={setEducationLevel}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Certificado de reservista"
                  value={militaryCert}
                  onChange={(e) => setMilitaryCert(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Número do PIS"
                  value={pisNumber}
                  onChange={(e) => setPisNumber(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Data de cadastro do PIS"
                  value={pisDateRegister}
                  onChange={(e) => setPisDateRegister(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Título de eleitor"
                  value={voterTitle}
                  onChange={(e) => setVoterTitle(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Zona"
                  value={voterZone}
                  onChange={(e) => setVoterZone(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Sessão"
                  value={voterSection}
                  onChange={(e) => setVoterSection(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="CTPS"
                  value={ctps}
                  onChange={(e) => setCtps(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Série"
                  value={ctpsSeries}
                  onChange={(e) => setCtpsSeries(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="UF"
                  value={ctpsUf}
                  onChange={(e) => setCtpsUf(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Data de emissão CTPS"
                  value={ctpsIssueDate}
                  onChange={(e) => setCtpsIssueDate(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="CNH"
                  value={cnh}
                  onChange={(e) => setCnh(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Categoria CNH"
                  value={cnhCategory}
                  onChange={(e) => setCnhCategory(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Data de emissão CNH"
                  value={cnhIssueDate}
                  onChange={(e) => setCnhIssueDate(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Validade CNH"
                  value={cnhExpiryDate}
                  onChange={(e) => setCnhExpiryDate(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Primeiro emprego?"
                  options={[
                    { value: "true", label: "Sim" },
                    { value: "false", label: "Não" },
                  ]}
                  value={firstJob}
                  onChange={setFirstJob}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Já foi funcionário da empresa?"
                  options={[
                    { value: "true", label: "Sim" },
                    { value: "false", label: "Não" },
                  ]}
                  value={formerEmployee}
                  onChange={setFormerEmployee}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Recebeu contribuição sindical nesse ano?"
                  options={[
                    { value: "true", label: "Sim" },
                    { value: "false", label: "Não" },
                  ]}
                  value={unionContribution}
                  onChange={setUnionContribution}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Está recebendo seguro desemprego?"
                  options={[
                    { value: "true", label: "Sim" },
                    { value: "false", label: "Não" },
                  ]}
                  value={unemploymentInsurance}
                  onChange={setUnemploymentInsurance}
                />
              </div>
              <div className="col-md-6 mb-3">
                <ReactSelect
                  placeholder="Possui experiência anterior na função requerida?"
                  options={[
                    { value: "true", label: "Sim" },
                    { value: "false", label: "Não" },
                  ]}
                  value={previousExperience}
                  onChange={setPreviousExperience}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h5>Função</h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Salário mensal"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Salário por hora"
                  value={hourlySalary}
                  onChange={(e) => setHourlySalary(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Salário proporcional a jornada"
                  value={proportionalSalary}
                  onChange={(e) => setProportionalSalary(e.target.value)}
                />
              </div>
              <div className="col-md-12 mb-3">
                <ReactSelect
                  placeholder="Funcionário ficará exposto a agente nocivo?"
                  options={[
                    { value: "true", label: "Sim" },
                    { value: "false", label: "Não" },
                  ]}
                  value={exposedToHazard}
                  onChange={setExposedToHazard}
                />
              </div>
            </div>
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