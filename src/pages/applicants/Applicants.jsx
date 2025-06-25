import dayjs from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import { useEffect, useState } from "react"
import { ArrowClockwise, Trash } from "react-bootstrap-icons"
import ReactSelect from "react-select"
import Swal from "sweetalert2"
import Nav from "../../components/Nav"
import SideMenu from "../../components/SideMenu"
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

const yesNoOptions = [{ value: "aprovado", label: "aprovado" }, { value: "reprovado", label: "reprovado" }]

const Applicants = () => {
  const userSession = useUserSessionStore((state) => state.userSession)

  console.log(userSession)

  const [applicantToSearch, setApplicantToSearch] = useState()

  const [startDate, setStartDate] = useState()

  const [endDate, setEndDate] = useState()

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

  useEffect(() => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))
  }, [])

  // useEffect(() => {
  //   if (applicantToSearch) {
  //     api
  //       .get("/applicants")
  //       .then((response) => {
  //         let newApplicantsList = response.data.filter((applicant) => applicant.name.toLowerCase() == applicantToSearch.toLowerCase())

  //         setApplicantsList(newApplicantsList)
  //       })
  //   }
  // }, [applicantToSearch])

  useEffect(() => {
    if (applicantToSearch) {
      api
        .get("/applicants")
        .then((response) => {
          const newApplicantsList = response.data.filter((applicant) => {
            const firstName = applicant.name.split(" ")[0].toLowerCase()
            return firstName === applicantToSearch.toLowerCase()
          })

          setApplicantsList(newApplicantsList)
        })
    }
  }, [applicantToSearch])

  useEffect(() => {
    if (startDate && endDate) {
      dayjs.extend(isSameOrAfter)

      dayjs.extend(isSameOrBefore)

      const newApplicantsList = applicantsList?.filter((applicant) =>
        dayjs(applicant.attendance_date).isSameOrAfter(dayjs(startDate)) &&
        dayjs(applicant.attendance_date).isSameOrBefore(dayjs(endDate))
      )

      setApplicantsList(newApplicantsList)
    }
  }, [startDate, endDate])

  const handleReloadApplicantsList = () => {
    api
      .get("/applicants")
      .then((response) => {
        setApplicantToSearch()

        setApplicantsList(response.data)
      })
  }

  const handleOpenExamsEmissionModal = () => {
    setExamsEmissionModalOpen(true)
  }

  const handleOpenExamsCorrectionModal = () => {
    setExamsCorrectionModalOpen(true)
  }

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

  const handleOpenConfirmApplicantDeleteModal = (applicant) => {
    setSelectedApplicant(applicant)

    setConfirmApplicantDeleteModalOpen(true)
  }

  const handleOpenRedirectToModal = () => {
    setRedirectToModalOpen(true)
  }

  const handlePrintDocsList = () => {
    printJS({
      printable: "/lista_de_documentos.pdf",
      type: 'pdf',
    })
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
      
      Time de RH
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
      
      Time de RH
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
        
      Time de RH
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
        
      Time de RH
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

  return (
    <>
      <SideMenu />

      <Nav />

      <div className="container">
        <div>
          <button type="button" class="btn btn-primary position-relative">
            Profile
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              New
              <span class="visually-hidden">New alerts</span>
            </span>
          </button>

          <button className="btn btn-primary ms-4" onClick={handleOpenNewApplicantModal}>
            Novo candidato
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Buscar candidato
          </label>

          <div className="row">
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setApplicantToSearch(e.target.value)}
              />
            </div>

            <div className="col-2">
              <button className="btn btn-primary" onClick={handleReloadApplicantsList}>
                <ArrowClockwise />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Filtrar
          </label>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input type="date" className="form-control mb-2" onChange={(e) => setStartDate(e.target.value)} />
          </div>

          <div className="col">
            <input type="date" className="form-control mb-2" onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        <div className="mt-5">
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

                  {/* {
                  applicant.feedback_status === "sim" && (
                    <span className="badge text-bg-success p-2">Retornado</span>
                  ) || (
                    <span className="badge text-bg-danger p-2">Não retornado</span>
                  )
                } */}
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
                      disabled={
                        !(
                          userSession?.id === applicant.created_by ||
                          userSession?.id === applicant.redirect_to
                        )
                      }
                      onClick={() => handleOpenSelectiveProcessModal(applicant)}
                    >
                      Processo seletivo
                    </button>
                  </li>

                  <li className="list-group-item">
                    <label className="fw-bold mb-3">
                      Parecer RH
                    </label>

                    <ReactSelect
                      placeholder=""
                      options={yesNoOptions}
                      onChange={(opinion) => onChangeRhOpinion(opinion, applicant)}
                      defaultValue={yesNoOptions.find((option) => option.value === applicant?.rh_opinion)}
                      // isDisabled={!!applicant?.rh_opinion}
                      isDisabled={
                        userSession?.id != applicant.created_by && userSession?.id != applicant.redirect_to && true || !!applicant?.rh_opinion && true
                      }
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
                      isDisabled={
                        userSession?.id != applicant.created_by && userSession?.id != applicant.redirect_to && true || !!applicant?.coordinator_opinion && true
                      }
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
                    <label className="fw-bold mb-3">
                      Não se esqueça de dar retorno ao candidato =)
                    </label>

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
                          {/* <label className="form-label fw-bold">
                          Efetivar
                        </label> */}

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
                          {/* <label className="form-label fw-bold">
                          Anotação especial
                        </label> */}

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
                          {/* <label className="form-label fw-bold">
                          Anotação especial
                        </label> */}

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

        {/* <div>
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th></th>

                <th>Atendimento</th>

                <th>Nome</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                applicantsList && applicantsList.map((applicant, i) => (
                  <tr key={applicant.id}>
                    <td>
                      {
                        applicant.feedback_status === "sim" && (
                          <span className="badge text-bg-success p-2">Retornado</span>
                        ) || (
                          <span className="badge text-bg-danger p-2">Não retornado</span>
                        )
                      }
                    </td>

                    <td className="text-muted">
                      {applicant.attendance_date ? dayjs(applicant.attendance_date).format("DD/MM/YYYY") : ""}
                    </td>

                    <td>{applicant.name}</td>

                    <td>
                      <div className="d-flex flex-wrap gap-3">
                        <div style={{ minWidth: '180px' }}>
                          <label className="form-label fw-bold">
                            Processo seletivo
                          </label>

                          <button
                            className="btn btn-primary w-100"
                            disabled={
                              !(
                                userSession?.id === applicant.created_by ||
                                userSession?.id === applicant.redirect_to
                              )
                            }
                            onClick={() => handleOpenSelectiveProcessModal(applicant)}
                          >
                            <Arrow90degRight />
                          </button>
                        </div>

                        <div style={{ minWidth: '200px' }}>
                          <label className="form-label fw-bold">Parecer RH</label>

                          <ReactSelect
                            placeholder=""
                            options={yesNoOptions}
                            onChange={(opinion) => onChangeRhOpinion(opinion, applicant)}
                            defaultValue={yesNoOptions.find((option) => option.value === applicant?.rh_opinion)}
                            // isDisabled={!!applicant?.rh_opinion}
                            isDisabled={
                              userSession?.id != applicant.created_by && userSession?.id != applicant.redirect_to && true || !!applicant?.rh_opinion && true
                            }
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
                        </div>

                        <div style={{ minWidth: '200px' }}>
                          <label className="form-label fw-bold">Parecer gestor</label>

                          <ReactSelect
                            placeholder=""
                            options={yesNoOptions}
                            onChange={(opinion) => onChangeCoordinatorOpinion(opinion, applicant)}
                            defaultValue={yesNoOptions.find((option) => option.value === applicant?.coordinator_opinion)}
                            isDisabled={
                              userSession?.id != applicant.created_by && userSession?.id != applicant.redirect_to && true || !!applicant?.coordinator_opinion && true
                            }
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
                        </div>

                        {
                          applicant?.rh_opinion === "aprovado" &&
                          applicant?.coordinator_opinion === "aprovado" && (
                            <div style={{ minWidth: '180px' }}>
                              <label className="form-label fw-bold">
                                Efetivar
                              </label>

                              <button
                                className="btn btn-success w-100"
                                onClick={() => handleOpenHireApplicantModal(applicant)}
                                disabled={
                                  !(
                                    userSession?.id === applicant.created_by ||
                                    userSession?.id === applicant.redirect_to
                                  )
                                }
                              >
                                <Arrow90degRight />
                              </button>
                            </div>
                          ) || applicant?.rh_opinion === "reprovado" && (
                            <div style={{ minWidth: '180px' }}>
                              <label className="form-label fw-bold">
                                Anotação especial
                              </label>

                              <button
                                className="btn btn-dark w-100"
                                onClick={() => handleOpenSpecialNotationMoal(applicant)}
                                disabled={!(userSession?.id === applicant.created_by)}
                              >
                                <CupHot />
                              </button>
                            </div>
                          ) || applicant?.coordinator_opinion === "reprovado" && (
                            <div style={{ minWidth: '180px' }}>
                              <label className="form-label fw-bold">
                                Anotação especial
                              </label>

                              <button
                                className="btn btn-dark w-100"
                                onClick={() => handleOpenSpecialNotationMoal(applicant)}
                                disabled={!(userSession?.id === applicant.created_by)}
                              >
                                <CupHot />
                              </button>
                            </div>
                          )
                        }
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div> */}
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
    </>
  )
}

export default Applicants