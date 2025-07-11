import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { Filter, Trash } from "react-bootstrap-icons"
import ReactSelect from "react-select"
import Swal from "sweetalert2"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import ConfirmApplicantDeleteModal from "./ConfirmApplicantDeleteModal"
import ExamsCorrectionModal from "./ExamsCorrectionModal"
import ExamsEmissionModal from "./ExamsEmissionModal"
import HireApplicantModal from "./HireApplicantModal"
import NewApplicantModal from "./NewApplicantModal"
import ProcessChecklistModal from "./ProcessChecklistModal"
import RedirectToModal from "./RedirectToModal"
import SelectiveProcessModal from "./SelectiveProcessModal"
import SpecialNotationModal from "./SpecialNotationModal"
import TalentsDatabaseModal from "./TalentsDatabaseModal"

const yesNoOptions = [{ value: "aprovado", label: "aprovado" }, { value: "reprovado", label: "reprovado" }]

const Applicants = () => {
  const userSession = useUserSessionStore((state) => state.userSession)

  const [applicantToSearch, setApplicantToSearch] = useState()

  const [applicantsOptions, setApplicantsOptions] = useState()

  const [applicantsList, setApplicantsList] = useState()

  const [selectedApplicant, setSelectedApplicant] = useState()

  const [examsEmissionModalOpen, setExamsEmissionModalOpen] = useState(false)

  const [examsCorrectionModalOpen, setExamsCorrectionModalOpen] = useState(false)

  const [newApplicantModalOpen, setNewApplicantModalOpen] = useState(false)

  const [selectiveProcessModalOpen, setSelectiveProcessModalOpen] = useState(false)

  const [hireApplicantModalOpen, setHireApplicantModalOpen] = useState(false)

  const [confirmApplicantDeleteModalOpen, setConfirmApplicantDeleteModalOpen] = useState(false)

  const [redirectToModalOpen, setRedirectToModalOpen] = useState(false)

  const [specialNotatioModalOpen, setSpecialNotatioModalOpen] = useState(false)

  const [processChecklistModalOpen, setProcessChecklistModalOpen] = useState(false)

  const [subsidiariesOptions, setSubsidiariesOptions] = useState()

  const [selectedSubsidiarieOption, setSelectedSubsidiarieOption] = useState()

  const [talentsDatabaseModalOpen, setTalentsDatabaseModalOpen] = useState(false)

  const [defaultTalentsDatabaseTurn, setDefaultTalentsDatabaseTurn] = useState()

  const [defaultTalentsDatabaseFunction, setDefaultTalentsDatabaseFunction] = useState()

  useEffect(() => {
    api
      .get("/applicants")
      .then((response) => {
        let options = []

        options.push({ value: "todos", label: "Todos" })

        response.data.map((option) => {
          options.push({ value: option.id, label: option.name })
        })

        setApplicantsOptions(options)

        setApplicantsList(response.data)
      })

    api
      .get("/subsidiaries")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setSubsidiariesOptions(options)
      })
  }, [])

  useEffect(() => {
    if (applicantToSearch) {
      if (applicantToSearch.value == "todos") {
        api
          .get("/applicants")
          .then((response) => {
            setApplicantsList(response.data)
          })
      } else {
        api
          .get("/applicants")
          .then((response) => {
            const applicantToShow = response.data.filter((applicant) => applicant.id == applicantToSearch.value)

            setApplicantsList(applicantToShow)
          })
      }
    }
  }, [applicantToSearch])

  const handleOpenNewApplicantModal = () => {
    setSelectedApplicant(null)

    setNewApplicantModalOpen(true)
  }

  const handleOpenSelectiveProcessModal = (applicant) => {
    setSelectedApplicant(applicant)

    setSelectiveProcessModalOpen(true)
  }

  const handleOpenHireApplicantModal = (applicant) => {
    setSelectedApplicant(applicant)

    setHireApplicantModalOpen(true)
  }

  const onChangeRhOpinion = (opinion, applicant) => {
    let requestBody = {
      rh_opinion: opinion.value,
    }

    api
      .patch(`/applicants/${applicant?.id}`, requestBody)
      .then(() => {
        api
          .get("/applicants")
          .then((response) => setApplicantsList(response.data))
      })
  }

  const onChangeCoordinatorOpinion = (opinion, applicant) => {
    let requestBody = {
      coordinator_opinion: opinion.value,
    }

    api
      .patch(`/applicants/${applicant?.id}`, requestBody)
      .then(() => {
        api
          .get("/applicants")
          .then((response) => setApplicantsList(response.data))
      })
  }

  const handleOpenSpecialNotationMoal = (applicant) => {
    setSelectedApplicant(applicant)

    setSpecialNotatioModalOpen(true)
  }

  const handleSendEmailFeedback = (applicant) => {
    if (!applicant?.rh_opinion || !applicant?.coordinator_opinion) {
      Swal.fire("Erro", "É necessário preencher o parecer do RH e do gestor antes de enviar retorno para candidato", "error")

      return
    }

    if (!applicant?.email) {
      Swal.fire("Erro", "É necessário que o campo de celular esteja preenchido para enviar o retorno via WhatsApp", "error")

      return
    }

    let failMessage = `
      Prezado(a) ${applicant.name}!

      Agradecemos seu interesse em participar do nosso processo seletivo. 
      No momento, optamos por não evoluir com a sua candidatura.
      Vamos manter o seu currículo em nosso banco de talentos para novas
      oportunidades e encorajamos que se inscreva em processos futuros.
    
      Desejamos sucesso em sua jornada profissional!
      
      Abraços,
      
      Recursos Humanos
      Postos Graciosa
    `

    let successMessage = `
      Prezado(A) ${applicant.name}!,

      Agradecemos a confiança e gentileza de nos ouvir.
      Conforme conversamos, estamos muito felizes em lhe
      informar que você foi aprovado para a próxima etapa do
      nosso processo seletivo! Agora, vamos para a próxima
      fase, em breve entraremos em contato passando mais
      informações.

      Abraços,
      
      Recursos Humanos
      Postos Graciosa
    `

    const isRejected = (
      applicant.rh_opinion == "reprovado" ||
      applicant.coordinator_opinion == "reprovado"
    )

    const requestBody = {
      id: applicant.id,
      name: applicant.name,
      email: applicant.email,
      message: isRejected ? failMessage : successMessage,
    }

    if (requestBody.email == null || requestBody.email == undefined) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Um erro inesperado ocorreu, verifique sua conexão e tente novamente mais tarde",
        timer: 2000,
      })
    }

    api
      .post("/applicants/send-feedback-email", requestBody)
      .then((response) => {
        if (response.status == 200) {
          api
            .get("/applicants")
            .then((response) => setApplicantsList(response.data))

          Swal.fire({
            icon: "success",
            title: "Sucesso",
            text: "E-mail encaminhado com sucesso",
            timer: 2000,
          })
        } else {
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Um erro inesperado ocorreu, verifique sua conexão e tente novamente mais tarde",
            timer: 2000,
          })
        }
      })
  }

  const handleWhatsappFeedback = (applicant) => {
    if (!applicant?.rh_opinion || !applicant?.coordinator_opinion) {
      Swal.fire("Erro", "É necessário preencher o parecer do RH e do gestor antes de enviar retorno para candidato", "error")

      return
    }

    if (!applicant?.mobile) {
      Swal.fire("Erro", "É necessário que o campo de celular esteja preenchido para enviar o retorno via WhatsApp", "error")

      return
    }

    let failMessage = `
      Prezado(a) ${applicant?.name}!

      Agradecemos seu interesse em participar do nosso processo seletivo. 
      No momento, optamos por não evoluir com a sua candidatura.
      Vamos manter o seu currículo em nosso banco de talentos para novas
      oportunidades e encorajamos que se inscreva em processos futuros.
      
      Desejamos sucesso em sua jornada profissional!
        
      Abraços,
        
      Recursos Humanos
      Postos Graciosa
    `

    let successMessage = `
      Prezado(A) ${applicant?.name}!,

      Agradecemos a confiança e gentileza de nos ouvir.
      Conforme conversamos, estamos muito felizes em lhe
      informar que você foi aprovado para a próxima etapa do
      nosso processo seletivo! Agora, vamos para a próxima
      fase, em breve entraremos em contato passando mais
      informações.

      Segue lista de documentações: https://drive.google.com/file/d/1FefOkU4VNQlgBXiSREGngQD8Fr7AmY8n/view?usp=sharing

      Abraços,
        
      Recursos Humanos
      Postos Graciosa
    `

    let isRejected = (
      applicant?.rh_opinion == "reprovado" ||
      applicant?.coordinator_opinion == "reprovado"
    )

    const phone = applicant?.mobile

    const message = isRejected ? failMessage : successMessage

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

    window.open(url, '_blank')

    let requestBody = {
      whatsapp_feedback: "sim"
    }

    api.patch(`/applicants/${selectedApplicant?.id}`, requestBody)

    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))
  }

  const handleInactivateApplicant = (applicant) => {
    let requestBody = {
      is_active: false
    }

    api
      .patch(`/applicants/${applicant?.id}`, requestBody)
      .then(() => {
        api
          .get("/applicants")
          .then((response) => setApplicantsList(response.data))
      })
  }

  const handleGetApplicantsInProcess = () => {
    api
      .get("/applicants/in-process")
      .then((response) => {
        setApplicantsList(response.data)
      })
  }

  const handleGetApplicantsApproved = () => {
    api
      .get("/applicants/approved")
      .then((response) => {
        setApplicantsList(response.data)
      })
  }

  const handleGetApplicantsReproved = () => {
    api
      .get("/applicants/reproved")
      .then((response) => {
        setApplicantsList(response.data)
      })
  }

  const handleOnchangeTalentsDatabase = (value, applicant) => {
    let requestBody = {
      talents_database: value?.value
    }

    console.log(requestBody, value)

    api
      .patch(`/applicants/${applicant?.id}`, requestBody)
      .then((response) => {
        console.log(response)

        api
          .get("/applicants")
          .then((response) => setApplicantsList(response.data))
      })
  }

  const handleOpenTalentsDatabaseModal = (applicant) => {
    if (applicant.talents_database_turn) {
      api
        .get(`/turns/${applicant.talents_database_turn}`)
        .then((response) => setDefaultTalentsDatabaseTurn({ value: response.data.id, label: response.data.name }))
    }

    if (applicant.talents_database_function) {
      api
        .get(`/functions/${applicant.talents_database_function}`)
        .then((response) => setDefaultTalentsDatabaseFunction({ value: response.data.id, label: response.data.name }))
    }

    setSelectedApplicant(applicant)

    setTalentsDatabaseModalOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div>
          <button className="btn btn-primary" onClick={handleOpenNewApplicantModal}>
            Novo candidato
          </button>
        </div>

        <div className="row mt-3">
          <div className="col">
            <ReactSelect
              options={applicantsOptions}
              defaultValue={{ value: "todos", label: "Todos" }}
              onChange={(value) => setApplicantToSearch(value)}
            />
          </div>

          <div className="col-auto">
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Filter />
              </button>

              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={handleGetApplicantsInProcess}>
                    Em processo
                  </button>
                </li>

                <li>
                  <button className="dropdown-item" onClick={handleGetApplicantsApproved}>
                    Aprovados
                  </button>
                </li>

                <li>
                  <button className="dropdown-item" onClick={handleGetApplicantsReproved}>
                    Reprovados
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-3">
          {
            applicantsList && applicantsList.map((applicant) => (
              <div className="card mb-3 shadow">
                <div className="card-body">
                  <h5 className="card-title">{applicant.name}</h5>

                  <div className="text-muted mb-2">
                    {applicant.attendance_date ? dayjs(applicant.attendance_date).format("DD/MM/YYYY") : ""}
                  </div>

                  {
                    applicant.email_feedback === "sim" && (
                      <span className="badge text-bg-success p-2 me-2">Retorno E-mail</span>
                    )
                  }

                  {
                    applicant.whatsapp_feedback === "sim" && (
                      <span className="badge text-bg-success p-2 me-2">Retorno WhatsApp</span>
                    )
                  }

                  {
                    applicant.selective_process_status == "efetivado" && (
                      <span className="badge text-bg-success p-2 me-2">Efetivado</span>
                    )
                  }
                </div>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <button
                      className="btn btn-light w-100"
                      onClick={() => {
                        setSelectedApplicant(applicant)
                        setProcessChecklistModalOpen(true)
                      }
                      }
                    >
                      Andamento do processo
                    </button>
                  </li>

                  <li className="list-group-item">
                    <button
                      className="btn btn-primary w-100"
                      // disabled={
                      //   !(
                      //     userSession?.id === applicant.created_by ||
                      //     userSession?.id === applicant.redirect_to
                      //   )
                      // }
                      onClick={() => handleOpenSelectiveProcessModal(applicant)}
                    >
                      Processo seletivo
                    </button>
                  </li>

                  {/* <li className="list-group-item">
                    <label className="fw-bold mb-2 d-block">
                      Banco de Talentos
                    </label>

                    <ReactSelect
                      placeholder="Selecione uma opção"
                      options={subsidiariesOptions}
                      onChange={(value) => handleOnchangeTalentsDatabase(value, applicant)}
                      value={subsidiariesOptions?.find(
                        (option) => option.value === applicant?.talents_database
                      )}
                      isDisabled={applicant?.talents_database && true}
                    />
                  </li> */}

                  <li className="list-group-item">
                    <label className="fw-bold mb-3">
                      Parecer RH
                    </label>

                    <ReactSelect
                      placeholder=""
                      options={yesNoOptions}
                      onChange={(opinion) => onChangeRhOpinion(opinion, applicant)}
                      defaultValue={yesNoOptions?.find((option) => option.value === applicant?.rh_opinion)}
                      // isDisabled={
                      //   userSession?.id != applicant.created_by && userSession?.id != applicant.redirect_to && true || !!applicant?.rh_opinion && true
                      // }
                      className={`react-select ${applicant?.rh_opinion
                        ? applicant.rh_opinion === "aprovado"
                          ? "is-valid"
                          : "is-invalid"
                        : ""}`}
                      classNamePrefix="react-select"
                      styles={
                        applicant?.rh_opinion
                          ? applicant.rh_opinion === "aprovado"
                            ? {
                              control: (base) => ({
                                ...base,
                                borderColor: 'green',
                                boxShadow: '0 0 0 0.25rem rgba(25, 135, 84, 0.25)',
                                '&:hover': { borderColor: 'green' },
                              }),
                            }
                            : {
                              control: (base) => ({
                                ...base,
                                borderColor: '#dc3545',
                                boxShadow: '0 0 0 0.25rem rgba(220, 53, 69, 0.25)',
                                '&:hover': { borderColor: '#dc3545' },
                              }),
                            }
                          : {}
                      }
                    />
                  </li>

                  <li className="list-group-item">
                    <label className="fw-bold mb-3">
                      Parecer gestor
                    </label>

                    <ReactSelect
                      placeholder=""
                      options={yesNoOptions}
                      onChange={(opinion) => onChangeCoordinatorOpinion(opinion, applicant)}
                      defaultValue={yesNoOptions.find((option) => option.value === applicant?.coordinator_opinion)}
                      // isDisabled={
                      //   userSession?.id != applicant.created_by && userSession?.id != applicant.redirect_to && true || !!applicant?.coordinator_opinion && true
                      // }
                      className={`react-select ${applicant?.coordinator_opinion
                        ? applicant.coordinator_opinion === "aprovado"
                          ? "is-valid"
                          : "is-invalid"
                        : ""}`}
                      classNamePrefix="react-select"
                      styles={
                        applicant?.coordinator_opinion
                          ? applicant.coordinator_opinion === "aprovado"
                            ? {
                              control: (base) => ({
                                ...base,
                                borderColor: 'green',
                                boxShadow: '0 0 0 0.25rem rgba(25, 135, 84, 0.25)',
                                '&:hover': { borderColor: 'green' },
                              }),
                            }
                            : {
                              control: (base) => ({
                                ...base,
                                borderColor: '#dc3545',
                                boxShadow: '0 0 0 0.25rem rgba(220, 53, 69, 0.25)',
                                '&:hover': { borderColor: '#dc3545' },
                              }),
                            }
                          : {}
                      }
                    />
                  </li>

                  <li className="list-group-item">
                    <div className="text-center mt-3">
                      <label className="fw-bold mb-4 text-center">
                        Não se esqueça de dar retorno ao candidato =)
                      </label>
                    </div>

                    <div>
                      <button className="btn btn-light shadow w-100 fw-bold rounded" onClick={() => handleOpenTalentsDatabaseModal(applicant)}>
                        Banco de Talentos
                      </button>
                    </div>

                    <div className="row mt-4 mb-4">
                      <div className="col">
                        <button
                          className="btn btn-light w-100 shadow fw-bold"
                          onClick={() => handleSendEmailFeedback(applicant)}
                        >
                          E-mail
                        </button>
                      </div>

                      <div className="col">
                        <button
                          className="btn btn-light w-100 shadow fw-bold"
                          onClick={() => handleWhatsappFeedback(applicant)}
                        >
                          WhatsApp
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => handleInactivateApplicant(applicant)}
                      >
                        <Trash />
                      </button>
                    </div>
                  </li>

                  <li className="list-group-item">
                    {
                      applicant?.rh_opinion === "aprovado" &&
                      applicant?.coordinator_opinion === "aprovado" && (
                        <div style={{ minWidth: '180px' }}>
                          <button
                            className="btn btn-success w-100"
                            onClick={() => handleOpenHireApplicantModal(applicant)}
                            disabled={
                              !(
                                userSession?.id === applicant.created_by ||
                                userSession?.id === applicant.redirect_to ||
                                userSession?.function?.name == "Analista de RH"
                              )
                            }
                          >
                            Efetivar
                          </button>
                        </div>
                      ) || applicant?.rh_opinion === "reprovado" && (
                        <div style={{ minWidth: '180px' }}>
                          <button
                            className="btn btn-dark w-100"
                            onClick={() => handleOpenSpecialNotationMoal(applicant)}
                            disabled={!(userSession?.id === applicant.created_by)}
                          >
                            Anotação especial
                          </button>
                        </div>
                      ) || applicant?.coordinator_opinion === "reprovado" && (
                        <div style={{ minWidth: '180px' }}>
                          <button
                            className="btn btn-dark w-100"
                            onClick={() => handleOpenSpecialNotationMoal(applicant)}
                            disabled={!(userSession?.id === applicant.created_by)}
                          >
                            Anotação especial
                          </button>
                        </div>
                      )
                    }
                  </li>
                </ul>
              </div>
            ))
          }
        </div>
      </div>

      <ExamsEmissionModal
        examsEmissionModalOpen={examsEmissionModalOpen}
        setExamsEmissionModalOpen={setExamsEmissionModalOpen}
      />

      <ExamsCorrectionModal
        examsCorrectionModalOpen={examsCorrectionModalOpen}
        setExamsCorrectionModalOpen={setExamsCorrectionModalOpen}
      />

      <NewApplicantModal
        newApplicantModalOpen={newApplicantModalOpen}
        setNewApplicantModalOpen={setNewApplicantModalOpen}
        setApplicantsList={setApplicantsList}
      />

      <SelectiveProcessModal
        selectiveProcessModalOpen={selectiveProcessModalOpen}
        setSelectiveProcessModalOpen={setSelectiveProcessModalOpen}
        selectedApplicant={selectedApplicant}
        setApplicantsList={setApplicantsList}
        setSelectedApplicant={setSelectedApplicant}
        applicantToSearch={applicantToSearch}
      />

      <HireApplicantModal
        hireApplicantModalOpen={hireApplicantModalOpen}
        setHireApplicantModalOpen={setHireApplicantModalOpen}
        selectedApplicant={selectedApplicant}
        setApplicantsList={setApplicantsList}
      />

      <ConfirmApplicantDeleteModal
        confirmApplicantDeleteModalOpen={confirmApplicantDeleteModalOpen}
        setConfirmApplicantDeleteModalOpen={setConfirmApplicantDeleteModalOpen}
        selectedApplicant={selectedApplicant}
        setApplicantsList={setApplicantsList}
      />

      <RedirectToModal
        redirectToModalOpen={redirectToModalOpen}
        setRedirectToModalOpen={setRedirectToModalOpen}
      />

      <SpecialNotationModal
        specialNotatioModalOpen={specialNotatioModalOpen}
        setSpecialNotatioModalOpen={setSpecialNotatioModalOpen}
        selectedApplicant={selectedApplicant}
        setSelectedApplicant={setSelectedApplicant}
        setApplicantsList={setApplicantsList}
      />

      <ProcessChecklistModal
        processChecklistModalOpen={processChecklistModalOpen}
        setProcessChecklistModalOpen={setProcessChecklistModalOpen}
        applicantId={selectedApplicant?.id}
      />

      <TalentsDatabaseModal
        selectedApplicant={selectedApplicant}
        talentsDatabaseModalOpen={talentsDatabaseModalOpen}
        setTalentsDatabaseModalOpen={setTalentsDatabaseModalOpen}
        defaultTalentsDatabaseTurn={defaultTalentsDatabaseTurn}
        setDefaultTalentsDatabaseTurn={setDefaultTalentsDatabaseTurn}
        defaultTalentsDatabaseFunction={defaultTalentsDatabaseFunction}
        setDefaultTalentsDatabaseFunction={setDefaultTalentsDatabaseFunction}
      />
    </>
  )
}

export default Applicants