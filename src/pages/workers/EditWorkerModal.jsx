import axios from 'axios'
import dayjs from "dayjs"
import moment from 'moment'
import printJS from 'print-js'
import { useEffect, useState } from 'react'
import { Plus, Printer, Trash } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactDOMServer from 'react-dom/server'
import ReactInputMask from 'react-input-mask'
import CreatableSelect from 'react-select/creatable'
import Swal from "sweetalert2"
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
import loadNationalitiesOptions from '../../requests/loadOptions/loadNationalitiesOptions'
import loadNeighborhoodsOptions from '../../requests/loadOptions/loadNeighborhoodsOptions'
import loadSchoolLevels from '../../requests/loadOptions/loadSchoolLevels'
import loadStatesOptions from '../../requests/loadOptions/loadStatesOptions'
import loadTurnsOptions from '../../requests/loadOptions/loadTurnsOptions'
import loadWagePaymentMethodOptions from '../../requests/loadOptions/loadWagePaymentMethodOptions'
import getParentsType from '../../requests/parentsType/getParentsType'
import postWorkersParents from '../../requests/workersParents/postWorkersParents'
import api from '../../services/api'
import NewCityModal from './NewCityModal'
import NewNationalityModal from './NewNationalityModal'
import NewNeighborhoodModal from './NewNeighborhoodModal'
import NewStateModal from './NewStateModal'
import WorkerDataPrintContent from './WorkerDataPrintContent'

