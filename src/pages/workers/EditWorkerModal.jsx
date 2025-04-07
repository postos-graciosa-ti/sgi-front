import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Input from '../../components/form/Input'
import Select from "../../components/form/Select"
import useUserSessionStore from '../../data/userSession'
import useWorkersExperienceTimeStore from '../../data/workersExperienceTime'
import loadCivilStatusOptions from '../../requests/loadOptions/loadCivilStatusOptions'
import loadCostCenterOptions from '../../requests/loadOptions/loadCostCenterOptions'
import loadDepartmentsOptions from '../../requests/loadOptions/loadDepartmentsOptions'
import loadEthnicitiesOptions from '../../requests/loadOptions/loadEthnicitiesOptions'
import loadFunctionsOptions from '../../requests/loadOptions/loadFunctionsOptions'
import loadGendersOptions from '../../requests/loadOptions/loadGendersOptions'
import loadStatesOptions from '../../requests/loadOptions/loadStatesOptions'
import loadTurnsOptions from '../../requests/loadOptions/loadTurnsOptions'
import api from '../../services/api'
import loadNeighborhoodsOptions from '../../requests/loadOptions/loadNeighborhoodsOptions'
import loadCitiesOptions from '../../requests/loadOptions/loadCitiesOptions'

const EditWorkerModal = (props) => {
  const {
    editWorkerModalOpen,
    setEditWorkerModalOpen,
    setWorkersList,
    selectedWorker,
    setSelectedWorker
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

  const [civilStatusOptions, setCivilStatusOptions] = useState()

  const [statesOptions, setStatesOptions] = useState()

  const [ethnicitiesOptions, setEthnicitiesOptions] = useState()

  const [selectedGender, setSelectedGender] = useState()

  const [selectedCivilStatus, setSelectedCivilStatus] = useState()

  const [street, setStreet] = useState()

  const [streetNumber, setStreetNumber] = useState()

  const [streetComplement, setStreetComplement] = useState()

  const [selectedCep, setSelectedCep] = useState()

  const [selectedState, setSelectedState] = useState()

  const [citiesOptions, setCitiesOptions] = useState()

  const [selectedCity, setSelectedCity] = useState()

  const [neighborhoodOptions, setNeighborhoodOptions] = useState()

  const [selectedNeighborhood, setSelectedNeighborhood] = useState()

  const [selectedPhone, setSelectedPhone] = useState()

  const [selectedMobile, setSelectedMobile] = useState()

  const [email, setEmail] = useState()

  const [selectedEthnicity, setSelectedEthnicity] = useState()

  const [birthdate, setBirthdate] = useState()

  const nationalityOptions = [{ value: 1, label: "brasileiro" }]

  const [selectedNationality, setSelectedNationality] = useState()

  const [selectedBirthstate, setSelectedBirthstate] = useState()

  const [birthcity, setBirthcity] = useState()

  const [fathername, setFathername] = useState()

  const [mothername, setMothername] = useState()

  const trueFalseOptions = [
    { value: true, label: "sim" },
    { value: false, label: "não" },
  ]

  const [hasChildren, setHasChildren] = useState()

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

  const [ctps, setCtps] = useState()

  const [ctpsSerie, setCtpsSerie] = useState()

  const [ctpsState, setCtpsState] = useState()

  const [ctpsEmissionDate, setCtpsEmissionDate] = useState()

  const [cnh, setCnh] = useState()

  const [cnhCategory, setCnhCategory] = useState()

  const [cnhEmissionDate, setCnhEmissionDate] = useState()

  const [cnhValidDate, setCnhValidDate] = useState()

  const [firstJob, setFirstJob] = useState()

  const [wasEmployee, setWasEmployee] = useState()

  const [unionContributeCurrentYear, setUnionContributeCurrentYear] = useState()

  const [receivingUnemploymentInsurance, setReceivingUnemploymentInsurance] = useState()

  const [previousExperience, setPreviousExperience] = useState()

  const [monthWage, setMonthWage] = useState()

  const [hourWage, setHourWage] = useState()

  const [journeyWage, setJourneyWage] = useState()

  const [transportVoucher, setTransportVoucher] = useState()

  const [transportVoucherQuantity, setTransportVoucherQuantity] = useState()

  const [diaryWorkJourney, setDiaryWorkJourney] = useState()

  const [weekWorkJourney, setWeekWorkJourney] = useState()

  const [monthWorkJourney, setMonthWorkJourney] = useState()

  const experienceTimeOptions = [
    { value: 1, label: "30 dias" },
    { value: 2, label: "45 dias" },
    { value: 3, label: "60 dias" },
    { value: 4, label: "sem tempo de experiência" },
  ]

  const [experienceTime, setExperienceTime] = useState()

  const [nocturneHours, setNocturneHours] = useState()

  const [dangerousness, setDangerousness] = useState()

  const [unhealthy, setUnhealthy] = useState()

  const [wagePaymentMethod, setWagePaymentMethod] = useState()

  useEffect(() => {
    loadFunctionsOptions(selectedSubsdiarie, setFunctionsOptions)
    loadTurnsOptions(selectedSubsdiarie, setTurnsOptions)
    loadCostCenterOptions(setCostCenterOptions)
    loadDepartmentsOptions(setDepartmentsOptions)
    loadGendersOptions(setGendersOptions)
    loadCivilStatusOptions(setCivilStatusOptions)
    loadStatesOptions(setStatesOptions)
    loadEthnicitiesOptions(setEthnicitiesOptions)
  }, [])

  useEffect(() => {
    if (selectedState) {
      loadCitiesOptions(selectedState, setCitiesOptions)
    }
  }, [selectedState])

  useEffect(() => {
    if (selectedCity) {
      loadNeighborhoodsOptions(selectedCity, setNeighborhoodOptions)
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
    setSelectedWorker()
    setName()
    setSelectedFunction()
    setSelectedTurn()
    setSelectedCostCenter()
    setSelectedDepartment()
    setAdmissionDate()
    setPicture()
    setTimecode()
    setEsocial()
    setEditWorkerModalOpen(false)
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
      "ctps": ctps,
      "ctps_serie": ctpsSerie,
      "ctps_state": ctpsState?.value,
      "ctps_emission_date": ctpsEmissionDate,
      "cnh": cnh,
      "cnh_category": cnhCategory,
      "cnh_emition_date": cnhEmissionDate,
      "cnh_valid_date": cnhValidDate,
      "firstJob": firstJob?.value,
      "was_employee": wasEmployee?.value,
      "union_contribute_current_year": unionContributeCurrentYear?.value,
      "receiving_unemployment_insurance": receivingUnemploymentInsurance?.value,
      "previous_experience": previousExperience?.value,
      "month_wage": monthWage,
      "hour_wage": hourWage,
      "journey_wage": journeyWage,
      "transport_voucher": transportVoucher?.value,
      "transport_voucher_quantity": transportVoucherQuantity,
      "diary_workjourney": diaryWorkJourney,
      "week_workjourney": weekWorkJourney,
      "month_workjourney": monthWorkJourney,
      "experience_time": experienceTime?.value,
      "nocturne_hours": nocturneHours,
      "dangerousness": dangerousness?.value,
      "unhealthy": unhealthy?.value,
      "wage_payment_method": wagePaymentMethod?.value,
    }
    api
      .put(`/workers/${selectedWorker?.worker_id}`, formData)
      .then(() => handleClose())

    // if (picture) {

    //   let cloudinaryEndpoint = import.meta.env.VITE_CLOUDINARY_ENDPOINT

    //   const cloudinaryFormData = new FormData()

    //   cloudinaryFormData.append("file", picture)

    //   cloudinaryFormData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET)

    //   axios
    //     .post(cloudinaryEndpoint, cloudinaryFormData)
    //     .then((cloudinaryResponse) => {
    //       const formData = {
    //         name: name || selectedWorker?.worker_name,
    //         function_id: selectedFunction?.value || selectedWorker?.function_id,
    //         subsidiarie_id: selectedSubsdiarie.value,
    //         is_active: selectedWorker?.worker_is_active,
    //         turn_id: selectedTurn?.value || selectedWorker?.turn_id,
    //         cost_center_id: selectedCostCenter?.value || selectedWorker?.cost_center_id,
    //         department_id: selectedDepartment?.value || selectedWorker?.department_id,
    //         admission_date: admissionDate || selectedWorker?.admission_date,
    //         resignation_date: selectedWorker?.resignation_date,
    //         enrolment: enrolment,
    //         sales_code: salesCode,
    //         picture: cloudinaryResponse?.data.secure_url,
    //         timecode: timecode,
    //         esocial: esocial
    //       }

    //       api
    //         .put(`/workers/${selectedWorker?.worker_id}`, formData)
    //         .then((response) => {
    //           let oldWorkerData = selectedWorker

    //           let oldWorkerFunc = functionsOptions.find((func) => func.value == oldWorkerData.function_id)

    //           let oldWorkerTurn = turnsOptions.find((turn) => turn.value == oldWorkerData.turn_id)

    //           let oldWorkerCostCenter = costCenterOptions.find((costCenter) => costCenter.value == oldWorkerData.cost_center_id)

    //           let oldWorkerDepartment = departmentsOptions.find((department) => department.value == oldWorkerData.department_id)

    //           let updatedWorkerData = response.data

    //           let updatedWorkerFunc = functionsOptions.find((func) => func.value == updatedWorkerData.function_id)

    //           let updatedWorkerTurn = turnsOptions.find((turn) => turn.value == updatedWorkerData.turn_id)

    //           let updatedWorkerCostCenter = costCenterOptions.find((costCenter) => costCenter.value == updatedWorkerData.cost_center_id)

    //           let updatedWorkerDepartment = departmentsOptions.find((department) => department.value == updatedWorkerData.department_id)

    //           let logStr = `
    //             ${userSession.name} atualizou ${selectedWorker?.worker_name} de 
    //             (
    //               nome=${oldWorkerData.worker_name},
    //               função=${oldWorkerFunc.label},
    //               filial=${selectedSubsdiarie.label},
    //               ativo=sim,
    //               turno=${oldWorkerTurn.label},
    //               centro de custo=${oldWorkerCostCenter.label},
    //               setor=${oldWorkerDepartment.label},
    //               data de admissão=${oldWorkerData.admission_date}
    //             )
    //             para ${updatedWorkerData.name}
    //             (
    //               nome=${updatedWorkerData.name},
    //               função=${updatedWorkerFunc.label},
    //               filial=${selectedSubsdiarie.label},
    //               ativo=sim,
    //               turno=${updatedWorkerTurn.label},
    //               centro de custo=${updatedWorkerCostCenter.label},
    //               setor=${updatedWorkerDepartment.label},
    //               data de admissão=${updatedWorkerData.admission_date}
    //             )
    //           `

    //           let logFormData = {
    //             "log_str": logStr,
    //             "happened_at": moment(new Date()).format("HH:mm"),
    //             "happened_at_time": moment(new Date()).format("DD-MM-YYYY"),
    //             "user_id": userSession.id,
    //             "subsidiarie_id": selectedSubsdiarie.value
    //           }

    //           api
    //             .post(`/logs/subsidiaries/${selectedSubsdiarie.value}/workers`, logFormData)
    //             .then(() => handleClose())
    //         })
    //     })

    // } else {

    //   const formData = {
    //     name: name || selectedWorker?.worker_name,
    //     function_id: selectedFunction?.value || selectedWorker?.function_id,
    //     subsidiarie_id: selectedSubsdiarie.value,
    //     is_active: selectedWorker?.worker_is_active,
    //     turn_id: selectedTurn?.value || selectedWorker?.turn_id,
    //     cost_center_id: selectedCostCenter?.value || selectedWorker?.cost_center_id,
    //     department_id: selectedDepartment?.value || selectedWorker?.department_id,
    //     admission_date: admissionDate || selectedWorker?.admission_date,
    //     resignation_date: selectedWorker?.resignation_date,
    //     enrolment: enrolment,
    //     sales_code: salesCode,
    //     timecode: timecode,
    //     esocial: esocial
    //   }

    //   api
    //     .put(`/workers/${selectedWorker?.worker_id}`, formData)
    //     .then((response) => {
    //       let oldWorkerData = selectedWorker

    //       let oldWorkerFunc = functionsOptions.find((func) => func.value == oldWorkerData.function_id)

    //       let oldWorkerTurn = turnsOptions.find((turn) => turn.value == oldWorkerData.turn_id)

    //       let oldWorkerCostCenter = costCenterOptions.find((costCenter) => costCenter.value == oldWorkerData.cost_center_id)

    //       let oldWorkerDepartment = departmentsOptions.find((department) => department.value == oldWorkerData.department_id)

    //       let updatedWorkerData = response.data

    //       let updatedWorkerFunc = functionsOptions.find((func) => func.value == updatedWorkerData.function_id)

    //       let updatedWorkerTurn = turnsOptions.find((turn) => turn.value == updatedWorkerData.turn_id)

    //       let updatedWorkerCostCenter = costCenterOptions.find((costCenter) => costCenter.value == updatedWorkerData.cost_center_id)

    //       let updatedWorkerDepartment = departmentsOptions.find((department) => department.value == updatedWorkerData.department_id)

    //       let logStr = `
    //         ${userSession.name} atualizou ${selectedWorker?.worker_name} de 
    //         (
    //           nome=${oldWorkerData.worker_name},
    //           função=${oldWorkerFunc.label},
    //           filial=${selectedSubsdiarie.label},
    //           ativo=sim,
    //           turno=${oldWorkerTurn.label},
    //           centro de custo=${oldWorkerCostCenter.label},
    //           setor=${oldWorkerDepartment.label},
    //           data de admissão=${oldWorkerData.admission_date}
    //         )
    //         para ${updatedWorkerData.name}
    //         (
    //           nome=${updatedWorkerData.name},
    //           função=${updatedWorkerFunc.label},
    //           filial=${selectedSubsdiarie.label},
    //           ativo=sim,
    //           turno=${updatedWorkerTurn.label},
    //           centro de custo=${updatedWorkerCostCenter.label},
    //           setor=${updatedWorkerDepartment.label},
    //           data de admissão=${updatedWorkerData.admission_date}
    //         )
    //       `

    //       let logFormData = {
    //         "log_str": logStr,
    //         "happened_at": moment(new Date()).format("HH:mm"),
    //         "happened_at_time": moment(new Date()).format("DD-MM-YYYY"),
    //         "user_id": userSession.id,
    //         "subsidiarie_id": selectedSubsdiarie.value
    //       }

    //       api
    //         .post(`/logs/subsidiaries/${selectedSubsdiarie.value}/workers`, logFormData)
    //         .then(() => handleClose())
    //     })

    // }

  }

  console.log(selectedWorker, selectedWorker?.rg_expedition_date)

  return (
    <Modal
      show={editWorkerModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar colaborador</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <h5>Dados de trabalho</h5>
        </div>
        <Input
          placeholder={"E-social"}
          type={"text"}
          setSelectedValue={setEsocial}
          label={"E-social"}
          defaultValue={selectedWorker?.esocial}
        />
        <Input
          placeholder={"Matrícula"}
          type={"text"}
          setSelectedValue={setEnrolment}
          label={"Matrícula"}
          defaultValue={selectedWorker?.worker_enrolment}
        />
        <Input
          placeholder={"Código de vendas"}
          type={"text"}
          setSelectedValue={setSalesCode}
          label={"Código de vendas"}
          defaultValue={selectedWorker?.worker_sales_code}
        />
        <Input
          placeholder={"Código de ponto"}
          type={"text"}
          setSelectedValue={setTimecode}
          label={"Código de ponto"}
          defaultValue={selectedWorker?.timecode}
        />
        <Input
          placeholder="Nome"
          type="text"
          setSelectedValue={setName}
          label={"Nome do colaborador"}
          defaultValue={selectedWorker?.worker_name}
        />
        <Select
          placeholder={"Função"}
          options={functionsOptions}
          setSelectedValue={setSelectedFunction}
          defaultValue={{ label: selectedWorker?.function_name, value: selectedWorker?.function_id }}
          label={"Função do colaborador"}
        />
        <Select
          placeholder={"Turno"}
          options={turnsOptions}
          setSelectedValue={setSelectedTurn}
          defaultValue={{ label: selectedWorker?.turn_name, value: selectedWorker?.turn_id }}
          label={"Turno do colaborador"}
        />
        <Select
          placeholder={"Centro de custos"}
          options={costCenterOptions}
          setSelectedValue={setSelectedCostCenter}
          defaultValue={{ label: selectedWorker?.cost_center, value: selectedWorker?.cost_center_id }}
          label={"Centro de custos do colaborador"}
        />
        <Select
          placeholder={"Setor"}
          options={departmentsOptions}
          setSelectedValue={setSelectedDepartment}
          defaultValue={{ label: selectedWorker?.department, value: selectedWorker?.department_id }}
          label={"Setor do colaborador"}
        />
        <Input
          type="date"
          setSelectedValue={setAdmissionDate}
          label={"Data de admissão do colaborador"}
          defaultValue={selectedWorker?.admission_date}
        />
        <Input
          type="file"
          setSelectedValue={setPicture}
          label={"Foto"}
        />
        <div>
          <h5>Ficha da contabilidade</h5>
        </div>
        <Select
          placeholder={"Genero"}
          options={gendersOptions}
          setSelectedValue={setSelectedGender}
          defaultValue={{ label: selectedWorker?.gender?.name, value: selectedWorker?.gender?.id }}
          label={"Genero do colaborador"}
        />
        <Select
          placeholder="Estado civil"
          options={civilStatusOptions}
          setSelectedValue={setSelectedCivilStatus}
          defaultValue={{ label: selectedWorker?.civil_status?.name, value: selectedWorker?.civil_status?.id }}
          label={"Estado civil do colaborador"}
        />
        <Input
          type="text"
          placeholder="Logradouro"
          setSelectedValue={setStreet}
          defaultValue={selectedWorker?.street}
          label={"Logradouro do colaborador"}
        />
        <Input
          type="text"
          placeholder="Número"
          setSelectedValue={setStreetNumber}
          defaultValue={selectedWorker?.street_number}
          label={"Número do endereço do colaborador"}
        />
        <Input
          type="text"
          placeholder="Complemento"
          setSelectedValue={setStreetComplement}
          defaultValue={selectedWorker?.street_complement}
          label={"Complemento do endereço do colaborador"}
        />
        <Input
          type="text"
          placeholder="CEP"
          setSelectedValue={setSelectedCep}
          defaultValue={selectedWorker?.cep}
          label={"CEP do endereço do colaborador"}
        />
        <Select
          placeholder="Estado"
          options={statesOptions}
          setSelectedValue={setSelectedState}
          defaultValue={{ label: selectedWorker?.state?.name, value: selectedWorker?.state?.id }}
          label={"Estado do colaborador"}
        />
        <Select
          placeholder="Cidade"
          options={citiesOptions}
          setSelectedValue={setSelectedCity}
          defaultValue={{ label: selectedWorker?.city?.name, value: selectedWorker?.city?.id }}
          label={"Cidade do colaborador"}
        />
        <Select
          placeholder="Bairro"
          options={neighborhoodOptions}
          setSelectedValue={setSelectedNeighborhood}
          defaultValue={{ label: selectedWorker?.neighborhood?.name, value: selectedWorker?.neighborhood?.id }}
          label={"Bairro do colaborador"}
        />
        <Input
          type="text"
          placeholder="Telefone fixo"
          setSelectedValue={setSelectedPhone}
          defaultValue={selectedWorker?.phone}
          label={"Telefone fixo do colaborador"}
        />
        <Input
          type="text"
          placeholder="Celular"
          setSelectedValue={setSelectedMobile}
          defaultValue={selectedWorker?.mobile}
          label={"Celular do colaborador"}
        />
        <Input
          type="email"
          placeholder="E-mail"
          setSelectedValue={setEmail}
          defaultValue={selectedWorker?.email}
          label={"E-mail do colaborador"}
        />
        <Select
          placeholder="Etnia"
          options={ethnicitiesOptions}
          setSelectedValue={setSelectedEthnicity}
          defaultValue={{ label: selectedWorker?.ethnicity?.name, value: selectedWorker?.ethnicity?.id }}
          label={"Etnia do colaborador"}
        />
        <Input
          type="date"
          setSelectedValue={setBirthdate}
          defaultValue={selectedWorker?.birthdate}
          label={"Data de nascimento"}
        />
        <Select
          placeholder="Nacionalidade"
          options={nationalityOptions}
          setSelectedValue={setSelectedNationality}
          label={"Nacionalidade do colaborador"}
        />
        <Select
          placeholder="Estado de nascimento"
          options={statesOptions}
          setSelectedValue={setSelectedBirthstate}
          defaultValue={{ label: selectedWorker?.birthstate?.name, value: selectedWorker?.birthstate?.id }}
          label={"Estado de nascimento do colaborador"}
        />
        <Select
          placeholder="Cidade de nascimento"
          options={citiesOptions}
          setSelectedValue={setBirthcity}
          defaultValue={{ label: selectedWorker?.birthcity?.name, value: selectedWorker?.birthcity?.id }}
          label={"Cidade de nascimento do colaborador"}
        />
        <Input
          type="text"
          placeholder="Nome do pai"
          setSelectedValue={setFathername}
          defaultValue={selectedWorker?.fathername}
          label={"Nome do pai do colaborador"}
        />
        <Input
          type="text"
          placeholder="Nome da mãe"
          setSelectedValue={setMothername}
          defaultValue={selectedWorker?.mothername}
          label={"Nome da mãe do colaborador"}
        />
        <Select
          placeholder="Possui filhos menores de 14?"
          options={trueFalseOptions}
          setSelectedValue={setHasChildren}
          // defaultValue={{value: selectedWorker?.has_children}}
          label={"Possui filhos menores de 14?"}
        />
        <Input
          type="text"
          placeholder='CPF'
          setSelectedValue={setCpf}
          defaultValue={selectedWorker?.cpf}
          label={"CPF"}
        />
        <Input
          type="text"
          placeholder="RG"
          setSelectedValue={setRg}
          defaultValue={selectedWorker?.rg}
          label={"RG"}
        />
        <Input
          type="text"
          placeholder='Órgão emissor'
          setSelectedValue={setRgIssuingAgency}
          defaultValue={selectedWorker?.rgIssuingAgency}
          label={"Órgão emissor de RG"}
        />
        <Select
          placeholder="Estado de RG"
          options={statesOptions}
          setSelectedValue={setRgState}
          defaultValue={{ value: selectedWorker?.rg_state?.id, label: selectedWorker?.rg_state?.name }}
          label={"Estado de RG"}
        />
        <Input
          type="date"
          setSelectedValue={setRgExpeditionDate}
          defaultValue={selectedWorker?.rg_expedition_date}
          label={"Data de expedição de RG"}
        />
        <Input
          type="text"
          placeholder="Certificado de reservista"
          setSelectedValue={setMilitaryCertNumber}
          defaultValue={selectedWorker?.military_cert_number}
          label={"Certificado de reservista"}
        />
        <Input
          type="text"
          placeholder='PIS'
          setSelectedValue={setPis}
          defaultValue={selectedWorker?.pis}
          label={"PIS"}
        />
        <Input
          type={"date"}
          setSelectedValue={setPisRegisterDate}
          label={"Data de cadastro de PIS"}
          defaultValue={selectedWorker?.pis_register_date}
        />
        <Input
          type="text"
          placeholder='Título de eleitor'
          setSelectedValue={setVotantTitle}
          label={"Título de eleitor"}
          defaultValue={selectedWorker?.votant_title}
        />
        <Input
          type="text"
          placeholder='Zona de eleitor'
          setSelectedValue={setVotantZone}
          label={"Zona de eleitor"}
          defaultValue={selectedWorker?.votant_zone}
        />
        <Input
          type="text"
          setSelectedValue={setVotantSession}
          placeholder="Sessão de eleitor"
          defaultValue={selectedWorker?.votant_session}
          label={"Sessão de eleitor"}
        />
        <Input
          type="text"
          placeholder='CTPS'
          setSelectedValue={setCtps}
          defaultValue={selectedWorker?.ctps}
          label={"CTPS"}
        />
        <Input
          type="text"
          placeholder="Série de CTPS"
          setSelectedValue={setCtpsSerie}
          defaultValue={selectedWorker?.ctps_serie}
          label={"Série de CTPS"}
        />
        <Select
          placeholder="UF CTPS"
          options={statesOptions}
          setSelectedValue={setCtpsState}
          defaultValue={{ label: selectedWorker?.ctps_state?.name, value: selectedWorker?.ctps_state?.id }}
          label={"UF CTPS"}
        />
        <Input
          type={"date"}
          label={"Data de emissão CTPS"}
          setSelectedValue={setCtpsEmissionDate}
          defaultValue={selectedWorker?.ctps_emission_date}
        />
        <Input
          type={"text"}
          placeholder={"CNH"}
          setSelectedValue={setCnh}
          defaultValue={selectedWorker?.cnh}
          label={"CNH"}
        />
        <Input
          type="text"
          placeholder="Categoria de CNH"
          setSelectedValue={setCnhCategory}
          defaultValue={selectedWorker?.cnh_category}
          label={"Categoria de CNH"}
        />
        <Input
          type="date"
          label="Data de emissão de CNH"
          setSelectedValue={setCnhEmissionDate}
          defaultValue={selectedWorker?.cnh_emition_date}
        />
        <Input
          type="date"
          label="Validade de CNH"
          setSelectedValue={setCnhValidDate}
          defaultValue={selectedWorker?.cnh_valid_date}
        />
        <Select
          placeholder="Primeiro emprego?"
          options={trueFalseOptions}
          setSelectedValue={setFirstJob}
          defaultValue={{ value: selectedWorker?.first_job, label: selectedWorker?.first_job ? "sim" : "não" }}
          label={"Primeiro emprego?"}
        />
        <Select
          placeholder="Já foi empregado da empresa?"
          options={trueFalseOptions}
          setSelectedValue={setWasEmployee}
          defaultValue={{ value: selectedWorker?.was_employee, label: selectedWorker?.was_employee ? "sim" : "não" }}
          label={"Primeiro emprego?"}
        />
        <Select
          placeholder="Contribuição sindical nesse ano?"
          options={trueFalseOptions}
          setSelectedValue={setUnionContributeCurrentYear}
          defaultValue={{ value: selectedWorker?.union_contribute_current_year, label: selectedWorker?.union_contribute_current_year ? "sim" : "não" }}
          label={"Contribuição sindical nesse ano?"}
        />
        <Select
          placeholder="Recebendo seguro-desemprego?"
          options={trueFalseOptions}
          setSelectedValue={setReceivingUnemploymentInsurance}
          defaultValue={{ value: selectedWorker?.receiving_unemployment_insurance, label: selectedWorker?.receiving_unemployment_insurance ? "sim" : "não" }}
          label={"Contribuição sindical nesse ano?"}
        />
        <Select
          placeholder="Experiência prévia na função?"
          options={trueFalseOptions}
          setSelectedValue={setPreviousExperience}
          defaultValue={{ value: selectedWorker?.previous_experience, label: selectedWorker?.previous_experience ? "sim" : "não" }}
          label={"Contribuição sindical nesse ano?"}
        />
        <Input
          placeholder="Mensalista"
          type="text"
          setSelectedValue={setMonthWage}
          defaultValue={{ value: selectedWorker?.month_wage, label: selectedWorker?.month_wage ? "sim" : "não" }}
          label={"Mensalista?"}
        />
        <Input
          placeholder="Valor/horista"
          type="text"
          setSelectedValue={setHourWage}
          defaultValue={{ value: selectedWorker?.hour_wage, label: selectedWorker?.hour_wage ? "sim" : "não" }}
          label={"Valor/horista"}
        />
        <Input
          placeholder="Proporcional a jornada"
          type="text"
          setSelectedValue={setJourneyWage}
          defaultValue={{ value: selectedWorker?.journey_wage, label: selectedWorker?.journey_wage ? "sim" : "não" }}
          label={"Proporcional a jornada"}
        />
        <Select
          placeholder="Vale transporte"
          options={trueFalseOptions}
          setSelectedValue={setTransportVoucher}
          defaultValue={{ value: selectedWorker?.journey_wage, label: selectedWorker?.journey_wage ? "sim" : "não" }}
          label={"Vale transporte"}
        />
        <Input
          placeholder="Quantidade vale transporte"
          type="number"
          setSelectedValue={setTransportVoucherQuantity}
          defaultValue={selectedWorker?.transport_voucher_quantity}
          label={"Quantidade vale transporte"}
        />
        <Input
          placeholder="Carga diária"
          type="text"
          setSelectedValue={setDiaryWorkJourney}
          defaultValue={selectedWorker?.diary_workjourney}
          label={"Carga diária"}
        />
        <Input
          placeholder="Carga semanal"
          type="text"
          setSelectedValue={setWeekWorkJourney}
          defaultValue={selectedWorker?.week_workjourney}
          label={"Carga semanal"}
        />
        <Input
          placeholder="Carga mensal"
          type="text"
          setSelectedValue={setMonthWorkJourney}
          defaultValue={selectedWorker?.month_workjourney}
          label={"Carga mensal"}
        />
        <Select
          placeholder="Tempo de experiência"
          options={experienceTimeOptions}
          setSelectedValue={setExperienceTime}
          // defaultValue={selectedWorker?.experience_time}
          label={"Carga mensal"}
        />
        <Input
          placeholder="Horas noturnas"
          type="text"
          setSelectedValue={setNocturneHours}
          defaultValue={selectedWorker?.nocturne_hours}
          label={"Horas noturnas"}
        />
        <Select
          placeholder="Periculosidade"
          options={trueFalseOptions}
          setSelectedValue={setDangerousness}
          defaultValue={{ value: selectedWorker?.dangerousness, label: selectedWorker?.dangerousness ? "sim" : "não" }}
          label={"Periculosidade"}
        />
        <Select
          placeholder="Insalubridade"
          options={trueFalseOptions}
          setSelectedValue={setUnhealthy}
          defaultValue={{ value: selectedWorker?.unhealthy, label: selectedWorker?.unhealthy ? "sim" : "não" }}
          label={"Periculosidade"}
        />
        <Select
          placeholder="Método de pagamento"
          options={[
            { value: 1, label: "dinheiro" },
            { value: 2, label: "cheque" },
          ]}
          setSelectedValue={setWagePaymentMethod}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Editar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditWorkerModal
