import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Plus, Trash } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactInputMask from 'react-input-mask'
import Swal from 'sweetalert2'
import Input from '../../components/form/Input'
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
import NewCityModal from './NewCityModal'
import NewNationalityModal from './NewNationalityModal'
import NewNeighborhoodModal from './NewNeighborhoodModal'
import NewStateModal from './NewStateModal'

function calcularTempoDeEmpresa(dataAdmissaoStr) {
  const dataAdmissao = new Date(dataAdmissaoStr)

  const hoje = new Date()

  let anos = hoje.getFullYear() - dataAdmissao.getFullYear()

  let meses = hoje.getMonth() - dataAdmissao.getMonth()

  let dias = hoje.getDate() - dataAdmissao.getDate()

  if (dias < 0) {
    meses -= 1

    const ultimoDiaMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate()

    dias += ultimoDiaMesAnterior
  }

  if (meses < 0) {
    anos -= 1

    meses += 12
  }

  const partes = []

  if (anos > 0) {
    partes.push(`${anos} ${anos === 1 ? 'ano' : 'anos'}`)
  }

  if (meses > 0) {
    partes.push(`${meses} ${meses === 1 ? 'mês' : 'meses'}`)
  }

  if (dias > 0) {
    partes.push(`${dias} ${dias === 1 ? 'dia' : 'dias'}`)
  }

  return partes.length ? partes.join(" e ") : "Menos de um dia"
}

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

  const [residentialCity, setResidentialCity] = useState()

  const [birthState, setBirthstate] = useState()

  const [cnhCategoriesOptions, setCnhCategoriesOptions] = useState()

  const [earlyPayment, setEarlyPayment] = useState()

  const [harmfullExposition, setHarmfullExposition] = useState()

  const [functionCode, setFunctionCode] = useState()

  const [seeTurn, setSeeTurn] = useState()

  const [hasExperienceTime, setHasExperienceTime] = useState(false)

  const [doc, setDoc] = useState()

  const [docTitle, setDocTitle] = useState()

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

  // const [benefits, setBenefits] = useState()

  // const [seeBenefitis, setSeeBenefits] = useState(false)

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

    getParentsType()
      .then((response) => {
        let options = response?.data.map((parentType) => ({ value: parentType.id, label: parentType.name }))

        setParentsTypeOptions(options)
      })

    api
      .get("/neighborhoods")
      .then((response) => {
        let options = response?.data.map((neighborhood) => ({ value: neighborhood.id, label: neighborhood.name, cityId: neighborhood.city_id }))

        setNeighborhoodOptions(options)
      })

    api
      .get("/cities")
      .then((response) => {
        let options = response?.data.map((option) => ({ value: option.Cities.id, label: option.Cities.name, stateId: option.Cities.state_id }))

        setCitiesOptions(options)
      })
  }, [])

  useEffect(() => {
    if (selectedNeighborhood) {
      api
        .get(`/cities/${selectedNeighborhood?.cityId}`)
        .then((response) => {
          setResidentialCity(response.data)
        })
    }
  }, [selectedNeighborhood])

  useEffect(() => {
    if (birthcity) {
      api
        .get(`/states/${birthcity.stateId}`)
        .then((response) => {
          setBirthstate(response.data)
        })
    }
  }, [birthcity])

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

  // useEffect(() => {
  //   if (benefits?.value == true) {
  //     setSeeBenefits(true)
  //   } else {
  //     setSeeBenefits(false)
  //   }
  // }, [benefits])

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

    setResidentialCity()

    setBirthstate()

    setEarlyPayment()

    setHarmfullExposition()

    setFunctionCode()

    setSeeTurn()

    setHasExperienceTime(false)

    setCreateWorkerModalOpen(false)

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

  const handleRemoveWorkersParents = (i) => {
    const updatedParentsData = [...parentsData]

    updatedParentsData.splice(i, 1)

    setParentsData(updatedParentsData)
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
  }

  const handleSubmit = () => {
    const validations = [
      { field: name, title: "Nome é um campo obrigatório", text: "Por favor, adicione um nome ao colaborador" },
      { field: selectedFunction, title: "Função é um campo obrigatório", text: "Por favor, adicione uma função ao colaborador" },
      { field: selectedTurn, title: "Turno é um campo obrigatório", text: "Por favor, adicione um turno ao colaborador" },
      { field: selectedCostCenter, title: "Centro de custo é um campo obrigatório", text: "Por favor, adicione um centro de custo ao colaborador" },
      { field: selectedDepartment, title: "Setor é um campo obrigatório", text: "Por favor, adicione um setor ao colaborador" },
      { field: admissionDate, title: "Data de admissão é um campo obrigatório", text: "Por favor, adicione uma data de admissão ao colaborador" },
    ]

    for (const { field, title, text } of validations) {
      if (!field) {
        return Swal.fire({
          title,
          text,
          icon: "error"
        })
      }
    }

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
      "cnh_category": cnhCategory?.value,
      "cnh_emition_date": cnhEmissionDate,
      "cnh_valid_date": cnhValidDate,
      "first_job": firstJob && true,

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

      "month_wage": monthWage,
      "hour_wage": hourWage,
      "journey_wage": journeyWage,

      "transport_voucher": (
        transportVoucher?.value !== undefined ?
          transportVoucher?.value
          :
          selectedWorker?.transport_voucher
      ),

      "diary_workjourney": diaryWorkJourney,
      "week_workjourney": weekWorkJourney,
      "month_workjourney": monthWorkJourney,
      "experience_time": experienceTime?.value,
      "nocturne_hours": nocturneHours,

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

      "propotional_payment": proportionalPayment?.value,
      "total_nocturne_workjourney": totalNocturneWorkjourney,
      "twenty_five_workjourney": twentyFiveWorkjourney,
      "twenty_two_to_five_week_workjourney": twentyTwoToFiveWeekWorkjourney,
      "twenty_two_to_five_month_workjourney": twentyTwoToFiveMonthWorkjourney,
      "twenty_two_to_five_effective_diary_workjourney": twentyTwoToFiveEffectiveDiaryWorkjourney,

      "healthcare_plan": (
        healthcarePlan?.value !== undefined ?
          healthcarePlan?.value
          :
          selectedWorker?.healthcare_plan
      ),

      "healthcare_plan_discount": healthcarePlanDiscount,

      "life_insurance": (
        lifeInsurance?.value !== undefined ?
          lifeInsurance?.value
          :
          selectedWorker?.life_insurance
      ),

      "life_insurance_discount": lifeInsuranceDiscount,
      "ag": ag,
      "cc": cc,
      "early_payment_discount": earlyPaymentDiscount,
    }

    api
      .post("/workers", formData)
      .then((response) => {
        let newWorkerData = response?.data

        if (response.status == 200 && workersDocs) {
          const promises = workersDocs.map((doc) => {
            return axios
              .post(`${import.meta.env.VITE_API_URL}/upload-pdf/${newWorkerData?.id}`,
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

          Promise.all(promises).then(() => {
            handleClose()
          })
        }

        if (response.status == 200 && parentsData) {
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
              <label><b>Número de emergência</b></label>

              <ReactInputMask
                mask={"(99) 99999-9999"}
                className="form-control"
                onChange={(e) => setEmergencyNumber(e.target.value)}
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
              <label><b>Cidade</b></label>

              <input
                className="form-control"
                disabled="true"
                value={residentialCity?.name}
              />
            </div>

            <div className="col">
              <Select
                placeholder={""}
                label={"Bairro"}
                options={neighborhoodOptions}
                setSelectedValue={setSelectedNeighborhood}
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
                mask={"(99) 9999-9999"}
                className="form-control"
                onChange={(e) => setSelectedPhone(e.target.value)}
              />
            </div>

            <div className="col">
              <label><b>Celular</b></label>

              <ReactInputMask
                mask={"(99) 99999-9999"}
                className="form-control"
                onChange={(e) => setSelectedMobile(e.target.value)}
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
              <label><b>Estado</b></label>

              <input
                className="form-control"
                disabled="true"
                value={birthState?.name}
              />
            </div>

            <div className="col">
              <Select
                placeholder={""}
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

          <div>
            <h4>Documentos</h4>
          </div>

          <div className="row">
            <div className="col">
              <label><b>CPF</b></label>

              <ReactInputMask
                mask={"999.999.999-99"}
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
                  <Select
                    placeholder={""}
                    label={"categoria"}
                    options={cnhCategoriesOptions}
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

          <h4>Dependentes</h4>

          {
            parentsData?.map((parent, i) => (
              <>
                <div className="row">
                  <div className="col-11">
                    <input
                      type="text"
                      className="form-control mb-2"
                      disabled="true"
                      value={
                        `${parent.parentsType?.label} / ${parent?.parentsName} / ${parent.parentsCpf} / ${moment(parent.parentsDatebirth).format("DD/MM/YYYY")} / ${parent.parentsBooks && parent.parentsBooks || "Não"} / ${parent.parentsPapers && parent.parentsPapers || "Não"}`
                      }
                    />
                  </div>

                  <div className="col-1">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveWorkersParents(i)}
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              </>
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
                    type="text"
                    className="form-control"
                    disabled={"true"}
                    value={seeTurn?.week || ""}
                  />
                </div>

                <div className="col">
                  <label><b>Início de turno</b></label>

                  <input
                    type="text"
                    className="form-control"
                    disabled={"true"}
                    value={seeTurn?.start_time || ""}
                  />
                </div>

                <div className="col">
                  <label><b>Início de intervalo</b></label>

                  <input
                    type="text"
                    className="form-control"
                    disabled={"true"}
                    value={seeTurn?.start_interval_time || ""}
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
              <label><b>Tempo de empresa</b></label>

              <input className="form-control" disabled value={timeEnterprise} />
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
                label={"Haverá experiência?"}
                options={trueFalseOptions}
                setSelectedValue={setHasExperienceTime}
              />

              {
                hasExperienceTime.value == true && (
                  <>
                    <label><b>Primeiro período de experiência</b></label>

                    <input
                      type="text"
                      className="form-control mb-2"
                      disabled={"true"}
                      value={"30 dias"}
                    />

                    <label><b>Segundo período de experiência</b></label>

                    <input
                      type="text"
                      className="form-control mb-2"
                      disabled={"true"}
                      value={"60 dias"}
                    />
                  </>
                )
              }
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

          <div>
            <Select
              label={"Horas noturnas?"}
              placeholder={""}
              options={trueFalseOptions}
              setSelectedValue={setHasNocturneHours}
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
                      />
                    </div>

                    <div className="col">
                      <Input
                        label={"Total de horas noturnas diárias"}
                        placeholder={""}
                        setSelectedValue={setTotalNocturneWorkjourney}
                      />
                    </div>

                    <div className="col">
                      <Input
                        label={"Jornada parcial até 25 horas semanais"}
                        placeholder={""}
                        setSelectedValue={setTwentyFiveWorkjourney}
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
                      />
                    </div>

                    <div className="col">
                      <Input
                        label={"Total de horas por mês"}
                        placeholder={""}
                        setSelectedValue={setTwentyTwoToFiveMonthWorkjourney}
                      />
                    </div>

                    <div className="col">
                      <Input
                        label={"Carga horária diária efetiva com trabalho noturno"}
                        placeholder={""}
                        setSelectedValue={setTwentyTwoToFiveEffectiveDiaryWorkjourney}
                      />
                    </div>
                  </div>
                </>
              )
            }
          </div>

          <div className="row">
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
          </div>

          <div className="row">
            <div className="col">
              <Select
                placeholder={""}
                options={trueFalseOptions}
                label={"Adiantamento salarial"}
                setSelectedValue={setEarlyPayment}
              />
            </div>

            <div className="col">
              <Input
                label={"Porcentagem ou valor"}
                placeholder={""}
                setSelectedValue={setEarlyPaymentDiscount}
              />
            </div>

            <div className="col">
              <Select
                placeholder={""}
                options={trueFalseOptions}
                label={"Exposição a agente nocivo"}
                setSelectedValue={setHarmfullExposition}
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
              />
            </div>

            <div className="col">
              <Input
                label={"Desconto em folha"}
                placeholder={""}
                setSelectedValue={setHealthcarePlanDiscount}
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
              />
            </div>

            <div className="col">
              <Input
                label={"Desconto em folha"}
                placeholder={""}
                setSelectedValue={setLifeInsuranceDiscount}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Input
                label={"AG"}
                placeholder={""}
                setSelectedValue={setAg}
              />
            </div>

            <div className="col">
              <Input
                label={"CC"}
                placeholder={""}
                setSelectedValue={setCc}
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

export default CreateWorkerModal