function calcularTempoDeEmpresa(dataAdmissaoStr) {
  const dataAdmissao = new Date(dataAdmissaoStr);
  const hoje = new Date();

  let anos = hoje.getFullYear() - dataAdmissao.getFullYear();
  let meses = hoje.getMonth() - dataAdmissao.getMonth();
  let dias = hoje.getDate() - dataAdmissao.getDate();

  if (dias < 0) {
    meses -= 1;

    // Pega o último dia do mês anterior
    const ultimoDiaMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
    dias += ultimoDiaMesAnterior;
  }

  if (meses < 0) {
    anos -= 1;
    meses += 12;
  }

  const partes = [];
  if (anos > 0) {
    partes.push(`${anos} ${anos === 1 ? 'ano' : 'anos'}`);
  }
  if (meses > 0) {
    partes.push(`${meses} ${meses === 1 ? 'mês' : 'meses'}`);
  }
  if (dias > 0) {
    partes.push(`${dias} ${dias === 1 ? 'dia' : 'dias'}`);
  }

  return partes.length ? partes.join(" e ") : "Menos de um dia";
}

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

  const [hierarchyStructureOptions, setHierarchyStructureOptions] = useState()

  const [selectedHierarchyStructure, setSelectedHierarchyStructure] = useState()

  const [enterpriseTime, setEnterpriseTime] = useState()

  const [wagePaymentMethodOptions, setWagePaymentMethodOptions] = useState()

  const [parentsData, setParentsData] = useState()

  const [parentsTypeOptions, setParentsTypeOptions] = useState()

  const [selectedParentsType, setSelectedParentsType] = useState()

  const [parentsName, setParentsName] = useState()

  const [parentsCpf, setParentsCpf] = useState()

  const [parentsDatebirth, setParentsDatebirth] = useState()

  const [parentsBooks, setParentsBooks] = useState()

  const [parentsPapers, setParentsPapers] = useState()

  const [newParentsData, setNewParentsData] = useState()

  const [residentialCity, setResidentialCity] = useState()

  const [birthState, setBirthstate] = useState()

  const [cnhCategoriesOptions, setCnhCategoriesOptions] = useState()

  const [earlyPayment, setEarlyPayment] = useState()

  const [harmfullExposition, setHarmfullExposition] = useState()

  const [functionCode, setFunctionCode] = useState()

  const [seeTurn, setSeeTurn] = useState()

  const [seeExperiencePeriods, setSeeExperiencePeriods] = useState()

  const [selectedHasExperienceTime, setSelectedHasExperienceTime] = useState(
    selectedWorker?.has_experience_time
      ? trueFalseOptions.find(option => option.value === selectedWorker.has_experience_time)
      : null
  );

  const [docTitle, setDocTitle] = useState()

  const [doc, setDoc] = useState()

  const [workersDocs, setWorkersDocs] = useState()

  const [timeEnterprise, setTimeEnterprise] = useState()

  const [hasNocturneHours, setHasNocturneHours] = useState()

  const [seeOtherNocturneFields, setSeeOtherNocturneFields] = useState(false)

  const [proportionalPayment, setProportionalPayment] = useState()

  const [totalNocturneWorkjourney, setTotalNocturneWorkjourney] = useState()

  const [twentyFiveWorkjourney, setTwentyFiveWorkjourney] = useState()

  const [twentyTwoToFiveWeekWorkjourney, setTwentyTwoToFiveWeekWorkjourney] = useState()

  const [twentyTwoToFiveMonthWorkjourney, setTwentyTwoToFiveMonthWorkjourney] = useState()

  const [twentyTwoToFiveEffectiveDiaryWorkjourney, setTwentyTwoToFiveEffectiveDiaryWorkjourney] = useState()

  const [healthcarePlan, setHealthcarePlan] = useState()

  const [healthcarePlanDiscount, setHealthcarePlanDiscount] = useState()

  const [lifeInsurance, setLifeInsurance] = useState()

  const [lifeInsuranceDiscount, setLifeInsuranceDiscount] = useState()

  const [ag, setAg] = useState()

  const [cc, setCc] = useState()

  const [earlyPaymentDiscount, setEarlyPaymentDiscount] = useState()

  const [newStateModalOpen, setNewStateModalOpen] = useState(false)

  const [newNationalityModalOpen, setNewNationalityModalOpen] = useState(false)

  const [newCityModalOpen, setNewCityModalOpen] = useState(false)

  const [newNeighborhoodModalOpen, setNewNeighborhoodModalOpen] = useState(false)

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
    loadWagePaymentMethodOptions(setWagePaymentMethodOptions)

    api
      .get("/cnh-categories")
      .then((response) => {
        let options = response?.data.map((cnhCategory) => ({ value: cnhCategory.id, label: cnhCategory.name }))

        setCnhCategoriesOptions(options)
      })

    api
      .get(`/hierarchy-structure`)
      .then((response) => {
        let options = response?.data.map((hierarchyStructure) => ({ value: hierarchyStructure.id, label: hierarchyStructure.name }))

        setHierarchyStructureOptions(options)
      })

    api
      .get(`/states`)
      .then((response) => {
        let options = response?.data.map((state) => ({ value: state.id, label: state.name }))

        setBirthstateOptions(options)

        setStatesOptions(options)
      })

    api
      .get(`/cities`)
      .then((response) => {
        let options = response?.data.map((option) => ({ value: option.Cities.id, label: option.Cities.name, stateId: option.Cities.state_id }))

        setBirthcityOptions(options)

        setCitiesOptions(options)
      })

    api
      .get("/neighborhoods")
      .then((response) => {
        let options = response?.data.map((neighborhood) => ({ value: neighborhood.id, label: neighborhood.name, cityId: neighborhood.city_id }))

        setNeighborhoodOptions(options)
      })

    getParentsType()
      .then((response) => {
        let options = response?.data.map((parentType) => ({ value: parentType.id, label: parentType.name }))

        setParentsTypeOptions(options)
      })
  }, [editWorkerModalOpen])

  useEffect(() => {
    api
      .get(`/workers/${selectedWorker?.worker_id}/parents`)
      .then((response) => setParentsData(response.data))
  }, [editWorkerModalOpen])

  useEffect(() => {
    if (selectedWorker) {
      if (selectedWorker?.neighborhood?.id) {
        api
          .get(`/cities/${selectedWorker?.neighborhood?.city_id}`)
          .then((response) => setResidentialCity(response.data))
      }

      if (selectedWorker?.city?.state_id) {
        api
          .get(`/states/${selectedWorker?.city?.state_id}`)
          .then((response) => setBirthstate(response.data))
      }

      if (selectedWorker?.function_id) {
        api
          .get(`/functions/${selectedWorker?.function_id}`)
          .then((response) => setFunctionCode(response.data))
      }

      if (selectedWorker?.turn_id) {
        api
          .get(`/turns/${selectedWorker?.turn_id}`)
          .then((response) => setSeeTurn(response.data))
      }

      if (selectedWorker?.has_experience_time) {
        setSeeExperiencePeriods(selectedWorker?.has_experience_time)
      }

      if (selectedWorker?.admission_date) {
        let timeEnterprise = calcularTempoDeEmpresa(selectedWorker?.admission_date)

        setTimeEnterprise(timeEnterprise)
      }

      if (selectedWorker?.has_nocturne_hours) {
        setSeeOtherNocturneFields(true)
      }
    }
  }, [selectedWorker])

  useEffect(() => {
    if (selectedNeighborhood) {
      api
        .get(`/cities/${selectedNeighborhood?.cityId}`)
        .then((response) => setResidentialCity(response.data))
    }
  }, [selectedNeighborhood])

  useEffect(() => {
    if (selectedCity) {
      api
        .get(`/states/${selectedCity?.stateId}`)
        .then((response) => setBirthstate(response.data))
    }
  }, [selectedCity])

  useEffect(() => {
    if (selectedFunction) {
      api
        .get(`/functions/${selectedFunction?.value}`)
        .then((response) => setFunctionCode(response.data))
    }
  }, [selectedFunction])

  useEffect(() => {
    if (selectedTurn) {
      api
        .get(`/turns/${selectedTurn?.value}`)
        .then((response) => setSeeTurn(response.data))
    }
  }, [selectedTurn])

  useEffect(() => {
    if (selectedHasExperienceTime) {
      setSeeExperiencePeriods(selectedHasExperienceTime.value === true);
    }
  }, [selectedHasExperienceTime]);

  useEffect(() => {
    if (admissionDate) {
      let timeEnterprise = calcularTempoDeEmpresa(admissionDate)

      setTimeEnterprise(timeEnterprise)
    }
  }, [admissionDate])

  useEffect(() => {
    if (hasNocturneHours?.value) {
      setSeeOtherNocturneFields(true)
    } else {
      setSeeOtherNocturneFields(false)
    }
  }, [hasNocturneHours])

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

    setResidentialCity()

    setEarlyPayment()

    setHarmfullExposition()

    setFunctionCode()

    setSeeTurn()

    setSelectedHasExperienceTime()

    setSeeExperiencePeriods()

    setEditWorkerModalOpen(false)

    setDoc(null)

    setDocTitle(null)

    setWorkersDocs(null)

    setTimeEnterprise()

    setHasNocturneHours()

    setSeeOtherNocturneFields()

    setProportionalPayment()

    setTotalNocturneWorkjourney()

    setTwentyFiveWorkjourney()

    setTwentyTwoToFiveWeekWorkjourney()

    setTwentyTwoToFiveMonthWorkjourney()

    setTwentyTwoToFiveEffectiveDiaryWorkjourney()

    setHealthcarePlan()

    setHealthcarePlanDiscount()

    setLifeInsurance()

    setLifeInsuranceDiscount()

    setAg()

    setCc()

    setEarlyPaymentDiscount()
  }

  const handleDeleteWorkerParents = (parent) => {
    api
      .delete(`/workers-parents/${parent.id}`)
      .then(() => {
        api
          .get(`/workers/${selectedWorker?.worker_id}/parents`)
          .then((response) => setParentsData(response.data))
      })
  }

  const handleWorkersParents = () => {
    let formData = {
      worker_id: selectedWorker?.worker_id,
      parent_type_id: selectedParentsType?.value,
      name: parentsName,
      cpf: parentsCpf,
      birthdate: parentsDatebirth,
      books: parentsBooks && parentsBooks,
      papers: parentsPapers && parentsPapers,
    }

    postWorkersParents(formData)
      .then(() => {
        api
          .get(`/workers/${selectedWorker?.worker_id}/parents`)
          .then((response) => setParentsData(response.data))
      })
  }

  const handleSubmit = async () => {
    let formData = {
      "name": name ?? selectedWorker.worker_name,
      "function_id": selectedFunction?.value || selectedWorker?.function_id,
      "subsidiarie_id": selectedSubsdiarie?.value,
      "is_active": selectedWorker.worker_is_active,
      "turn_id": selectedTurn?.value || selectedWorker?.turn_id,
      "cost_center_id": selectedCostCenter?.value || selectedWorker?.cost_center_id,
      "department_id": selectedDepartment?.value || selectedWorker?.department_id,
      "admission_date": admissionDate ?? selectedWorker.admission_date,
      "enrolment": enrolment ?? selectedWorker.worker_enrolment,
      "timecode": timecode ?? selectedWorker.timecode,
      "esocial": esocial ?? selectedWorker.esocial,
      "gender_id": selectedGender?.value || selectedWorker?.gender?.id,
      "civil_status_id": selectedCivilStatus?.value || selectedWorker?.civil_status?.id,
      "street": street ?? selectedWorker.street,
      "street_number": streetNumber ?? selectedWorker.street_number,
      "street_complement": streetComplement ?? selectedWorker.street_complement,
      "neighborhood_id": selectedNeighborhood?.value || selectedWorker?.neighborhood?.id,
      "cep": cep ?? selectedWorker.cep,
      "city": selectedCity?.value || selectedWorker?.city?.id,
      "state": selectedState?.value || selectedWorker?.state?.id,
      "phone": selectedPhone ?? selectedWorker.phone,
      "mobile": selectedMobile ?? selectedWorker.mobile,
      "email": email ?? selectedWorker.email,
      "ethnicity_id": selectedEthnicity?.value || selectedWorker?.ethnicity?.id,
      "birthdate": birthdate ?? selectedWorker.birthdate,
      "birthcity": birthcity?.value || selectedWorker?.birthcity?.id,
      "birthstate": selectedBirthstate?.value || selectedWorker?.birthstate?.id,
      "nationality": selectedNationality?.value || selectedWorker?.nationality?.id,
      "fathername": fathername ?? selectedWorker.fathername,
      "mothername": mothername ?? selectedWorker.mothername,
      "cpf": cpf ?? selectedWorker.cpf,
      "rg": rg ?? selectedWorker.rg,
      "rg_issuing_agency": rgIssuingAgency ?? selectedWorker.rg_issuing_agency,
      "rg_state": rgState?.value || selectedWorker?.rg_state?.id,
      "rg_expedition_date": rgExpeditionDate ?? selectedWorker.rg_expedition_date,
      "military_cert_number": militaryCertNumber ?? selectedWorker.military_cert_number,
      "pis": pis ?? selectedWorker.pis,
      "pis_register_date": pisRegisterDate ?? selectedWorker.pis_register_date,
      "votant_title": votantTitle ?? selectedWorker.votant_title,
      "votant_zone": votantZone ?? selectedWorker.votant_zone,
      "votant_session": votantSession ?? selectedWorker.votant_session,
      "ctps": ctps ?? selectedWorker.ctps,
      "ctps_serie": ctpsSerie ?? selectedWorker.ctps_serie,
      "ctps_state": ctpsState?.value || selectedWorker?.ctps_state?.id,
      "ctps_emission_date": ctpsEmissionDate ?? selectedWorker.ctps_emission_date,
      "cnh": cnh ?? selectedWorker.cnh,
      "cnh_category": cnhCategory?.value || selectedWorker?.cnh_category?.id,
      "cnh_emition_date": cnhEmissionDate ?? selectedWorker.cnh_emition_date,
      "cnh_valid_date": cnhValidDate ?? selectedWorker.cnh_valid_date,

      "first_job": (
        firstJob?.value !== undefined ?
          firstJob.value
          :
          selectedWorker?.first_job
      ),

      "was_employee": (
        wasEmployee?.value !== undefined ?
          wasEmployee?.value
          :
          selectedWorker?.was_employee
      ),

      "union_contribute_current_year": (
        unionContributeCurrentYear?.value !== undefined ?
          unionContributeCurrentYear?.value
          :
          selectedWorker?.union_contribute_current_year
      ),

      "receiving_unemployment_insurance": (
        receivingUnemploymentInsurance?.value !== undefined ?
          receivingUnemploymentInsurance?.value
          :
          selectedWorker?.receiving_unemployment_insurance
      ),

      "previous_experience": (
        previousExperience?.value !== undefined ?
          previousExperience?.value
          :
          selectedWorker?.previous_experience
      ),

      "month_wage": monthWage ?? selectedWorker.month_wage,
      "hour_wage": hourWage ?? selectedWorker.hour_wage,
      "journey_wage": journeyWage ?? selectedWorker.journey_wage,

      "transport_voucher": (
        transportVoucher?.value !== undefined ?
          transportVoucher?.value
          :
          selectedWorker?.transport_voucher
      ),

      "diary_workjourney": diaryWorkJourney ?? selectedWorker.diary_workjourney,
      "week_workjourney": weekWorkJourney ?? selectedWorker?.week_workjourney,
      "month_workjourney": monthWorkJourney ?? selectedWorker?.month_workjourney,
      "experience_time": experienceTime?.value || selectedWorker?.experienceTime,
      "nocturne_hours": nocturneHours || selectedWorker?.nocturne_hours,

      "dangerousness": (
        dangerousness?.value !== undefined ?
          dangerousness?.value
          :
          selectedWorker?.dangerousness
      ),

      "unhealthy": (
        unhealthy?.value !== undefined ?
          unhealthy?.value
          :
          selectedWorker?.unhealthy
      ),

      "wage_payment_method": wagePaymentMethod?.value || selectedWorker?.wage_payment_method?.id,
      "general_function_code": codeGeneralFunction ?? selectedWorker.general_function_code,
      "wage": wage ?? selectedWorker.wage,
      "last_function_date": lastFunctionDate ?? selectedWorker?.last_function_date,
      "current_function_time": currentFunctionTime ?? selectedWorker.current_function_time,
      "school_level": selectedSchoolLevel?.value || selectedWorker?.school_level?.id,
      "emergency_number": emergencyNumber ?? selectedWorker.emergency_number,
      "bank": selectedBankOption?.value || selectedWorker?.bank?.id,
      "bank_agency": bankAgency ?? selectedWorker.bank_agency,
      "bank_account": bankAccount ?? selectedWorker.bankAccount,
      "cbo": cbo ?? selectedWorker.cbo,
      "hierarchy_structure": selectedHierarchyStructure?.value || selectedWorker?.hierarchy_structure?.id,

      "early_payment": (
        earlyPayment?.value !== undefined ?
          earlyPayment?.value
          :
          selectedWorker?.early_payment
      ),

      "harmfull_exposition": (
        harmfullExposition?.value !== undefined ?
          harmfullExposition?.value
          :
          selectedWorker?.harmfull_exposition
      ),

      "has_experience_time": (
        selectedHasExperienceTime?.value !== undefined ?
          selectedHasExperienceTime?.value
          :
          selectedWorker?.has_experience_time
      ),

      "has_nocturne_hours": (
        hasNocturneHours?.value !== undefined ?
          hasNocturneHours?.value
          :
          selectedWorker?.has_nocturne_hours
      ),

      "propotional_payment": hasNocturneHours?.value == true && proportionalPayment?.value || null,
      "total_nocturne_workjourney": hasNocturneHours?.value == true && totalNocturneWorkjourney || null,
      "twenty_five_workjourney": hasNocturneHours?.value == true && twentyFiveWorkjourney || null,
      "twenty_two_to_five_week_workjourney": hasNocturneHours?.value == true && twentyTwoToFiveWeekWorkjourney || null,
      "twenty_two_to_five_month_workjourney": hasNocturneHours?.value == true && twentyTwoToFiveMonthWorkjourney || null,
      "twenty_two_to_five_effective_diary_workjourney": hasNocturneHours?.value == true && twentyTwoToFiveEffectiveDiaryWorkjourney || null,

      "healthcare_plan": (
        healthcarePlan?.value !== undefined ?
          healthcarePlan?.value
          :
          selectedWorker?.healthcare_plan
      ),

      "healthcare_plan_discount": healthcarePlanDiscount ?? selectedWorker.healthcare_plan_discount,

      "life_insurance": lifeInsurance?.value || selectedWorker?.life_insurance,

      "life_insurance": (
        lifeInsurance?.value !== undefined ?
          lifeInsurance?.value
          :
          selectedWorker?.life_insurance
      ),

      "life_insurance_discount": lifeInsuranceDiscount ?? selectedWorker.life_insurance_discount,
      "ag": ag ?? selectedWorker.ag,
      "cc": cc ?? selectedWorker.cc,
      "early_payment_discount": earlyPaymentDiscount ?? selectedWorker.early_payment_discount,
    }

    let response = await api.put(`/workers/${selectedWorker.worker_id}`, formData).then((response) => response)

    if (response.status == 200 && workersDocs) {
      const promises = workersDocs.map(async (doc) => {
        return await axios
          .post(
            `${import.meta.env.VITE_API_URL}/upload-pdf/${selectedWorker.worker_id}`,
            {
              doc_title: doc.docTitle.label,
              file: doc.doc,
            },
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          )
      })

      Promise.all(promises).then(() => handleClose())
    } else {
      handleClose()
    }
  }

  const handleRemoveDoc = (i) => {
    const updatedDocs = [...workersDocs]

    updatedDocs.splice(i, 1)

    setWorkersDocs(updatedDocs)
  }

  const handleOnchangeWorkersDocs = () => {
    let workerDoc = { docTitle, doc }

    setWorkersDocs((prevValue) => {
      if (prevValue) {
        return [...prevValue, workerDoc]
      } else {
        return [workerDoc]
      }
    })
  }

  const handleSendEmailToMabecon = () => {
    let requestBody = {
      subsidiarie: selectedSubsdiarie?.label,
      worker_name: selectedWorker?.worker_name,
      worker_admission_date: dayjs(selectedWorker?.admission_date).format("DD/MM/YYYY"),
    }

    api
      .post("/send-email-to-mabecon", requestBody)
      .then((response) => {
        if (response.status == 200) {
          Swal.fire({
            icon: "success",
            title: "Sucesso :=)",
            text: "E-mail enviado com sucesso",
          })
        } else {
          Swal.fire({
            icon: "error",
            title: "Erro :=(",
            text: "Um erro inesperado ocorreu, verifique o cadastro de funcionário e tente novamente",
          })
        }
      })
  }

  const handlePrintWorkerData = () => {
    const printContent = ReactDOMServer.renderToString(
      <WorkerDataPrintContent
        selectedWorker={selectedWorker}
        selectedSubsdiarie={selectedSubsdiarie}
      />
    )

    printJS({
      printable: printContent,
      type: 'raw-html',
    })
  }

  return (
    <>
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
          <button
            className="btn btn-light ms-2"
            onClick={handlePrintWorkerData}
            title="Imprimir dados do colaborador"
          >
            <Printer />
          </button>

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
              <label><b>Número de emergência</b></label>

              <ReactInputMask
                mask={"(99) 99999-9999"}
                className="form-control"
                onChange={(e) => setEmergencyNumber(e.target.value)}
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
            </div>

            <div className="col">
              <Input
                type="text"
                label={"Número"}
                setSelectedValue={setStreetNumber}
                defaultValue={selectedWorker?.street_number}
              />
            </div>

            <div className="col">
              <Input
                type="text"
                label={"Complemento"}
                setSelectedValue={setStreetComplement}
                defaultValue={selectedWorker?.street_complement}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Input
                type="text"
                label={"CEP"}
                setSelectedValue={setSelectedCep}
                defaultValue={selectedWorker?.cep}
              />
            </div>

            <div className="col">
              <label><b>Cidade</b></label>

              <input
                className="form-control"
                disabled={"true"}
                value={residentialCity?.name}
              />
            </div>

            <div className="col">
              <label><b>Bairro</b></label>

              <CreatableSelect
                placeholder={""}
                options={neighborhoodOptions}
                onChange={(value) => {
                  if (value.__isNew__) {
                    api
                      .post("/news", { name: value.value })
                      .then((response) => {
                        let options = response?.data.map((neighborhood) => ({ value: neighborhood.id, label: neighborhood.name, cityId: neighborhood.city_id }))

                        setNeighborhoodOptions(options)

                        let neighborhood = options.find((option) => option.label == value.value)

                        setSelectedNeighborhood(neighborhood)
                      })

                  } else {
                    setSelectedNeighborhood(value)
                  }
                }}
                defaultValue={neighborhoodOptions?.find((option) => option.value == selectedWorker?.neighborhood?.id)}
              />

            </div>
          </div>

          <div>
            <h4>Dados pessoais</h4>
          </div>

          <div className="row">
            <div className="col">
              <label><b>Telefone fixo</b></label>
              <ReactInputMask
                mask={"(99) 99999-9999"}
                className="form-control"
                onChange={(e) => setSelectedPhone(e.target.value)}
                defaultValue={selectedWorker?.phone}
              />
            </div>

            <div className="col">
              <label><b>Celular</b></label>

              <ReactInputMask
                mask={"(99) 99999-9999"}
                className="form-control"
                onChange={(e) => setSelectedMobile(e.target.value)}
                defaultValue={selectedWorker?.mobile}
              />
            </div>

            <div className="col">
              <Input
                type="email"
                label={"E-mail"}
                setSelectedValue={setEmail}
                defaultValue={selectedWorker?.email}
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
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Input
                type="date"
                setSelectedValue={setBirthdate}
                label={"Data de nascimento"}
                defaultValue={selectedWorker?.birthdate}
              />
            </div>

            <div className="col">
              <label><b>Estado</b></label>
              <input
                className="form-control"
                value={
                  statesOptions?.find(
                    (option) => option.value === selectedWorker?.birthcity?.state_id
                  )?.label || ''
                }
                disabled
                readOnly
              />
            </div>

            <div className="col">
              <label><b>Cidade</b></label>

              <CreatableSelect
                placeholder={""}
                options={citiesOptions}
                onChange={(value) => {
                  if (value.__isNew__) {
                    api
                      .post("/cities", { name: value.value })
                      .then((response) => {
                        let options = response?.data.map((city) => ({ value: city.id, label: city.name, stateId: city.state_id }))

                        setCitiesOptions(options)

                        let selectedBirthcity = options.find((option) => option.label == value.value)

                        setBirthcity(selectedBirthcity)
                      })

                  } else {
                    setBirthcity(value)
                  }
                }}
                defaultValue={citiesOptions?.find((option) => option.value == selectedWorker?.birthcity?.id)}
              />
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

          <div>
            <h4>Documentos</h4>
          </div>

          <div className="row">
            <div className="col">
              <label><b>CPF</b></label>
              <ReactInputMask
                mask={"999.999.999-99"}
                defaultValue={selectedWorker?.cpf}
                className="form-control"
                onChange={(e) => setCpf(e.target.value)}
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
                defaultValue={statesOptions?.find((option) => option.value == selectedWorker?.rg_state?.id)}
              />
            </div>

            <div className="col">
              <div className="row">
                <div className="col">
                  <Input
                    type="date"
                    setSelectedValue={setRgExpeditionDate}
                    label={"Data de expedição"}
                    defaultValue={selectedWorker?.rg_expedition_date}
                  />
                </div>

                <div className="col">
                  <Select
                    placeholder=""
                    label={"Escolaridade"}
                    options={schoolLevelsOptions}
                    setSelectedValue={setSelectedSchoolLevel}
                    defaultValue={schoolLevelsOptions?.find((option) => option.value == selectedWorker?.school_level?.id)}
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
                defaultValue={selectedWorker?.pis}
              />
            </div>

            <div className="col">
              <Input
                type={"date"}
                setSelectedValue={setPisRegisterDate}
                label={"Data de cadastro"}
                defaultValue={selectedWorker?.pis_register_date}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Input
                type="text"
                label='Título de eleitor'
                setSelectedValue={setVotantTitle}
                defaultValue={selectedWorker?.votant_title}
              />
            </div>

            <div className="col">
              <Input
                type="text"
                label='Zona'
                setSelectedValue={setVotantZone}
                defaultValue={selectedWorker?.votant_zone}
              />
            </div>

            <div className="col">
              <Input
                type="text"
                setSelectedValue={setVotantSession}
                label="Sessão"
                defaultValue={selectedWorker?.votant_session}
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
                    defaultValue={selectedWorker?.ctps}
                  />
                </div>

                <div className="col">
                  <Input
                    type="text"
                    label={"Série"}
                    setSelectedValue={setCtpsSerie}
                    defaultValue={selectedWorker?.ctps_serie}
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
                    defaultValue={statesOptions?.find((option) => option.value == selectedWorker?.ctps_state?.id)}
                  />
                </div>

                <div className="col">
                  <Input
                    type="date"
                    label="Data de emissão"
                    setSelectedValue={setCtpsEmissionDate}
                    defaultValue={selectedWorker?.ctps_emission_date}
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
                    defaultValue={selectedWorker?.cnh}
                  />
                </div>

                <div className="col">
                  {/* <Input
                  type="text"
                  label="Categoria"
                  setSelectedValue={setCnhCategory}
                  defaultValue={selectedWorker?.cnh_category}
                /> */}

                  <Select
                    placeholder={""}
                    label={"Categoria"}
                    options={cnhCategoriesOptions}
                    setSelectedValue={setCnhCategory}
                    defaultValue={cnhCategoriesOptions?.find((option) => option.value == selectedWorker?.cnh_category?.id)}
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
                    defaultValue={selectedWorker?.cnh_emition_date}
                  />
                </div>

                <div className="col">
                  <Input
                    type="date"
                    label="Validade"
                    setSelectedValue={setCnhValidDate}
                    defaultValue={selectedWorker?.cnh_valid_date}
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
                    defaultValue={trueFalseOptions.find((option) => option.value == selectedWorker?.first_job)}
                  />
                </div>

                <div className="col">
                  <Select
                    placeholder={""}
                    label="Já foi empregado da empresa?"
                    options={trueFalseOptions}
                    setSelectedValue={setWasEmployee}
                    defaultValue={trueFalseOptions.find((option) => option.value == selectedWorker?.was_employee)}
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
                defaultValue={trueFalseOptions.find((option) => option.value == selectedWorker?.union_contribute_current_year)}
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
                    defaultValue={trueFalseOptions.find((option) => option.value == selectedWorker?.receiving_unemployment_insurance)}
                  />
                </div>

                <div className="col">
                  <Select
                    placeholder={""}
                    label="Experiência prévia na função?"
                    options={trueFalseOptions}
                    setSelectedValue={setPreviousExperience}
                    defaultValue={trueFalseOptions.find((option) => option.value == selectedWorker?.previous_experience)}
                  />
                </div>
              </div>
            </div>
          </div>

          <h4>Dependentes</h4>

          {
            parentsData?.map((parent) => (
              <div className="row">
                <div className="col-11">
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={
                      `${parent?.name} / ${parent.cpf} / ${moment(parent.birthdate).format("DD/MM/YYYY")} / ${parent.books && parent.books || "Não"} / ${parent.papers && parent.papers || "Não"}`
                    }
                    disabled={true}
                  />
                </div>

                <div className="col-1">
                  <button className="btn btn-danger" onClick={() => handleDeleteWorkerParents(parent)}>
                    <Trash />
                  </button>
                </div>
              </div>
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
                  <button className="btn btn-warning mt-4" onClick={handleWorkersParents}>
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
                defaultValue={functionsOptions?.find((option) => option.value == selectedWorker?.function_id)}
              />
            </div>

            <div className="col">
              <Select
                placeholder=""
                label={"Turno"}
                options={turnsOptions}
                setSelectedValue={setSelectedTurn}
                required={true}
                defaultValue={turnsOptions?.find((option) => option.value == selectedWorker?.turn_id)}
              />
            </div>

            <div className="col">
              <Select
                label={"Centro de custos"}
                placeholder=""
                options={costCenterOptions}
                setSelectedValue={setSelectedCostCenter}
                required={true}
                defaultValue={costCenterOptions?.find((option) => option.value == selectedWorker?.cost_center_id)}
              />
            </div>

            <div className="col">
              <Select
                label={"Setor"}
                placeholder=""
                options={departmentsOptions}
                setSelectedValue={setSelectedDepartment}
                required={true}
                defaultValue={departmentsOptions?.find((option) => option.value == selectedWorker?.department_id)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col">
                  <label><b>Código geral de função</b></label>

                  <input
                    className="form-control"
                    disabled={"true"}
                    value={functionCode?.general_function_code || ""}
                  />
                </div>

                <div className="col">
                  <label><b>CBO</b></label>

                  <input
                    className="form-control"
                    disabled={"true"}
                    value={functionCode?.cbo || ""}
                  />
                </div>
              </div>
            </div>

            <div className="col">

              <div className="row">
                <div className="col">
                  <label><b>Semana do turno</b></label>

                  <input
                    className="form-control"
                    disabled={"true"}
                    value={seeTurn?.week}
                  />
                </div>

                <div className="col">
                  <label><b>Início de turno</b></label>

                  <input
                    className="form-control"
                    disabled={"true"}
                    value={seeTurn?.start_time}
                  />
                </div>

                <div className="col">
                  <label><b>Início de intervalo</b></label>

                  <input
                    className="form-control"
                    disabled={"true"}
                    value={seeTurn?.start_interval_time}
                  />
                </div>

                <div className="col">
                  <label><b>Fim de intervalo</b></label>

                  <input
                    type="text"
                    className="form-control"
                    disabled={"true"}
                    value={seeTurn?.end_interval_time || ""}
                  />
                </div>

                <div className="col">
                  <label><b>Fim de turno</b></label>

                  <input
                    type="text"
                    className="form-control"
                    disabled={"true"}
                    value={seeTurn?.end_time || ""}
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col">
              <Input
                label="Data de última função"
                type="text"
                setSelectedValue={setLastFunctionDate}
                defaultValue={selectedWorker?.last_function_date}
              />
            </div>

            <div className="col">
              <Input
                label="Tempo na função atual"
                type="text"
                setSelectedValue={setCurrentFunctionTime}
                defaultValue={selectedWorker?.current_function_time}
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
                defaultValue={selectedWorker?.admission_date}
              />
            </div>

            <div className="col">
              <label><b>Tempo de empresa</b></label>

              <input className="form-control" value={timeEnterprise} disabled />
            </div>

            <div className="col">
              <div className="row">
                <div className="col">
                  <Input
                    label="Mensalista"
                    type="text"
                    setSelectedValue={setMonthWage}
                    defaultValue={selectedWorker?.month_wage}
                  />
                </div>

                <div className="col">
                  <Input
                    label="Valor/horista"
                    type="text"
                    setSelectedValue={setHourWage}
                    defaultValue={selectedWorker?.hour_wage}
                  />
                </div>

                <div className="col">
                  <Input
                    label="Prop. a jornada"
                    type="text"
                    setSelectedValue={setJourneyWage}
                    defaultValue={selectedWorker?.journey_wage}
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
                defaultValue={trueFalseOptions?.find((option) => option.value == selectedWorker?.transport_voucher)}
              />
            </div>

            <div className="col">
              <div className="row">
                <div className="col">
                  <Input
                    label="Carga diária"
                    type="text"
                    setSelectedValue={setDiaryWorkJourney}
                    defaultValue={selectedWorker?.diary_workjourney}
                  />
                </div>

                <div className="col">
                  <Input
                    label="Carga semanal"
                    type="text"
                    setSelectedValue={setWeekWorkJourney}
                    defaultValue={selectedWorker?.week_workjourney}
                  />
                </div>

                <div className="col">
                  <Input
                    label="Carga mensal"
                    type="text"
                    setSelectedValue={setMonthWorkJourney}
                    defaultValue={selectedWorker?.month_workjourney}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Select
                placeholder={""}
                label={"Haverá tempo de experiência?"}
                options={trueFalseOptions}
                setSelectedValue={setSelectedHasExperienceTime}
                defaultValue={trueFalseOptions?.find((option) => option.value == selectedWorker?.has_experience_time)}
              />

              {seeExperiencePeriods && (
                <>
                  <div className="row mt-2">
                    <div className="col">
                      <label><b>Primeiro período de experiência</b></label>
                      <input
                        type="text"
                        className="form-control"
                        disabled={true}
                        value={"30 dias"}
                      />
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col">
                      <label><b>Segundo período de experiência</b></label>
                      <input
                        type="text"
                        className="form-control"
                        disabled={true}
                        value={"60 dias"}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Select
                placeholder={""}
                label="Periculosidade"
                options={trueFalseOptions}
                setSelectedValue={setDangerousness}
                defaultValue={trueFalseOptions?.find((option) => option.value == selectedWorker?.dangerousness)}
              />
            </div>

            <div className="col">
              <Select
                placeholder={""}
                label="Insalubridade"
                options={trueFalseOptions}
                setSelectedValue={setUnhealthy}
                defaultValue={trueFalseOptions?.find((option) => option.value == selectedWorker?.unhealthy)}
              />
            </div>

            <div className="col">
              <Select
                placeholder={""}
                label="Método de pagamento"
                options={wagePaymentMethodOptions}
                setSelectedValue={setWagePaymentMethod}
                defaultValue={wagePaymentMethodOptions?.find((option) => option.value == selectedWorker?.wage_payment_method?.id)}
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
                defaultValue={banksOptions?.find((option) => option.value == selectedWorker?.bank?.id)}
              />
            </div>

            <div className="col">
              <Input
                label="Agência do banco"
                type="text"
                setSelectedValue={setBankAgency}
                defaultValue={selectedWorker?.bank_agency}
              />
            </div>

            <div className="col">
              <Input
                label="Conta do banco"
                type="text"
                setSelectedValue={setBankAccount}
                defaultValue={selectedWorker?.bank_account}
              />
            </div>
          </div>

          <div>
            <Select
              label={"Horas noturnas?"}
              placeholder={""}
              options={trueFalseOptions}
              setSelectedValue={setHasNocturneHours}
              defaultValue={trueFalseOptions?.find((option) => option.value == selectedWorker?.has_nocturne_hours)}
            />

            {
              seeOtherNocturneFields && (
                <>
                  <div className="row">
                    <div className="col">
                      <Select
                        label={"Pagamento proporcional?"}
                        placeholder={""}
                        options={trueFalseOptions}
                        setSelectedValue={setProportionalPayment}
                        defaultValue={trueFalseOptions?.find((option) => option.value == selectedWorker?.propotional_payment)}
                      />
                    </div>

                    <div className="col">
                      <Input
                        label={"Total de horas noturnas diárias"}
                        placeholder={""}
                        setSelectedValue={setTotalNocturneWorkjourney}
                        defaultValue={selectedWorker?.total_nocturne_workjourney}
                      />
                    </div>

                    <div className="col">
                      <Input
                        label={"Jornada parcial até 25 horas semanais"}
                        placeholder={""}
                        setSelectedValue={setTwentyFiveWorkjourney}
                        defaultValue={selectedWorker?.twenty_five_workjourney}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4>Trabalho das 22:00 às 05:00</h4>
                  </div>

                  <div className="row">
                    <div className="col">
                      <Input
                        label={"Total de horas por semana"}
                        placeholder={""}
                        setSelectedValue={setTwentyTwoToFiveWeekWorkjourney}
                        defaultValue={selectedWorker?.twenty_two_to_five_week_workjourney}
                      />
                    </div>

                    <div className="col">
                      <Input
                        label={"Total de horas por mês"}
                        placeholder={""}
                        setSelectedValue={setTwentyTwoToFiveMonthWorkjourney}
                        defaultValue={selectedWorker?.twenty_two_to_five_month_workjourney}
                      />
                    </div>

                    <div className="col">
                      <Input
                        label={"Carga horária diária efetiva com trabalho noturno"}
                        placeholder={""}
                        setSelectedValue={setTwentyTwoToFiveEffectiveDiaryWorkjourney}
                        defaultValue={selectedWorker?.twenty_two_to_five_effective_diary_workjourney}
                      />
                    </div>
                  </div>
                </>
              )
            }
          </div>

          <div className="row">
            {/* <div className="col">
            <Input
              label="Horas noturnas"
              type="text"
              setSelectedValue={setNocturneHours}
              defaultValue={selectedWorker?.nocturne_hours}
            />
          </div> */}

            <div className="col">
              <Input
                label="Salário"
                type="text"
                setSelectedValue={setWage}
                defaultValue={selectedWorker?.wage}
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
                defaultValue={hierarchyStructureOptions?.find((option) => option.value == selectedWorker?.hierarchy_structure?.id)}
              />
            </div>

            {/* <div className="col">
            <label><b>Tempo de empresa</b></label>

            <Input
              type={"text"}
              label={"Tempo de empresa"}
              setSelectedValue={setEnterpriseTime}
              defaultValue={selectedWorker?.enterprise_time}
            />
          </div> */}
          </div>

          <div className="row">
            <div className="col">
              <Select
                placeholder={""}
                options={trueFalseOptions}
                label={"Adiantamento salarial"}
                setSelectedValue={setEarlyPayment}
                defaultValue={trueFalseOptions.find((option) => option.value == selectedWorker?.early_payment)}
              />
            </div>

            <div className="col">
              <Input
                label={"Porcentagem ou valor"}
                placeholder={""}
                setSelectedValue={setEarlyPaymentDiscount}
                defaultValue={selectedWorker?.early_payment_discount}
              />
            </div>

            <div className="col">
              <Select
                placeholder={""}
                options={trueFalseOptions}
                label={"Exposição a agente nocivo"}
                setSelectedValue={setHarmfullExposition}
                defaultValue={trueFalseOptions.find((option) => option.value == selectedWorker?.harmfull_exposition)}
              />
            </div>
          </div>

          {
            workersDocs && (
              workersDocs.map((doc, i) => (
                <div className="row">
                  <div className="col-10">
                    <input
                      type="text"
                      className="form-control mb-3"
                      value={`${doc.docTitle.label} / ${doc.doc.name}`}
                      disabled={"true"}
                    />
                  </div>

                  <div className="col-2 text-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveDoc(i)}
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              ))
            )
          }

          <div className="row">
            <div className="col-10">
              <Select
                label={"Título do documento"}
                placeholder={""}
                options={[
                  { value: 1, label: "CTPS" },
                  { value: 2, label: "Exame médico admissional" },
                  { value: 3, label: "Identidade" },
                  { value: 4, label: "CPF" },
                  { value: 5, label: "Titulo eleitoral" },
                  { value: 7, label: "Comprovante de residência" },
                  { value: 8, label: "CNH" },
                  { value: 9, label: "Certidão de casamento" },
                  { value: 10, label: "Certificado de reservista" },
                  { value: 11, label: "Certidão de nascimento (filhos menores de 14)" },
                  { value: 12, label: "Carteira de vacinação (filhos menores de 5)" },
                  { value: 13, label: "Comprovante de frequência escolar (filhos entre 7 e 14)" },
                ]}
                setSelectedValue={setDocTitle}
              />
            </div>

            <div className="col-2 text-center">
              <button
                className="btn btn-warning mt-4"
                title="Adicionar documento"
                onClick={handleOnchangeWorkersDocs}
              >
                <Plus />
              </button>
            </div>
          </div>

          <div>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setDoc(e.target.files[0])}
            />
          </div>

          <div className='mb-3 mt-3'>
            <label><b>Local de trabalho</b></label>

            <input
              type="text"
              className="form-control"
              disabled={true}
              value={`${selectedSubsdiarie?.label} \ Filial N° ${selectedSubsdiarie?.value}`}
            />
          </div>

          <div className="row">
            <div className="col">
              <Select
                label={"Plano de saúde"}
                placeholder={""}
                options={trueFalseOptions}
                setSelectedValue={setHealthcarePlan}
                defaultValue={trueFalseOptions.find((option) => option.value == selectedWorker?.healthcare_plan)}
              />
            </div>

            <div className="col">
              <Input
                label={"Desconto em folha"}
                placeholder={""}
                setSelectedValue={setHealthcarePlanDiscount}
                defaultValue={selectedWorker?.healthcare_plan_discount}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Select
                label={"Seguro de vida"}
                placeholder={""}
                options={trueFalseOptions}
                setSelectedValue={setLifeInsurance}
                defaultValue={trueFalseOptions.find((option) => option.value == selectedWorker?.life_insurance)}
              />
            </div>

            <div className="col">
              <Input
                label={"Desconto em folha"}
                placeholder={""}
                setSelectedValue={setLifeInsuranceDiscount}
                defaultValue={selectedWorker?.life_insurance_discount}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Input
                label={"AG"}
                placeholder={""}
                setSelectedValue={setAg}
                defaultValue={selectedWorker?.ag}
              />
            </div>

            <div className="col">
              <Input
                label={"CC"}
                placeholder={""}
                setSelectedValue={setCc}
                defaultValue={selectedWorker?.cc}
              />
            </div>
          </div>

          <div>
            <p>
              <b>
                Sugestão de locais para realização de exames médicos (outros locais poderão ser escolhidos, a critério do empregador)
              </b>
            </p>

            <p>
              Clinimed Saúde Ocupacional: R. Conselheiro Mafra, 111 - Centro. Tel. (47) 3025-4970
            </p>

            <p>
              Dom Med Gestão em Medicina ST: R. Rio Branco, 202 - Centro. Tel. (47) 3017-5001
            </p>

            <p>
              DataMed Saúde Ocupacional: R. Abdon Batista, 314 - Centro. Tel. (47) 3432-8242"
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="w-100 d-grid gap-2">
            <Button variant="success" onClick={handleSubmit}>
              Salvar
            </Button>
          </div>

          <div className="w-100 d-flex flex-wrap gap-2 mt-2">
            <Button variant="primary" className="flex-fill" onClick={handleSendEmailToMabecon}>
              Solicitar admissão via e-mail
            </Button>

            <Button variant="primary" className="flex-fill" onClick={() => setNewNationalityModalOpen(true)}>
              Nova nacionalidade
            </Button>

            <Button variant="primary" className="flex-fill" onClick={() => setNewStateModalOpen(true)}>
              Novo estado
            </Button>

            <Button variant="primary" className="flex-fill" onClick={() => setNewCityModalOpen(true)}>
              Nova cidade
            </Button>

            <Button variant="primary" className="flex-fill" onClick={() => setNewNeighborhoodModalOpen(true)}>
              Novo bairro
            </Button>
          </div>

          <div className="w-100 d-grid gap-2 mt-3">
            <Button variant="light" onClick={handleClose}>
              Fechar
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <NewNationalityModal
        newNationalityModalOpen={newNationalityModalOpen}
        setNewNationalityModalOpen={setNewNationalityModalOpen}
      />

      <NewStateModal
        newStateModalOpen={newStateModalOpen}
        setNewStateModalOpen={setNewStateModalOpen}
        setStatesOptions={setStatesOptions}
      />

      <NewCityModal
        newCityModalOpen={newCityModalOpen}
        setNewCityModalOpen={setNewCityModalOpen}
        setCitiesOptions={setCitiesOptions}
      />

      <NewNeighborhoodModal
        newNeighborhoodModalOpen={newNeighborhoodModalOpen}
        setNewNeighborhoodModalOpen={setNewNeighborhoodModalOpen}
        setNeighborhoodOptions={setNeighborhoodOptions}
      />
    </>
  )
}

export default EditWorkerModal
