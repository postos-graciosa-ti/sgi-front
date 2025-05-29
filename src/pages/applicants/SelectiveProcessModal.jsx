import { useEffect, useState } from 'react'
import { CaretRightFill, Trash } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'
import CoordinatorInterviewModal from './CoordinatorInterviewModal'
import RhInterviewModal from './RhInterviewModal'
import SeeApplicantsExamsModal from './SeeApplicantsExamsModal'

const SelectiveProcessModal = (props) => {
  const { selectiveProcessModalOpen, setSelectiveProcessModalOpen, selectedApplicant, setApplicantsList, setSelectedApplicant } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const [applicantsExamsModalOpen, setApplicantsExamsModalOpen] = useState(false)

  const [rhInterviewModalOpen, setRhInterviewModalOpen] = useState(false)

  const [coordinatorInterviewModalOpen, setCoordinatorInterviewModalOpen] = useState(false)

  const handleClose = () => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))

    setSelectiveProcessModalOpen(false)
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

  const handleSendEmailFeedback = () => {
    let failMessage = `
      Prezado(a) ${selectedApplicant.name}!

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
      Prezado(A) ${selectedApplicant.name}!,

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
      selectedApplicant.rh_opinion == "reprovado" ||
      selectedApplicant.coordinator_opinion == "reprovado"
    )

    const requestBody = {
      id: selectedApplicant.id,
      name: selectedApplicant.name,
      email: selectedApplicant.email,
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
      .post("/send-feedback-email", requestBody)
      .then((response) => {
        if (response.status == 200) {
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

  const handleInactivateApplicant = () => {
    let requestBody = {
      is_active: false
    }

    api
      .patch(`/applicants/${selectedApplicant?.id}`, requestBody)
      .then(() => handleClose())
  }

  let failMessage = `
      Prezado(a) ${selectedApplicant?.name}!

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
      Prezado(A) ${selectedApplicant?.name}!,

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
    selectedApplicant?.rh_opinion == "reprovado" ||
    selectedApplicant?.coordinator_opinion == "reprovado"
  )

  const phone = selectedApplicant?.mobile

  const message = isRejected ? failMessage : successMessage

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <Modal
      show={selectiveProcessModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Processo seletivo de {selectedApplicant?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">Avaliações</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenSeeApplicantsExamsModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">Recursos humanos</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenRhInterviewModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">Coordenador/gerente</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenCoordinatorInterviewModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

        <div className="card mb-3 p-3">
          <div className="card-body">
            <div className="mb-4 fw-bold text-center">Retorno para candidato</div>

            <div className="row">
              <div className="col">
                <button
                  className="btn btn-light w-100 shadow fw-bold"
                  onClick={handleSendEmailFeedback}
                  disabled={userSession.id !== selectedApplicant?.created_by}
                >
                  E-mail
                </button>
              </div>

              <div className="col">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light w-100 shadow fw-bold"
                  disabled={userSession.id !== selectedApplicant?.created_by}
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-4">
              <button
                className="btn btn-danger w-100"
                onClick={handleInactivateApplicant}
                disabled={userSession.id !== selectedApplicant?.created_by}
              >
                <Trash />
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success">Concluir</Button>
      </Modal.Footer>

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
      />

      <CoordinatorInterviewModal
        coordinatorInterviewModalOpen={coordinatorInterviewModalOpen}
        setCoordinatorInterviewModalOpen={setCoordinatorInterviewModalOpen}
        selectedApplicant={selectedApplicant}
        setSelectiveProcessModalOpen={setSelectiveProcessModalOpen}
        setApplicantsList={setApplicantsList}
      />
    </Modal>
  )
}

export default SelectiveProcessModal