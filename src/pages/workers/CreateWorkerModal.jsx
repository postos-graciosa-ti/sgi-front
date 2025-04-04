import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Input from '../../components/form/Input'
import Select from "../../components/form/Select"
import useUserSessionStore from '../../data/userSession'
import useWorkersExperienceTimeStore from "../../data/workersExperienceTime"
import loadBanksOptions from "../../requests/loadOptions/loadBanksOptions"
import loadCitiesOptions from "../../requests/loadOptions/loadCitiesOptions"
import loadCivilStatusOptions from '../../requests/loadOptions/loadCivilStatusOptions'
import loadCostCenterOptions from '../../requests/loadOptions/loadCostCenterOptions'
import loadDepartmentsOptions from '../../requests/loadOptions/loadDepartmentsOptions'
import loadEthnicitiesOptions from "../../requests/loadOptions/loadEthnicitiesOptions"
import loadFunctionsOptions from '../../requests/loadOptions/loadFunctionsOptions'
import loadGendersOptions from "../../requests/loadOptions/loadGendersOptions"
import loadNeighborhoodsOptions from "../../requests/loadOptions/loadNeighborhoodsOptions"
import loadSchoolLevels from "../../requests/loadOptions/loadSchoolLevels"
import loadStatesOptions from "../../requests/loadOptions/loadStatesOptions"
import loadTurnsOptions from "../../requests/loadOptions/loadTurnsOptions"
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

  const trueFalseOptions = [
    { value: true, label: "sim" },
    { value: false, label: "não" },
  ]

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

  const [codeGeneralFunction, setCodeGeneralFunction] = useState()

  const [wage, setWage] = useState()

  const [lastFunctionDate, setLastFunctionDate] = useState()

  const [currentFunctionTime, setCurrentFunctionTime] = useState()

  const [schoolLevelsOptions, setSchoolLevelsOptions] = useState()

  const [selectedSchoolLevel, setSelectedSchoolLevel] = useState()

  const [emergencyNumber, setEmergencyNumber] = useState()

  const [banksOptions, setBanksOptions] = useState()

  const [selectedBankOption, setSelectedBankOption] = useState()

  const [bankAgency, setBankAgency] = useState()

  const [bankAccount, setBankAccount] = useState()

  useEffect(() => {
    loadFunctionsOptions(selectedSubsdiarie, setFunctionsOptions)
    loadTurnsOptions(selectedSubsdiarie, setTurnsOptions)
    loadCostCenterOptions(setCostCenterOptions)
    loadDepartmentsOptions(setDepartmentsOptions)
    loadGendersOptions(setGendersOptions)
    loadCivilStatusOptions(setCivilStatusOptions)
    loadStatesOptions(setStatesOptions)
    loadEthnicitiesOptions(setEthnicitiesOptions)
    loadSchoolLevels(setSchoolLevelsOptions)
    loadBanksOptions(setBanksOptions)
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
      // "picture": cloudinaryResponse?.data.secure_url,
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
      "general_function_code": codeGeneralFunction,
      "wage": wage,
      "last_function_date": lastFunctionDate,
      "current_function_time": currentFunctionTime,
      "school_level": selectedSchoolLevel?.value,
      "emergency_number": emergencyNumber,
      "bank": selectedBankOption?.value,
      "bank_agency": bankAgency,
      "bank_account": bankAccount,
    }

    api
      .post("/workers", formData)
      .then(() => handleClose())

    // let cloudinaryEndpoint = import.meta.env.VITE_CLOUDINARY_ENDPOINT

    // const cloudinaryFormData = new FormData()

    // cloudinaryFormData.append("file", picture)

    // cloudinaryFormData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET)

    // axios
    //   .post(cloudinaryEndpoint, cloudinaryFormData)
    //   .then((cloudinaryResponse) => {
    //     let formData = {
    //       "name": name,
    //       "function_id": selectedFunction.value,
    //       "subsidiarie_id": selectedSubsdiarie.value,
    //       "is_active": true,
    //       "turn_id": selectedTurn.value,
    //       "cost_center_id": selectedCostCenter.value,
    //       "department_id": selectedDepartment.value,
    //       "admission_date": admissionDate,
    //       "resignation_date": admissionDate,
    //       "enrolment": enrolment,
    //       "sales_code": salesCode,
    //       "picture": cloudinaryResponse?.data.secure_url,
    //       "timecode": timecode,
    //       "esocial": esocial,
    //       "gender_id": selectedGender?.value,
    //       "civil_status_id": selectedCivilStatus?.value,
    //       "street": street,
    //       "street_number": streetNumber,
    //       "street_complement": streetComplement,
    //       "neighborhood_id": selectedNeighborhood?.value,
    //       "cep": cep,
    //       "city": selectedCity?.value,
    //       "state": selectedState?.value,
    //       "phone": selectedPhone,
    //       "mobile": selectedMobile,
    //       "email": email,
    //       "ethnicity_id": selectedEthnicity?.value,
    //       "birthdate": birthdate,
    //       "birthcity": birthcity?.value,
    //       "birthstate": selectedBirthstate?.value,
    //       "nationality": selectedNationality?.value,
    //       "fathername": fathername,
    //       "mothername": mothername,
    //       "has_children": hasChildren?.value,
    //       "children_data": "[]",
    //       "cpf": cpf,
    //       "rg": rg,
    //       "rg_issuing_agency": rgIssuingAgency,
    //       "rg_state": rgState?.value,
    //       "rg_expedition_date": rgExpeditionDate,
    //       "military_cert_number": militaryCertNumber,
    //       "pis": pis,
    //       "pis_register_date": pisRegisterDate,
    //       "vontant_title": votantTitle,
    //       "votant_zone": votantZone,
    //       "votant_session": votantSession,
    //       "ctps": ctps,
    //       "ctps_serie": ctpsSerie,
    //       "ctps_state": ctpsState?.value,
    //       "ctps_emission_date": ctpsEmissionDate,
    //       "cnh": cnh,
    //       "cnh_category": cnhCategory,
    //       "cnh_emition_date": cnhEmissionDate,
    //       "cnh_valid_date": cnhValidDate,
    //       "firstJob": firstJob?.value,
    //       "was_employee": wasEmployee?.value,
    //       "union_contribute_current_year": unionContributeCurrentYear?.value,
    //       "receiving_unemployment_insurance": receivingUnemploymentInsurance?.value,
    //       "previous_experience": previousExperience?.value,
    //       "month_wage": monthWage,
    //       "hour_wage": hourWage,
    //       "journey_wage": journeyWage,
    //       "transport_voucher": transportVoucher?.value,
    //       "transport_voucher_quantity": transportVoucherQuantity,
    //       "diary_workjourney": diaryWorkJourney,
    //       "week_workjourney": weekWorkJourney,
    //       "month_workjourney": monthWorkJourney,
    //       "experience_time": experienceTime?.value,
    //       "nocturne_hours": nocturneHours,
    //       "dangerousness": dangerousness?.value,
    //       "unhealthy": unhealthy?.value,
    //       "wage_payment_method": wagePaymentMethod?.value,
    //       "general_function_code": codeGeneralFunction,
    //       "wage": wage,
    //       "last_function_date": lastFunctionDate,
    //       "current_function_time": currentFunctionTime,
    //       "school_level": selectedSchoolLevel?.value,
    //       "emergency_number": emergencyNumber,
    //       "bank": selectedBankOption?.value,
    //       "bank_agency": bankAgency,
    //       "bank_account": bankAccount,
    //     }

    //     api
    //       .post("/workers", formData)
    //       .then(() => handleClose())
    //   })
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
          <Input
            type="text"
            placeholder="E-Social"
            setSelectedValue={setEsocial}
          />
          <Input
            type="text"
            placeholder="Matrícula"
            setSelectedValue={setEnrolment}
          />
          <Input
            type="text"
            placeholder="Código de vendas"
            setSelectedValue={setSalesCode}
          />
          <Input
            type="text"
            placeholder="Código de ponto"
            setSelectedValue={setTimecode}
          />
          <Input
            type="text"
            placeholder="Nome"
            setSelectedValue={setName}
          />
          <Select
            placeholder="Função"
            options={functionsOptions}
            setSelectedValue={setSelectedFunction}
          />
          <Select
            placeholder="Turnos"
            options={turnsOptions}
            setSelectedValue={setSelectedTurn}
          />
          <Select
            placeholder="Centro de custos"
            options={costCenterOptions}
            setSelectedValue={setSelectedCostCenter}
          />
          <Select
            placeholder="Setor"
            options={departmentsOptions}
            setSelectedValue={setSelectedDepartment}
          />
          <Input
            type="date"
            setSelectedValue={setAdmissionDate}
            label={"Data de admissão"}
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
          />
          <Select
            placeholder="Estado civil"
            options={civilStatusOptions}
            setSelectedValue={setSelectedCivilStatus}
          />
          <Input
            type="text"
            placeholder="Logradouro"
            setSelectedValue={setStreet}
          />
          <Input
            type="text"
            placeholder="Número"
            setSelectedValue={setStreetNumber}
          />
          <Input
            type="text"
            placeholder="Complemento"
            setSelectedValue={setStreetComplement}
          />
          <Input
            type="text"
            placeholder="CEP"
            setSelectedValue={setSelectedCep}
          />
          <Select
            placeholder="Estado"
            options={statesOptions}
            setSelectedValue={setSelectedState}
          />
          <Select
            placeholder="Cidade"
            options={citiesOptions}
            setSelectedValue={setSelectedCity}
          />
          <Select
            placeholder="Bairro"
            options={neighborhoodOptions}
            setSelectedValue={setSelectedNeighborhood}
          />
          <Input
            type="text"
            placeholder="Telefone fixo"
            setSelectedValue={setSelectedPhone}
          />
          <Input
            type="text"
            placeholder="Celular"
            setSelectedValue={setSelectedMobile}
          />
          <Input
            type="email"
            placeholder="E-mail"
            setSelectedValue={setEmail}
          />
          <Select
            placeholder="Etnia"
            options={ethnicitiesOptions}
            setSelectedValue={setSelectedEthnicity}
          />
          <Input
            type="date"
            setSelectedValue={setBirthdate}
            label={"Data de nascimento"}
          />
          <Select
            placeholder="Nacionalidade"
            options={nationalityOptions}
            setSelectedValue={setSelectedNationality}
          />
          <Select
            placeholder="Estado de nascimento"
            options={statesOptions}
            setSelectedValue={setSelectedBirthstate}
          />
          <Select
            placeholder="Cidade de nascimento"
            options={citiesOptions}
            setSelectedValue={setBirthcity}
          />
          <Input
            type="text"
            placeholder="Nome do pai"
            setSelectedValue={setFathername}
          />
          <Input
            type="text"
            placeholder="Nome da mãe"
            setSelectedValue={setMothername}
          />
          <Select
            placeholder="Filhos menores de 14?"
            options={trueFalseOptions}
            setSelectedValue={setHasChildren}
          />
          <Input
            type="text"
            placeholder="CPF"
            setSelectedValue={setCpf}
          />
          <Input
            type="text"
            placeholder='RG'
            setSelectedValue={setRg}
          />
          <Input
            type="text"
            placeholder='Órgão emissor'
            setSelectedValue={setRgIssuingAgency}
          />
          <Select
            placeholder="Estado de RG"
            options={statesOptions}
            setSelectedValue={setRgState}
          />
          <Input
            type="date"
            setSelectedValue={setRgExpeditionDate}
            label={"Data de expedição de RG"}
          />
          <Input
            type="text"
            placeholder="Certificado de reservista"
            setSelectedValue={setMilitaryCertNumber}
          />
          <Input
            type="text"
            placeholder='PIS'
            setSelectedValue={setPis}
          />
          <Input
            type={"date"}
            setSelectedValue={setPisRegisterDate}
            label={"Data de cadastro de PIS"}
          />
          <Input
            type="text"
            placeholder='Título de eleitor'
            setSelectedValue={setVotantTitle}
          />
          <Input
            type="text"
            placeholder='Zona de eleitor'
            setSelectedValue={setVotantZone}
          />
          <Input
            type="text"
            setSelectedValue={setVotantSession}
            placeholder="Sessão de eleitor"
          />
          <Input
            type="text"
            placeholder='CTPS'
            setSelectedValue={setCtps}
          />
          <Input
            type="text"
            placeholder="Série de CTPS"
            setSelectedValue={setCtpsSerie}
          />
          <Select
            placeholder="UF CTPS"
            options={statesOptions}
            setSelectedValue={setCtpsState}
          />
          <Input
            type="date"
            label="Data de emissão CTPS"
            setSelectedValue={setCtpsEmissionDate}
          />
          <Input
            type="text"
            placeholder="CNH"
            setSelectedValue={setCnh}
          />
          <Input
            type="text"
            placeholder="Categoria de CNH"
            setSelectedValue={setCnhCategory}
          />
          <Input
            type="date"
            label="Data de emissão de CNH"
            setSelectedValue={setCnhEmissionDate}
          />
          <Input
            type="date"
            label="Validade de CNH"
            setSelectedValue={setCnhValidDate}
          />
          <Select
            placeholder="Primeiro emprego?"
            options={trueFalseOptions}
            setSelectedValue={setFirstJob}
          />
          <Select
            placeholder="Já foi empregado da empresa?"
            options={trueFalseOptions}
            setSelectedValue={setWasEmployee}
          />
          <Select
            placeholder="Contribuição sindical nesse ano?"
            options={trueFalseOptions}
            setSelectedValue={setUnionContributeCurrentYear}
          />
          <Select
            placeholder="Recebendo seguro-desemprego?"
            options={trueFalseOptions}
            setSelectedValue={setReceivingUnemploymentInsurance}
          />
          <Select
            placeholder="Experiência prévia na função?"
            options={trueFalseOptions}
            setSelectedValue={setPreviousExperience}
          />
          <Input
            placeholder="Mensalista"
            type="text"
            setSelectedValue={setMonthWage}
          />
          <Input
            placeholder="Valor/horista"
            type="text"
            setSelectedValue={setHourWage}
          />
          <Input
            placeholder="Proporcional a jornada"
            type="text"
            setSelectedValue={setJourneyWage}
          />
          <Select
            placeholder="Vale transporte"
            options={trueFalseOptions}
            setSelectedValue={setTransportVoucher}
          />
          <Input
            placeholder="Quantidade vale transporte"
            type="number"
            setSelectedValue={setTransportVoucherQuantity}
          />
          <Input
            placeholder="Carga diária"
            type="text"
            setSelectedValue={setDiaryWorkJourney}
          />
          <Input
            placeholder="Carga semanal"
            type="text"
            setSelectedValue={setWeekWorkJourney}
          />
          <Input
            placeholder="Carga mensal"
            type="text"
            setSelectedValue={setMonthWorkJourney}
          />
          <Select
            placeholder="Tempo de experiência"
            options={experienceTimeOptions}
            setSelectedValue={setExperienceTime}
          />
          <Input
            placeholder="Horas noturnas"
            type="text"
            setSelectedValue={setNocturneHours}
          />
          <Select
            placeholder="Periculosidade"
            options={trueFalseOptions}
            setSelectedValue={setDangerousness}
          />
          <Select
            placeholder="Insalubridade"
            options={trueFalseOptions}
            setSelectedValue={setUnhealthy}
          />
          <Select
            placeholder="Método de pagamento"
            options={[
              { value: 1, label: "dinheiro" },
              { value: 2, label: "cheque" },
            ]}
            setSelectedValue={setWagePaymentMethod}
          />
          <Input
            placeholder="Código geral de função"
            type="text"
            setSelectedValue={setCodeGeneralFunction}
          />
          <Input
            placeholder="Salário"
            type="text"
            setSelectedValue={setWage}
          />
          <Input
            placeholder="Data de última função"
            type="text"
            setSelectedValue={setLastFunctionDate}
          />
          <Input
            placeholder="Tempo na função atual"
            type="text"
            setSelectedValue={setCurrentFunctionTime}
          />
          <Select
            placeholder="Escolaridade"
            options={schoolLevelsOptions}
            setSelectedValue={setSelectedSchoolLevel}
          />
          <Input
            placeholder="Número de emergência"
            type="text"
            setSelectedValue={setEmergencyNumber}
          />
          <Select
            placeholder="Banco"
            options={banksOptions}
            setSelectedValue={setSelectedBankOption}
          />
          <Input
            placeholder="Agência do banco"
            type="text"
            setSelectedValue={setBankAgency}
          />
          <Input
            placeholder="Conta do banco"
            type="text"
            setSelectedValue={setBankAccount}
          />
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