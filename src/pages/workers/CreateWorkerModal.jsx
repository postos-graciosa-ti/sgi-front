import moment from 'moment'
import { useEffect, useState } from 'react'
import { Plus } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Input from '../../components/form/Input'
import InputFile from '../../components/form/InputFile'
import Select from "../../components/form/Select"
import useUserSessionStore from '../../data/userSession'
import useWorkersExperienceTimeStore from "../../data/workersExperienceTime"
import loadBanksOptions from "../../requests/loadOptions/loadBanksOptions"
import loadCivilStatusOptions from '../../requests/loadOptions/loadCivilStatusOptions'
import loadCostCenterOptions from '../../requests/loadOptions/loadCostCenterOptions'
import loadDepartmentsOptions from '../../requests/loadOptions/loadDepartmentsOptions'
import loadEthnicitiesOptions from "../../requests/loadOptions/loadEthnicitiesOptions"
import loadFunctionsOptions from '../../requests/loadOptions/loadFunctionsOptions'
import loadGendersOptions from "../../requests/loadOptions/loadGendersOptions"
import loadNationalitiesOptions from "../../requests/loadOptions/loadNationalitiesOptions"
import loadSchoolLevels from "../../requests/loadOptions/loadSchoolLevels"
import loadStatesOptions from "../../requests/loadOptions/loadStatesOptions"
import loadTurnsOptions from "../../requests/loadOptions/loadTurnsOptions"
import loadWagePaymentMethodOptions from "../../requests/loadOptions/loadWagePaymentMethodOptions"
import getParentsType from '../../requests/parentsType/getParentsType'
import postWorkersParents from '../../requests/workersParents/postWorkersParents'
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

  const [hierarchyStructureOptions, setHierarchyStructureOptions] = useState()

  const [selectedHierarchyStructure, setSelectedHierarchyStructure] = useState()

  const [enterpriseTime, setEnterpriseTime] = useState()

  const [wagePaymentMethodOptions, setWagePaymentMethodOptions] = useState()

  const [parentsTypeOptions, setParentsTypeOptions] = useState()

  const [selectedParentsType, setSelectedParentsType] = useState()

  const [parentsName, setParentsName] = useState()

  const [parentsCpf, setParentsCpf] = useState()

  const [parentsDatebirth, setParentsDatebirth] = useState()

  const [parentsBooks, setParentsBooks] = useState()

  const [parentsPapers, setParentsPapers] = useState()

  const [parentsData, setParentsData] = useState()

  const [ctpsFile, setCtpsFile] = useState()

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
    loadWagePaymentMethodOptions(setWagePaymentMethodOptions)

    api
      .get(`/hierarchy-structure`)
      .then((response) => {
        let options = response?.data.map((hierarchyStructure) => ({ value: hierarchyStructure.id, label: hierarchyStructure.name }))

        setHierarchyStructureOptions(options)
      })

    getParentsType()
      .then((response) => {
        let options = response?.data.map((parentType) => ({ value: parentType.id, label: parentType.name }))

        setParentsTypeOptions(options)
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
      .then((response) => {
        let allWorkers = response.data

        let statusWorkers = allWorkers.filter((worker) => worker.worker_is_active == true && worker.is_away == false)

        let sortStatusWorkers = statusWorkers.sort()

        setWorkersList(sortStatusWorkers)
      })

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

    setHasChildren()

    setSelectedParentsType()

    setParentsName()

    setParentsCpf()

    setParentsDatebirth()

    setParentsBooks()

    setParentsPapers()

    setParentsData()

    setCreateWorkerModalOpen(false)
  }

  const handleWorkersParents = () => {
    setParentsData((prevState) => {
      if (prevState) {
        return [
          ...prevState,
          {
            "parentsType": selectedParentsType,
            "parentsName": parentsName,
            "parentsCpf": parentsCpf,
            "parentsDatebirth": parentsDatebirth,
            "parentsBooks": parentsBooks,
            "parentsPapers": parentsPapers,
          }
        ]
      } else {
        return [{
          "parentsType": selectedParentsType,
          "parentsName": parentsName,
          "parentsCpf": parentsCpf,
          "parentsDatebirth": parentsDatebirth,
          "parentsBooks": parentsBooks,
          "parentsPapers": parentsPapers,
        }]
      }
    })

    setSelectedParentsType()

    setParentsName()

    setParentsCpf()

    setParentsDatebirth()

    setParentsBooks()

    setParentsPapers()
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
      "cpf": cpf,
      "rg": rg,
      "rg_issuing_agency": rgIssuingAgency,
      "rg_state": rgState?.value,
      "rg_expedition_date": rgExpeditionDate,
      "military_cert_number": militaryCertNumber,
      "pis": pis,
      "pis_register_date": pisRegisterDate,
      "votant_title": votantTitle,
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
      "first_job": firstJob && true,
      "was_employee": wasEmployee && true,
      "union_contribute_current_year": unionContributeCurrentYear?.value && true,
      "receiving_unemployment_insurance": receivingUnemploymentInsurance?.value && true,
      "previous_experience": previousExperience?.value && true,
      "month_wage": monthWage,
      "hour_wage": hourWage,
      "journey_wage": journeyWage,
      "transport_voucher": transportVoucher?.value,
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
      "cbo": cbo,
      "hierarchy_structure": selectedHierarchyStructure?.value,
      "enterprise_time": enterpriseTime,
    }

    api
      .post("/workers", formData)
      .then(async (response) => {
        let newWorkerData = response?.data

        if (response.status == 200 && parentsData.length > 0) {
          const promises = parentsData.map((parentData) => {
            let formData = {
              worker_id: newWorkerData?.id,
              parent_type_id: parentData?.parentsType?.value,
              name: parentData?.parentsName,
              cpf: parentData?.parentsCpf,
              birthdate: parentData?.parentsDatebirth,
              books: parentData?.parentsBooks && parentData?.parentsBooks,
              papers: parentData?.parentsPapers && parentData?.parentsPapers,
            }

            return postWorkersParents(formData)
          })

          Promise.all(promises).then(() => {
            handleClose()
          })
        } else {
          handleClose()
        }
      })
  }

  return (
    <>
      <Modal
        show={createWorkerModalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar colaborador</Modal.Title>
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
              />
            </div>

            <div className="col">
              <Select
                placeholder=""
                label={"Gênero"}
                options={gendersOptions}
                setSelectedValue={setSelectedGender}
              />
            </div>

            <div className="col">
              <Select
                label={"Estado civil"}
                placeholder=""
                options={civilStatusOptions}
                setSelectedValue={setSelectedCivilStatus}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Input
                label={"Número de emergência"}
                type="text"
                setSelectedValue={setEmergencyNumber}
              />
            </div>

            <div className="col">
              <Input
                type="text"
                label={"E-social"}
                setSelectedValue={setEsocial}
              />
            </div>

            <div className="col">
              <Input
                type="text"
                label={"Código de acesso"}
                setSelectedValue={setEnrolment}
              />
            </div>

            <div className="col">
              <Input
                type="text"
                label={"Código de ponto"}
                setSelectedValue={setTimecode}
              />
            </div>
          </div>

          <div>
            <h4>Endereço residencial</h4>
          </div>

          {/* <div className="row">
            <div className="col">
              <Input
                type="text"
                label={"Logradouro"}
                setSelectedValue={setStreet}
              />

              <Input
                type="text"
                label={"CEP"}
                setSelectedValue={setSelectedCep}
              />
            </div>

            <div className="col">
              <Input
                type="text"
                label={"Número"}
                setSelectedValue={setStreetNumber}
              />

              <Select
                placeholder=""
                label={"Estado"}
                options={statesOptions}
                setSelectedValue={setSelectedState}
              />
            </div>

            <div className="col">
              <Input
                type="text"
                label={"Complemento"}
                setSelectedValue={setStreetComplement}
              />

              <div className="row">
                <div className="col">
                  <Select
                    placeholder=""
                    label={"Cidade"}
                    options={citiesOptions}
                    setSelectedValue={setSelectedCity}
                  />
                </div>

                <div className="col">
                  <Select
                    label={"Bairro"}
                    placeholder=""
                    options={neighborhoodOptions}
                    setSelectedValue={setSelectedNeighborhood}
                  />
                </div>
              </div>
            </div>
          </div> */}

          <div className="row">
            <div className="col">
              <Input
                type="text"
                label={"Logradouro"}
                setSelectedValue={setStreet}
              />
            </div>

            <div className="col">
              <Input
                type="text"
                label={"Número"}
                setSelectedValue={setStreetNumber}
              />
            </div>

            <div className="col">
              <Input
                type="text"
                label={"Complemento"}
                setSelectedValue={setStreetComplement}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Input
                type="text"
                label={"CEP"}
                setSelectedValue={setSelectedCep}
              />
            </div>

            <div className="col">
              <Select
                label={"Bairro"}
                placeholder=""
                options={neighborhoodOptions}
                setSelectedValue={setSelectedNeighborhood}
              />
            </div>
          </div>

          <div>
            <h4>Dados pessoais</h4>
          </div>

          {/* <div className="row">
            <div className="col">
              <div className="row">
                <div className="col">
                  <Input
                    type="text"
                    label={"Telefone fixo"}
                    setSelectedValue={setSelectedPhone}
                  />
                </div>

                <div className="col">
                  <Input
                    type="text"
                    label={"Celular"}
                    setSelectedValue={setSelectedMobile}
                  />
                </div>
              </div>

              <Input
                type="date"
                setSelectedValue={setBirthdate}
                label={"Data de nascimento"}
              />
            </div>

            <div className="col">
              <Input
                type="email"
                label={"E-mail"}
                setSelectedValue={setEmail}
              />

              <Select
                label={"Nacionalidade"}
                placeholder=""
                options={nationalityOptions}
                setSelectedValue={setSelectedNationality}
              />
            </div>

            <div className="col">
              <Select
                label={"Etnia"}
                placeholder=""
                options={ethnicitiesOptions}
                setSelectedValue={setSelectedEthnicity}
              />

              <div className="row">
                <div className="col">
                  <Select
                    placeholder=""
                    label={"Estado"}
                    options={statesOptions}
                    setSelectedValue={setSelectedBirthstate}
                  />
                </div>

                <div className="col">
                  <Select
                    placeholder=""
                    label={"Cidade"}
                    options={citiesOptions}
                    setSelectedValue={setBirthcity}
                  />
                </div>
              </div>
            </div>
          </div> */}

          <div className="row">
            <div className="col">
              <Input
                type="text"
                label={"Telefone fixo"}
                setSelectedValue={setSelectedPhone}
              />
            </div>

            <div className="col">
              <Input
                type="text"
                label={"Celular"}
                setSelectedValue={setSelectedMobile}
              />
            </div>

            <div className="col">
              <Input
                type="email"
                label={"E-mail"}
                setSelectedValue={setEmail}
              />
            </div>

            <div className="col">
              <Select
                label={"Etnia"}
                placeholder=""
                options={ethnicitiesOptions}
                setSelectedValue={setSelectedEthnicity}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Input
                type="date"
                setSelectedValue={setBirthdate}
                label={"Data de nascimento"}
              />
            </div>

            <div className="col">
              <Select
                placeholder=""
                label={"Cidade"}
                options={citiesOptions}
                setSelectedValue={setBirthcity}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Input
                type="text"
                label={"Nome da mãe"}
                setSelectedValue={setMothername}
              />
            </div>

            <div className="col">
              <Input
                type="text"
                label={"Nome do pai"}
                setSelectedValue={setFathername}
              />
            </div>
          </div>

          {
            parentsData?.map((parent) => (
              <input
                type="text"
                className="form-control mb-2"
                disabled="true"
                value={
                  `${parent.parentsType?.label} / ${parent?.parentsName} / ${parent.parentsCpf} / ${moment(parent.parentsDatebirth).format("DD/MM/YYYY")} / ${parent.parentsBooks && parent.parentsBooks || "Não"} / ${parent.parentsPapers && parent.parentsPapers || "Não"}`
                }
              />
            ))
          }

          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col-11">
                  <Select
                    placeholder={""}
                    options={parentsTypeOptions}
                    setSelectedValue={setSelectedParentsType}
                    label={"Tipo de parente"}
                  />
                </div>

                <div className="col-1">
                  <button className="btn btn-primary mt-4" onClick={handleWorkersParents}>
                    <Plus />
                  </button>
                </div>
              </div>

              <Input
                type={"text"}
                label={"Nome"}
                setSelectedValue={setParentsName}
              />

              <Input
                type={"text"}
                label={"CPF"}
                setSelectedValue={setParentsCpf}
              />

              <Input
                type={"date"}
                label={"Data de nascimento"}
                setSelectedValue={setParentsDatebirth}
              />

              {
                selectedParentsType?.value == 3 && (
                  <>
                    <Input
                      type={"text"}
                      label={"Livros"}
                      setSelectedValue={setParentsBooks}
                    />

                    <Input
                      type={"text"}
                      label={"Folhas"}
                      setSelectedValue={setParentsPapers}
                    />
                  </>
                )
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
                  />
                </div>

                <div className="col">
                  <Input
                    type="text"
                    label={"Órgão emissor"}
                    setSelectedValue={setRgIssuingAgency}
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
              />
            </div>

            <div className="col">
              <div className="row">
                <div className="col">
                  <Input
                    type="date"
                    setSelectedValue={setRgExpeditionDate}
                    label={"Data de expedição"}
                  />
                </div>

                <div className="col">
                  <Select
                    placeholder=""
                    label={"Escolaridade"}
                    options={schoolLevelsOptions}
                    setSelectedValue={setSelectedSchoolLevel}
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
            {/* <div className="col">
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
            </div> */}

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
              <Select
                placeholder={""}
                label="Vale transporte"
                options={trueFalseOptions}
                setSelectedValue={setTransportVoucher}
              />
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
                options={wagePaymentMethodOptions}
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

          <div className="row">
            <div className="col">
              <Select
                options={hierarchyStructureOptions}
                placeholder={""}
                label={"Estrutura hierárquica"}
                setSelectedValue={setSelectedHierarchyStructure}
              />
            </div>

            <div className="col">
              <Input
                type={"text"}
                label={"Tempo de empresa"}
                setSelectedValue={setEnterpriseTime}
              />
            </div>
          </div>

          <div>
            <h4>Anexos</h4>
          </div>

          <InputFile
            label={"Carteira de trabalho"}
            setSelectedValue={setCtpsFile}
          />

          <InputFile
            label={"Foto 3x4"}
          />

          <InputFile
            label={"Exame médico admissional"}
          />

          <InputFile
            label={"Carteira de identidade"}
          />

          <InputFile
            label={"CPF"}
          />

          <InputFile
            label={"Título eleitoral"}
          />

          <InputFile
            label={"Comprovante de residência"}
          />

          <InputFile
            label={"CNH"}
          />

          <InputFile
            label={"Certidão de casamento"}
          />

          <InputFile
            label={"Certificado de reservista"}
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