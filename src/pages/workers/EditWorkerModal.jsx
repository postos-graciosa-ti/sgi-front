import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Input from '../../components/form/Input'
import Select from "../../components/form/Select"
import useUserSessionStore from '../../data/userSession'
import useWorkersExperienceTimeStore from '../../data/workersExperienceTime'
import loadBanksOptions from '../../requests/loadOptions/loadBanksOptions'
import loadCitiesOptions from '../../requests/loadOptions/loadCitiesOptions'
import loadCivilStatusOptions from '../../requests/loadOptions/loadCivilStatusOptions'
import loadCostCenterOptions from '../../requests/loadOptions/loadCostCenterOptions'
import loadDepartmentsOptions from '../../requests/loadOptions/loadDepartmentsOptions'
import loadEthnicitiesOptions from '../../requests/loadOptions/loadEthnicitiesOptions'
import loadFunctionsOptions from '../../requests/loadOptions/loadFunctionsOptions'
import loadGendersOptions from '../../requests/loadOptions/loadGendersOptions'
import loadNeighborhoodsOptions from '../../requests/loadOptions/loadNeighborhoodsOptions'
import loadSchoolLevels from '../../requests/loadOptions/loadSchoolLevels'
import loadStatesOptions from '../../requests/loadOptions/loadStatesOptions'
import loadTurnsOptions from '../../requests/loadOptions/loadTurnsOptions'
import api from '../../services/api'
import loadNationalitiesOptions from '../../requests/loadOptions/loadNationalitiesOptions'

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

  const [nationalityOptions, setNationalityOptions] = useState()

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

  const [birthstateOptions, setBirthstateOptions] = useState()

  const [birthcityOptions, setBirthcityOptions] = useState()

  const [childrenName, setChildrenName] = useState()

  const [childrenCitiesStates, setChildrenCitiesStates] = useState()

  const [childrenCpf, setChildrenCpf] = useState()

  const [cbo, setCbo] = useState()

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
    loadNationalitiesOptions(setNationalityOptions)
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

  useEffect(() => {
    if (selectedNationality) {
      api
        .get(`/nationalities/${selectedNationality?.value}/states`)
        .then((response) => {
          let options = response?.data.map((state) => ({ value: state.id, label: state.name }))

          setBirthstateOptions(options)
        })
    }
  }, [selectedNationality])

  useEffect(() => {
    if (selectedBirthstate) {
      api
        .get(`/states/${selectedBirthstate.value}/cities`)
        .then((response) => {
          let options = response?.data.map((city) => ({ value: city.id, label: city.name }))

          setBirthcityOptions(options)
        })
    }
  }, [selectedBirthstate])

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
    let childrenData = `["name": ${childrenName}, "citystate": ${childrenCitiesStates}, "cpf": ${childrenCpf}]`

    let formData = {
      "name": name || selectedWorker?.worker_name,
      "function_id": selectedFunction?.value || selectedWorker?.function_id,
      "subsidiarie_id": selectedSubsdiarie?.value,
      "is_active": true,
      "turn_id": selectedTurn?.value || selectedWorker?.turn_id,
      "cost_center_id": selectedCostCenter?.value || selectedWorker?.cost_center_id,
      "department_id": selectedDepartment?.value || selectedWorker?.department_id,
      "admission_date": admissionDate || selectedWorker?.admission_date,
      "resignation_date": admissionDate || selectedWorker?.admission_date,
      "enrolment": enrolment,
      "sales_code": salesCode,
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
      "children_data": childrenData,
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
      "cbo": cbo
    }

    api
      .put(`/workers/${selectedWorker.worker_id}`, formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={editWorkerModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar colaborador</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-4">
            <Input
              type="text"
              label={"Nome"}
              setSelectedValue={setName}
              required={true}
              defaultValue={selectedWorker?.worker_name}
            />

            <Select
              placeholder=""
              label={"Função"}
              options={functionsOptions}
              setSelectedValue={setSelectedFunction}
              required={true}
              defaultValue={functionsOptions?.find((option) => option.value == selectedWorker?.function_id)}
            />

            <Select
              placeholder=""
              label={"Turnos"}
              options={turnsOptions}
              setSelectedValue={setSelectedTurn}
              required={true}
              defaultValue={turnsOptions?.find((option) => option.value == selectedWorker?.turn_id)}
            />

            <Select
              label={"Centro de custos"}
              placeholder=""
              options={costCenterOptions}
              setSelectedValue={setSelectedCostCenter}
              required={true}
              defaultValue={costCenterOptions?.find((option) => option.value == selectedWorker?.cost_center_id)}
            />

            <Select
              label={"Setor"}
              placeholder=""
              options={departmentsOptions}
              setSelectedValue={setSelectedDepartment}
              required={true}
              defaultValue={departmentsOptions?.find((option) => option.value == selectedWorker?.department_id)}
            />

            <Input
              type="date"
              setSelectedValue={setAdmissionDate}
              label={"Data de admissão"}
              required={true}
              defaultValue={selectedWorker?.admission_date}
            />

            <Input
              type="text"
              label={"CPF"}
              setSelectedValue={setCpf}
              defaultValue={selectedWorker?.cpf}
            />

            <Input
              type="text"
              label={"RG"}
              setSelectedValue={setRg}
              defaultValue={selectedWorker?.rg}
            />

            <Input
              type="text"
              // placeholder='Órgão emissor'
              label={"Órgão emissor"}
              setSelectedValue={setRgIssuingAgency}
              defaultValue={selectedWorker?.rg_issuing_agency}
            />

            <Select
              placeholder=""
              label={"Estado"}
              options={statesOptions}
              setSelectedValue={setRgState}
              defaultValue={statesOptions?.find((option) => option.value == selectedWorker?.rg_state?.id)}
            />

            <Input
              type="date"
              setSelectedValue={setRgExpeditionDate}
              label={"Data de expedição"}
              defaultValue={selectedWorker?.rg_expedition_date}
            />

            <Input
              type="text"
              label={"Telefone fixo"}
              setSelectedValue={setSelectedPhone}
              defaultValue={selectedWorker?.phone}
            />

            <Input
              type="text"
              label={"Celular"}
              setSelectedValue={setSelectedMobile}
              defaultValue={selectedWorker?.mobile}
            />

            <Input
              type="email"
              label={"E-mail"}
              setSelectedValue={setEmail}
              defaultValue={selectedWorker?.email}
            />

            <Input
              type="text"
              setSelectedValue={setPis}
              label={"PIS"}
              defaultValue={selectedWorker?.pis}
            />

            <Input
              type={"date"}
              setSelectedValue={setPisRegisterDate}
              label={"Data de cadastro"}
              defaultValue={selectedWorker?.pis_register_date}
            />

            <Input
              type="text"
              label={"CTPS"}
              setSelectedValue={setCtps}
              defaultValue={selectedWorker?.ctps}
            />

            <Input
              type="text"
              label={"Série"}
              setSelectedValue={setCtpsSerie}
              defaultValue={selectedWorker?.ctps_serie}
            />

            <Select
              placeholder=""
              label={"UF"}
              options={statesOptions}
              setSelectedValue={setCtpsState}
              defaultValue={statesOptions?.find((option) => option.value == selectedWorker?.ctps_state?.id)}
            />

            <Input
              type="date"
              label="Data de emissão"
              setSelectedValue={setCtpsEmissionDate}
              defaultValue={selectedWorker?.ctps_emission_date}
            />

            <Select
              placeholder=""
              label={"Escolaridade"}
              options={schoolLevelsOptions}
              setSelectedValue={setSelectedSchoolLevel}
              defaultValue={schoolLevelsOptions?.find((option) => option.value == selectedWorker?.school_level?.id)}
            />

            <Input
              label={"Número de emergência"}
              type="text"
              setSelectedValue={setEmergencyNumber}
              defaultValue={selectedWorker?.emergency_number}
            />

            <Input
              type="text"
              label={"E-social"}
              setSelectedValue={setEsocial}
              defaultValue={selectedWorker?.emergency_number}
            />

            <Input
              type="text"
              label={"Código de acesso"}
              setSelectedValue={setEnrolment}
              defaultValue={selectedWorker?.worker_enrolment}
            />

            <Input
              type="text"
              label={"Código de ponto"}
              setSelectedValue={setTimecode}
              defaultValue={selectedWorker?.timecode}
            />
          </div>

          <div className="col-4">
            <Input
              type="date"
              setSelectedValue={setBirthdate}
              label={"Data de nascimento"}
              defaultValue={selectedWorker?.birthdate}
            />

            <Select
              placeholder=""
              label={"Gênero"}
              options={gendersOptions}
              setSelectedValue={setSelectedGender}
              defaultValue={gendersOptions?.find((option) => option.value == selectedWorker?.gender?.id)}
            />

            <Select
              label={"Estado civil"}
              placeholder=""
              options={civilStatusOptions}
              setSelectedValue={setSelectedCivilStatus}
              defaultValue={civilStatusOptions?.find((option) => option.value == selectedWorker?.civil_status?.id)}
            />

            <Input
              type="text"
              label={"Logradouro"}
              setSelectedValue={setStreet}
              defaultValue={selectedWorker?.street}
            />

            <Input
              type="text"
              label={"Número"}
              setSelectedValue={setStreetNumber}
              defaultValue={selectedWorker?.street_number}
            />

            <Input
              type="text"
              label={"Complemento"}
              setSelectedValue={setStreetComplement}
              defaultValue={selectedWorker?.street_complement}
            />

            <Input
              type="text"
              label={"CEP"}
              setSelectedValue={setSelectedCep}
              defaultValue={selectedWorker?.cep}
            />

            <Select
              placeholder=""
              label={"Estado"}
              options={statesOptions}
              setSelectedValue={setSelectedState}
              defaultValue={statesOptions?.find((option) => option.value == selectedWorker?.state?.id)}
            />

            <Select
              placeholder=""
              label={"Cidade"}
              options={citiesOptions}
              setSelectedValue={setSelectedCity}
              defaultValue={citiesOptions?.find((option) => option.value == selectedWorker?.city?.id)}
            />

            <Select
              label={"Bairro"}
              placeholder=""
              options={neighborhoodOptions}
              setSelectedValue={setSelectedNeighborhood}
              defaultValue={neighborhoodOptions?.find((option) => option.value == selectedWorker?.city?.id)}
            />

            <Select
              label={"Etnia"}
              placeholder=""
              options={ethnicitiesOptions}
              setSelectedValue={setSelectedEthnicity}
            />

            <Select
              label={"Nacionalidade"}
              placeholder=""
              options={nationalityOptions}
              setSelectedValue={setSelectedNationality}
            />

            <Select
              label={"Estado de nascimento"}
              placeholder=""
              options={birthstateOptions}
              setSelectedValue={setSelectedBirthstate}
            />

            <Select
              label={"Cidade de nascimento"}
              placeholder=""
              options={birthcityOptions}
              setSelectedValue={setBirthcity}
            />

            <Input
              type="text"
              label={"Nome do pai"}
              // placeholder="Nome do pai"
              setSelectedValue={setFathername}
            />

            <Input
              type="text"
              label={"Nome da mãe"}
              // placeholder="Nome da mãe"
              setSelectedValue={setMothername}
            />

            <Input
              type="text"
              label="Certificado de reservista"
              setSelectedValue={setMilitaryCertNumber}
            />

            <Input
              type="text"
              label='Título de eleitor'
              setSelectedValue={setVotantTitle}
            />

            <Input
              type="text"
              label='Zona'
              setSelectedValue={setVotantZone}
            />

            <Input
              type="text"
              setSelectedValue={setVotantSession}
              label="Sessão"
            />

            <Input
              type="text"
              label="CNH"
              setSelectedValue={setCnh}
            />

            <Input
              type="text"
              label="Categoria"
              setSelectedValue={setCnhCategory}
            />

            <Input
              type="date"
              label="Data de emissão"
              setSelectedValue={setCnhEmissionDate}
            />

            <Input
              type="date"
              label="Validade"
              setSelectedValue={setCnhValidDate}
            />

            <Select
              placeholder={""}
              label="Primeiro emprego?"
              options={trueFalseOptions}
              setSelectedValue={setFirstJob}
            />
          </div>

          <div className="col-4">
            <Select
              placeholder={""}
              label="Já foi empregado da empresa?"
              options={trueFalseOptions}
              setSelectedValue={setWasEmployee}
            />

            <Select
              placeholder={""}
              label="Contribuição sindical nesse ano?"
              options={trueFalseOptions}
              setSelectedValue={setUnionContributeCurrentYear}
            />

            <Select
              placeholder={""}
              label="Recebendo seguro-desemprego?"
              options={trueFalseOptions}
              setSelectedValue={setReceivingUnemploymentInsurance}
            />

            <Select
              placeholder={""}
              label="Experiência prévia na função?"
              options={trueFalseOptions}
              setSelectedValue={setPreviousExperience}
            />

            <Input
              label="Mensalista"
              type="text"
              setSelectedValue={setMonthWage}
            />

            <Input
              label="Valor/horista"
              type="text"
              setSelectedValue={setHourWage}
            />

            <Input
              label="Proporcional a jornada"
              type="text"
              setSelectedValue={setJourneyWage}
            />

            <Select
              placeholder={""}
              label="Vale transporte"
              options={trueFalseOptions}
              setSelectedValue={setTransportVoucher}
            />

            <Input
              label="Carga diária"
              type="text"
              setSelectedValue={setDiaryWorkJourney}
            />

            <Input
              label="Carga semanal"
              type="text"
              setSelectedValue={setWeekWorkJourney}
            />

            <Input
              label="Carga mensal"
              type="text"
              setSelectedValue={setMonthWorkJourney}
            />

            <Select
              placeholder={""}
              label="Tempo de experiência"
              options={experienceTimeOptions}
              setSelectedValue={setExperienceTime}
            />

            <Input
              label="Horas noturnas"
              type="text"
              setSelectedValue={setNocturneHours}
            />

            <Select
              placeholder={""}
              label="Periculosidade"
              options={trueFalseOptions}
              setSelectedValue={setDangerousness}
            />

            <Select
              placeholder={""}
              label="Insalubridade"
              options={trueFalseOptions}
              setSelectedValue={setUnhealthy}
            />

            <Select
              placeholder={""}
              label="Método de pagamento"
              options={[
                { value: 1, label: "dinheiro" },
                { value: 2, label: "cheque" },
              ]}
              setSelectedValue={setWagePaymentMethod}
            />

            <Input
              label="Código geral de função"
              type="text"
              setSelectedValue={setCodeGeneralFunction}
            />

            <Input
              label="Salário"
              type="text"
              setSelectedValue={setWage}
            />

            <Input
              label="Data de última função"
              type="text"
              setSelectedValue={setLastFunctionDate}
            />

            <Input
              label="Tempo na função atual"
              type="text"
              setSelectedValue={setCurrentFunctionTime}
            />

            <Select
              placeholder={""}
              label="Banco"
              options={banksOptions}
              setSelectedValue={setSelectedBankOption}
            />

            <Input
              label="Agência do banco"
              type="text"
              setSelectedValue={setBankAgency}
            />

            <Input
              label="Conta do banco"
              type="text"
              setSelectedValue={setBankAccount}
            />

            <Input
              label="CBO"
              type="text"
              setSelectedValue={setCbo}
            />

            <Select
              placeholder=""
              label="Filhos menores de 14?"
              options={trueFalseOptions}
              setSelectedValue={setHasChildren}
            />

            {
              hasChildren?.value == true && (
                <div className="row">
                  <div className="col">
                    <Input
                      type="text"
                      label="Nome"
                      setSelectedValue={setChildrenName}
                    />
                  </div>

                  <div className="col">
                    <Input
                      type="text"
                      label="Cidade/estado"
                      setSelectedValue={setChildrenCitiesStates}
                    />
                  </div>

                  <div className="col">
                    <Input
                      type="text"
                      label="CPF"
                      setSelectedValue={setChildrenCpf}
                    />
                  </div>
                </div>
              ) || (<></>)
            }
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Editar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditWorkerModal
