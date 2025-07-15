import dayjs from 'dayjs'
import { useState } from 'react'
import { CaretRightFill } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
import api from '../../services/api'
import ApplicantsDocsModal from './ApplicantsDocsModal'
import ApplicantsResultsModal from './ApplicantsResultsModal'
import CoordinatorInterviewModal from './CoordinatorInterviewModal'
import EffectiveApplicantModal from './EffectiveApplicantModal'
import IdentityModal from './IdentityModal'
import ProcessChecklistModal from './ProcessChecklistModal'
import RhInterviewModal from './RhInterviewModal'
import SeeApplicantsExamsModal from './SeeApplicantsExamsModal'

const SelectiveProcessModal = (props) => {
  const {
    selectiveProcessModalOpen,
    setSelectiveProcessModalOpen,
    selectedApplicant,
    setApplicantsList,
    setSelectedApplicant,
    applicantToSearch,
  } = props

  const [processChecklistModalOpen, setProcessChecklistModalOpen] = useState(false)

  const [processProgressModalOpen, setProcessProgressModalOpen] = useState(false)

  const [applicantsExamsModalOpen, setApplicantsExamsModalOpen] = useState(false)

  const [rhInterviewModalOpen, setRhInterviewModalOpen] = useState(false)

  const [coordinatorInterviewModalOpen, setCoordinatorInterviewModalOpen] = useState(false)

  const [identityModalOpen, setIdentityModalOpen] = useState(false)

  const [applicantsDocsModalOpen, setApplicantsDocsModalOpen] = useState(false)

  const [applicantsResultsModalOpen, setApplicantsResultsModalOpen] = useState(false)

  const [effectiveApplicantModalOpen, setEffectiveApplicantModalOpen] = useState(false)

  const handleClose = () => {
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
    } else {
      api
        .get("/applicants")
        .then((response) => {
          setApplicantsList(response.data)
        })
    }

    setSelectiveProcessModalOpen(false)
  }

  const handleOpenProcessChecklistModal = () => {
    setProcessChecklistModalOpen(true)
  }

  const handleOpenSeeApplicantsExamsModal = () => {
    setApplicantsExamsModalOpen(true)
  }

  const handleOpenRhInterviewModal = () => {
    setRhInterviewModalOpen(true)
  }

  const handleOpenCoordinatorInterviewModal = () => {
    setCoordinatorInterviewModalOpen(true)
  }

  const handleOpenIdentityModal = () => {
    setIdentityModalOpen(true)
  }

  const handleOpenApplicantsDocsModal = () => {
    setApplicantsDocsModalOpen(true)
  }

  const handleOpenApplicantsResultsModal = () => {
    setApplicantsResultsModalOpen(true)
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

  const handleOpenEffectiveApplicantModal = () => {
    setEffectiveApplicantModalOpen(true)
  }

  return (
    <Modal
      show={selectiveProcessModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>PROCESSO SELETIVO DE {selectedApplicant?.name.toUpperCase()} // {selectedApplicant?.attendance_date ? dayjs(selectedApplicant?.attendance_date).format("DD/MM/YYYY") : ""}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">ANDAMENTO DO PROCESSO</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenProcessChecklistModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">AVALIAÇÕES</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenSeeApplicantsExamsModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">IDENTIFICAÇÃO</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenIdentityModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">HISTÓRICO PROFISSIONAL</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenApplicantsDocsModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">RECURSOS HUMANOS</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenRhInterviewModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">COORDENADOR/GERENTE</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenCoordinatorInterviewModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">RESULTADOS</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenApplicantsResultsModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

        <div className="row mt-4 mb-3">
          <div className="col-6">
            <button
              className="btn btn-light w-100 fw-bold"
              onClick={() => handleSendEmailFeedback(selectedApplicant)}
            >
              E-MAIL
            </button>
          </div>

          <div className="col-6">
            <button
              className="btn btn-light w-100 fw-bold"
              onClick={() => handleWhatsappFeedback(selectedApplicant)}
            >
              WHATSAPP
            </button>
          </div>
        </div>

        {
          selectedApplicant?.rh_opinion == "aprovado" && selectedApplicant?.coordinator_opinion == "aprovado" && (
            <button className="btn btn-light w-100 fw-bold" onClick={handleOpenEffectiveApplicantModal}>
              EFETIVAR
            </button>
          )
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>ENTENDIDO</Button>
      </Modal.Footer>

      <ProcessChecklistModal
        processChecklistModalOpen={processChecklistModalOpen}
        setProcessChecklistModalOpen={setProcessChecklistModalOpen}
      />

      <SeeApplicantsExamsModal
        applicantsExamsModalOpen={applicantsExamsModalOpen}
        setApplicantsExamsModalOpen={setApplicantsExamsModalOpen}
        selectedApplicant={selectedApplicant}
        setSelectedApplicant={setSelectedApplicant}
        setSelectiveProcessModalOpen={setSelectiveProcessModalOpen}
      />

      <RhInterviewModal
        rhInterviewModalOpen={rhInterviewModalOpen}
        setRhInterviewModalOpen={setRhInterviewModalOpen}
        selectedApplicant={selectedApplicant}
        setSelectiveProcessModalOpen={setSelectiveProcessModalOpen}
        setApplicantsList={setApplicantsList}
        applicantToSearch={applicantToSearch}
      />

      <CoordinatorInterviewModal
        coordinatorInterviewModalOpen={coordinatorInterviewModalOpen}
        setCoordinatorInterviewModalOpen={setCoordinatorInterviewModalOpen}
        selectedApplicant={selectedApplicant}
        setSelectiveProcessModalOpen={setSelectiveProcessModalOpen}
        setApplicantsList={setApplicantsList}
        applicantToSearch={applicantToSearch}
      />

      <IdentityModal
        identityModalOpen={identityModalOpen}
        setIdentityModalOpen={setIdentityModalOpen}
        selectedApplicant={selectedApplicant}
      />

      <ApplicantsDocsModal
        selectedApplicant={selectedApplicant}
        applicantsDocsModalOpen={applicantsDocsModalOpen}
        setApplicantsDocsModalOpen={setApplicantsDocsModalOpen}
      />

      <ApplicantsResultsModal
        setApplicantsList={setApplicantsList}
        selectedApplicant={selectedApplicant}
        applicantsResultsModalOpen={applicantsResultsModalOpen}
        setApplicantsResultsModalOpen={setApplicantsResultsModalOpen}
        applicantToSearch={applicantToSearch}
        setSelectiveProcessModalOpen={setSelectiveProcessModalOpen}
      />

      <EffectiveApplicantModal
        selectedApplicant={selectedApplicant}
        effectiveApplicantModalOpen={effectiveApplicantModalOpen}
        setEffectiveApplicantModalOpen={setEffectiveApplicantModalOpen}
      />
    </Modal>
  )
}

export default SelectiveProcessModal