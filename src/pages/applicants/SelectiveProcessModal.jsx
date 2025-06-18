import { useEffect, useState } from 'react'
import { CaretRightFill } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'
import CoordinatorInterviewModal from './CoordinatorInterviewModal'
import IdentityModal from './IdentityModal'
import ProcessProgressModal from './ProcessProgressModal'
import RhInterviewModal from './RhInterviewModal'
import SeeApplicantsExamsModal from './SeeApplicantsExamsModal'

const SelectiveProcessModal = (props) => {
  const { selectiveProcessModalOpen, setSelectiveProcessModalOpen, selectedApplicant, setApplicantsList, setSelectedApplicant, applicantToSearch } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const [processProgressModalOpen, setProcessProgressModalOpen] = useState(false)

  const [applicantsExamsModalOpen, setApplicantsExamsModalOpen] = useState(false)

  const [rhInterviewModalOpen, setRhInterviewModalOpen] = useState(false)

  const [coordinatorInterviewModalOpen, setCoordinatorInterviewModalOpen] = useState(false)

  const [openWhatsapp, setOpenWhatsapp] = useState(false)

  const [identityModalOpen, setIdentityModalOpen] = useState(false)

  // useEffect(() => {
  //   if (openWhatsapp) {
  //     let failMessage = `
  //       Prezado(a) ${selectedApplicant?.name}!

  //       Agradecemos seu interesse em participar do nosso processo seletivo. 
  //       No momento, optamos por não evoluir com a sua candidatura.
  //       Vamos manter o seu currículo em nosso banco de talentos para novas
  //       oportunidades e encorajamos que se inscreva em processos futuros.

  //       Desejamos sucesso em sua jornada profissional!

  //       Abraços,

  //       Time de RH
  //       Postos Graciosa
  //     `

  //     let successMessage = `
  //       Prezado(A) ${selectedApplicant?.name}!,

  //       Agradecemos a confiança e gentileza de nos ouvir.
  //       Conforme conversamos, estamos muito felizes em lhe
  //       informar que você foi aprovado para a próxima etapa do
  //       nosso processo seletivo! Agora, vamos para a próxima
  //       fase, em breve entraremos em contato passando mais
  //       informações.

  //       Segue lista de documentações: https://drive.google.com/file/d/1FefOkU4VNQlgBXiSREGngQD8Fr7AmY8n/view?usp=sharing

  //       Abraços,

  //       Time de RH
  //       Postos Graciosa
  //     `

  //     let isRejected = (
  //       selectedApplicant?.rh_opinion == "reprovado" ||
  //       selectedApplicant?.coordinator_opinion == "reprovado"
  //     )

  //     const phone = selectedApplicant?.mobile

  //     const message = isRejected ? failMessage : successMessage

  //     const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  //     window.open(url, '_blank')

  //     let requestBody = {
  //       whatsapp_feedback: "sim"
  //     }

  //     api.patch(`/applicants/${selectedApplicant?.id}`, requestBody)

  //     setOpenWhatsapp(false)
  //   }
  // }, [openWhatsapp])

  const handleClose = () => {
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
    } else {
      api
        .get("/applicants")
        .then((response) => setApplicantsList(response.data))
    }

    setSelectiveProcessModalOpen(false)
  }

  const handleOpenProcessProgressModal = () => {
    setProcessProgressModalOpen(true)
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
            <div className="mb-2 fw-bold">Andamento do processo</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenProcessProgressModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

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
            <div className="mb-2 fw-bold">Identificação</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenIdentityModal}>
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

      <ProcessProgressModal
        processProgressModalOpen={processProgressModalOpen}
        setProcessProgressModalOpen={setProcessProgressModalOpen}
        selectedApplicant={selectedApplicant}
      />
    </Modal>
  )
}

export default SelectiveProcessModal