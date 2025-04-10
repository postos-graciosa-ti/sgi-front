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
    loadCitiesOptions(selectedState, setCitiesOptions)
    loadNeighborhoodsOptions(selectedCity, setNeighborhoodOptions)

    api
      .get(`/states`)
      .then((response) => {
        let options = response?.data.map((state) => ({ value: state.id, label: state.name }))

        setBirthstateOptions(options)
      })

    api
      .get(`/cities`)
      .then((response) => {
        let options = response?.data.map((city) => ({ value: city.id, label: city.name }))

        setBirthcityOptions(options)
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
        <div>
          <h4>Dados pessoais</h4>
        </div>

        <div className="row">
          <div className="col">
            <Input
              type="text"
              label={"Nome"}
              setSelectedValue={setName}
              required={true}
              defaultValue={selectedWorker?.worker_name}
            />
          </div>

          <div className="col">
            <Select
              placeholder=""
              label={"Gênero"}
              options={gendersOptions}
              setSelectedValue={setSelectedGender}
              defaultValue={gendersOptions?.find((option) => option.value == selectedWorker?.gender?.id)}
            />
          </div>

          <div className="col">
            <Select
              label={"Estado civil"}
              placeholder=""
              options={civilStatusOptions}
              setSelectedValue={setSelectedCivilStatus}
              defaultValue={civilStatusOptions?.find((option) => option.value == selectedWorker?.civil_status?.id)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Input
              label={"Número de emergência"}
              type="text"
              setSelectedValue={setEmergencyNumber}
              defaultValue={selectedWorker?.emergency_number}
            />
          </div>

          <div className="col">
            <Input
              type="text"
              label={"E-social"}
              setSelectedValue={setEsocial}
              defaultValue={selectedWorker?.esocial}
            />
          </div>

          <div className="col">
            <Input
              type="text"
              label={"Código de acesso"}
              setSelectedValue={setEnrolment}
              defaultValue={selectedWorker?.worker_enrolment}
            />
          </div>

          <div className="col">
            <Input
              type="text"
              label={"Código de ponto"}
              setSelectedValue={setTimecode}
              defaultValue={selectedWorker?.timecode}
            />
          </div>
        </div>

        <div>
          <h4>Endereço residencial</h4>
        </div>

        <div className="row">
          <div className="col">
            <Input
              type="text"
              label={"Logradouro"}
              setSelectedValue={setStreet}
              defaultValue={selectedWorker?.street}
            />

            <Input
              type="text"
              label={"CEP"}
              setSelectedValue={setSelectedCep}
              defaultValue={selectedWorker?.cep}
            />
          </div>

          <div className="col">
            <Input
              type="text"
              label={"Número"}
              setSelectedValue={setStreetNumber}
              defaultValue={selectedWorker?.street_number}
            />

            <Select
              placeholder=""
              label={"Estado"}
              options={statesOptions}
              setSelectedValue={setSelectedState}
              defaultValue={statesOptions?.find((option) => option.value == selectedWorker?.state?.id)}
            />
          </div>

          <div className="col">
            <Input
              type="text"
              label={"Complemento"}
              setSelectedValue={setStreetComplement}
              defaultValue={selectedWorker?.street_complement}
            />

            <div className="row">
              <div className="col">
                <Select
                  placeholder=""
                  label={"Cidade"}
                  options={citiesOptions}
                  setSelectedValue={setSelectedCity}
                  defaultValue={citiesOptions?.find((option) => option.value == selectedWorker?.city?.id)}
                />
              </div>

              <div className="col">
                <Select
                  label={"Bairro"}
                  placeholder=""
                  options={neighborhoodOptions}
                  setSelectedValue={setSelectedNeighborhood}
                  defaultValue={neighborhoodOptions?.find((option) => option.value == selectedWorker?.neighborhood?.id)}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4>Dados pessoais</h4>
        </div>

        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <Input
                  type="text"
                  label={"Telefone fixo"}
                  setSelectedValue={setSelectedPhone}
                  defaultValue={selectedWorker?.phone}
                />
              </div>

              <div className="col">
                <Input
                  type="text"
                  label={"Celular"}
                  setSelectedValue={setSelectedMobile}
                  defaultValue={selectedWorker?.mobile}
                />
              </div>
            </div>

            <Input
              type="date"
              setSelectedValue={setBirthdate}
              label={"Data de nascimento"}
              defaultValue={selectedWorker?.birthdate}
            />
          </div>

          <div className="col">
            <Input
              type="email"
              label={"E-mail"}
              setSelectedValue={setEmail}
              defaultValue={selectedWorker?.email}
            />

            <Select
              label={"Nacionalidade"}
              placeholder=""
              options={nationalityOptions}
              setSelectedValue={setSelectedNationality}
              defaultValue={nationalityOptions?.find((option) => option.value == selectedWorker?.nationality?.id)}
            />
          </div>

          <div className="col">
            <Select
              label={"Etnia"}
              placeholder=""
              options={ethnicitiesOptions}
              setSelectedValue={setSelectedEthnicity}
              defaultValue={ethnicitiesOptions?.find((option) => option.value == selectedWorker?.ethnicity?.id)}
            />

            <div className="row">
              <div className="col">
                <Select
                  placeholder=""
                  label={"Estado"}
                  options={statesOptions}
                  setSelectedValue={setSelectedState}
                  defaultValue={statesOptions?.find((option) => option.value == selectedWorker?.state?.id)}
                />
              </div>

              <div className="col">
                <Select
                  placeholder=""
                  label={"Cidade"}
                  options={citiesOptions}
                  setSelectedValue={setSelectedCity}
                  defaultValue={citiesOptions?.find((option) => option.value == selectedWorker?.city?.id)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Input
              type="text"
              label={"Nome da mãe"}
              setSelectedValue={setMothername}
              defaultValue={selectedWorker?.mothername}
            />
          </div>

          <div className="col">
            <Input
              type="text"
              label={"Nome do pai"}
              setSelectedValue={setFathername}
              defaultValue={selectedWorker?.fathername}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Select
              placeholder=""
              label="Filhos menores de 14?"
              options={trueFalseOptions}
              setSelectedValue={setHasChildren}
            // defaultValue={selectedWorker}
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

                  <div className="col">
                    <Input
                      type="text"
                      label="Livro"
                    // setSelectedValue={setChildrenCpf}
                    />
                  </div>

                  <div className="col">
                    <Input
                      type="text"
                      label="Folhas"
                    // setSelectedValue={setChildrenCpf}
                    />
                  </div>
                </div>
              ) || (<></>)
            }
          </div>
        </div>

        <div>
          <h4>Documentos</h4>
        </div>

        <div className="row">
          <div className="col">
            <Input
              type="text"
              label={"CPF"}
              setSelectedValue={setCpf}
              defaultValue={selectedWorker?.cpf}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <Input
                  type="text"
                  label={"RG"}
                  setSelectedValue={setRg}
                  defaultValue={selectedWorker?.rg}
                />
              </div>

              <div className="col">
                <Input
                  type="text"
                  label={"Órgão emissor"}
                  setSelectedValue={setRgIssuingAgency}
                  defaultValue={selectedWorker?.rg_issuing_agency}
                />
              </div>
            </div>
          </div>

          <div className="col">
            <Select
              placeholder=""
              label={"Estado"}
              options={statesOptions}
              setSelectedValue={setRgState}
              defaultValue={selectedWorker?.rg_state?.value}
            />
          </div>

          <div className="col">
            <div className="row">
              <div className="col">
                <Input
                  type="date"
                  setSelectedValue={setRgExpeditionDate}
                  label={"Data de expedição"}
                  defaultValue={setSelectedWorker?.rg_expedition_date}
                />
              </div>

              <div className="col">
                <Select
                  placeholder=""
                  label={"Escolaridade"}
                  options={schoolLevelsOptions}
                  setSelectedValue={setSelectedSchoolLevel}
                  defaultValue={selectedWorker?.school_level?.id}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Input
              type="text"
              label="Certificado de reservista"
              setSelectedValue={setMilitaryCertNumber}
              defaultValue={selectedWorker?.military_cert_number}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Input
              type="text"
              setSelectedValue={setPis}
              label={"PIS"}
            />
          </div>

          <div className="col">
            <Input
              type={"date"}
              setSelectedValue={setPisRegisterDate}
              label={"Data de cadastro"}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Input
              type="text"
              label='Título de eleitor'
              setSelectedValue={setVotantTitle}
            />
          </div>

          <div className="col">
            <Input
              type="text"
              label='Zona'
              setSelectedValue={setVotantZone}
            />
          </div>

          <div className="col">
            <Input
              type="text"
              setSelectedValue={setVotantSession}
              label="Sessão"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <Input
                  type="text"
                  label={"CTPS"}
                  setSelectedValue={setCtps}
                />
              </div>

              <div className="col">
                <Input
                  type="text"
                  label={"Série"}
                  setSelectedValue={setCtpsSerie}
                />
              </div>
            </div>
          </div>

          <div className="col">
            <div className="row">
              <div className="col">
                <Select
                  placeholder=""
                  label={"UF"}
                  options={statesOptions}
                  setSelectedValue={setCtpsState}
                />
              </div>

              <div className="col">
                <Input
                  type="date"
                  label="Data de emissão"
                  setSelectedValue={setCtpsEmissionDate}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <Input
                  type="text"
                  label="CNH"
                  setSelectedValue={setCnh}
                />
              </div>

              <div className="col">
                <Input
                  type="text"
                  label="Categoria"
                  setSelectedValue={setCnhCategory}
                />
              </div>
            </div>
          </div>

          <div className="col">
            <div className="row">
              <div className="col">
                <Input
                  type="date"
                  label="Data de emissão"
                  setSelectedValue={setCnhEmissionDate}
                />
              </div>

              <div className="col">
                <Input
                  type="date"
                  label="Validade"
                  setSelectedValue={setCnhValidDate}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <Select
                  placeholder={""}
                  label="Primeiro emprego?"
                  options={trueFalseOptions}
                  setSelectedValue={setFirstJob}
                />
              </div>

              <div className="col">
                <Select
                  placeholder={""}
                  label="Já foi empregado da empresa?"
                  options={trueFalseOptions}
                  setSelectedValue={setWasEmployee}
                />
              </div>
            </div>
          </div>

          <div className="col">
            <Select
              placeholder={""}
              label="Contribuição sindical nesse ano?"
              options={trueFalseOptions}
              setSelectedValue={setUnionContributeCurrentYear}
            />
          </div>

          <div className="col">
            <div className="row">
              <div className="col">
                <Select
                  placeholder={""}
                  label="Recebendo seguro-desemprego?"
                  options={trueFalseOptions}
                  setSelectedValue={setReceivingUnemploymentInsurance}
                />
              </div>

              <div className="col">
                <Select
                  placeholder={""}
                  label="Experiência prévia na função?"
                  options={trueFalseOptions}
                  setSelectedValue={setPreviousExperience}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4>Para preenchimento exclusivo da empresa - Dados de contratação</h4>
        </div>

        <div className="row">
          <div className="col">
            <Select
              placeholder=""
              label={"Função"}
              options={functionsOptions}
              setSelectedValue={setSelectedFunction}
              required={true}
            />
          </div>

          <div className="col">
            <Select
              placeholder=""
              label={"Turno"}
              options={turnsOptions}
              setSelectedValue={setSelectedTurn}
              required={true}
            />
          </div>

          <div className="col">
            <Select
              label={"Centro de custos"}
              placeholder=""
              options={costCenterOptions}
              setSelectedValue={setSelectedCostCenter}
              required={true}
            />
          </div>

          <div className="col">
            <Select
              label={"Setor"}
              placeholder=""
              options={departmentsOptions}
              setSelectedValue={setSelectedDepartment}
              required={true}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Input
              label="Código geral de função"
              type="text"
              setSelectedValue={setCodeGeneralFunction}
            />
          </div>

          <div className="col">
            <Input
              label="CBO"
              type="text"
              setSelectedValue={setCbo}
            />
          </div>

          <div className="col">
            <Input
              label="Data de última função"
              type="text"
              setSelectedValue={setLastFunctionDate}
            />
          </div>

          <div className="col">
            <Input
              label="Tempo na função atual"
              type="text"
              setSelectedValue={setCurrentFunctionTime}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Input
              type="date"
              setSelectedValue={setAdmissionDate}
              label={"Data de admissão"}
              required={true}
            />
          </div>

          <div className="col">
            <div className="row">
              <div className="col">
                <Input
                  label="Mensalista"
                  type="text"
                  setSelectedValue={setMonthWage}
                />
              </div>

              <div className="col">
                <Input
                  label="Valor/horista"
                  type="text"
                  setSelectedValue={setHourWage}
                />
              </div>

              <div className="col">
                <Input
                  label="Prop. a jornada"
                  type="text"
                  setSelectedValue={setJourneyWage}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <Select
                  placeholder={""}
                  label="Vale transporte"
                  options={trueFalseOptions}
                  setSelectedValue={setTransportVoucher}
                />
              </div>

              <div className="col">
                <Select
                  placeholder=""
                  label={"Turno"}
                  options={turnsOptions}
                  setSelectedValue={setSelectedTurn}
                  required={true}
                />
              </div>
            </div>
          </div>

          <div className="col">
            <div className="row">
              <div className="col">
                <Input
                  label="Carga diária"
                  type="text"
                  setSelectedValue={setDiaryWorkJourney}
                />
              </div>

              <div className="col">
                <Input
                  label="Carga semanal"
                  type="text"
                  setSelectedValue={setWeekWorkJourney}
                />
              </div>

              <div className="col">
                <Input
                  label="Carga mensal"
                  type="text"
                  setSelectedValue={setMonthWorkJourney}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Select
              placeholder={""}
              label="Tempo de experiência"
              options={experienceTimeOptions}
              setSelectedValue={setExperienceTime}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Select
              placeholder={""}
              label="Periculosidade"
              options={trueFalseOptions}
              setSelectedValue={setDangerousness}
            />
          </div>

          <div className="col">
            <Select
              placeholder={""}
              label="Insalubridade"
              options={trueFalseOptions}
              setSelectedValue={setUnhealthy}
            />
          </div>

          <div className="col">
            <Select
              placeholder={""}
              label="Método de pagamento"
              options={[
                { value: 1, label: "dinheiro" },
                { value: 2, label: "cheque" },
              ]}
              setSelectedValue={setWagePaymentMethod}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Select
              placeholder={""}
              label="Banco"
              options={banksOptions}
              setSelectedValue={setSelectedBankOption}
            />
          </div>

          <div className="col">
            <Input
              label="Agência do banco"
              type="text"
              setSelectedValue={setBankAgency}
            />
          </div>

          <div className="col">
            <Input
              label="Conta do banco"
              type="text"
              setSelectedValue={setBankAccount}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Input
              label="Horas noturnas"
              type="text"
              setSelectedValue={setNocturneHours}
            />
          </div>

          <div className="col">
            <Input
              label="Salário"
              type="text"
              setSelectedValue={setWage}
            />
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
