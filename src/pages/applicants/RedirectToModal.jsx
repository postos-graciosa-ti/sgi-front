import dayjs from "dayjs"
import printJS from "print-js"
import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'

const RedirectToDoc = ({ selectedUser, selectedApplicant, datetime, subsidiarieData }) => {
  return (
    <div className="print-container">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" style={{ width: '80px' }} alt="Logo" />
      </div>
      <div>
        <p>Assunto: Encaminhamento de Candidato para Entrevista</p>
        <p>Prezado {selectedUser?.label},</p>
        <p>
          Gostaríamos de informar que identificamos um candidato potencial para trabalhar no horário das 14:00 – 22:00 que você solicitou.
        </p>
        <p>Seguem os detalhes do candidato e da entrevista agendada:</p>
        <p><strong>Nome:</strong> {selectedApplicant?.label}</p>
        <p><strong>Currículo:</strong> Em Anexo</p>
        <p><strong>Data e horário:</strong> {dayjs(datetime).format("DD/MM/YYYY [às] HH:mm")}</p>
        <p><strong>Endereço:</strong> {subsidiarieData?.adress}</p>
        <p>
          Por favor, revise o currículo anexado e confirme a sua disponibilidade para conduzir a
          entrevista no horário agendado. Caso precise alterar a data ou horário, entre em
          contato conosco o mais breve possível.
        </p>
        <p>Estamos à disposição para qualquer dúvida ou necessidade de ajuste.</p>
        <p>Atenciosamente,</p>
        <p>Recursos Humanos</p>
      </div>
    </div>
  )
}

const RedirectToModal = ({ redirectToModalOpen, setRedirectToModalOpen }) => {
  const [applicantsOptions, setApplicantsOptions] = useState()
  const [usersOptions, setUsersOptions] = useState()
  const [subsidiariesOptions, setSubsidiariesOptions] = useState()
  const [selectedApplicant, setSelectedApplicant] = useState()
  const [selectedUser, setSelectedUser] = useState()
  const [selectedSubsidiarie, setSelectedSubsidiarie] = useState()
  const [datetime, setDatetime] = useState()
  const [subsidiarieData, setSubsidiarieData] = useState()
  const [readyToPrint, setReadyToPrint] = useState(false)

  const printRef = useRef()

  useEffect(() => {
    if (!redirectToModalOpen) return

    api.get("/applicants").then(res => {
      setApplicantsOptions(res.data.map(opt => ({ value: opt.id, label: opt.name })))
    })

    api.get("/users").then(res => {
      setUsersOptions(res.data.map(opt => ({ value: opt.user_id, label: opt.user_name })))
    })

    api.get("/subsidiaries").then(res => {
      setSubsidiariesOptions(res.data.map(opt => ({
        value: opt.id,
        label: opt.name,
        adress: opt.adress
      })))
    })
  }, [redirectToModalOpen])

  useEffect(() => {
    if (readyToPrint) {
      // Aguarda DOM re-renderizar
      setTimeout(() => {
        printJS({
          printable: 'printable',
          type: 'html',
          scanStyles: true
        })
        setReadyToPrint(false)
      }, 200)
    }
  }, [readyToPrint])

  const handleClose = () => setRedirectToModalOpen(false)

  const handleSubmit = async () => {
    const data = await api.get(`/subsidiaries/${selectedSubsidiarie?.value}`).then(res => res.data)
    setSubsidiarieData(data)
    setReadyToPrint(true)
  }

  return (
    <>
      <Modal show={redirectToModalOpen} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Emitir redirecionamento</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-3">
            <label className="form-label fw-bold">Candidato:</label>
            <ReactSelect options={applicantsOptions} onChange={setSelectedApplicant} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Usuário:</label>
            <ReactSelect options={usersOptions} onChange={setSelectedUser} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Filial:</label>
            <ReactSelect options={subsidiariesOptions} onChange={setSelectedSubsidiarie} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Data e horário:</label>
            <input type="datetime-local" className="form-control" onChange={e => setDatetime(e.target.value)} />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Fechar</Button>
          <Button variant="success" onClick={handleSubmit}>Emitir</Button>
        </Modal.Footer>
      </Modal>

      <div id="printable" ref={printRef} style={{ display: 'none' }}>
        {subsidiarieData && (
          <RedirectToDoc
            selectedUser={selectedUser}
            selectedApplicant={selectedApplicant}
            datetime={datetime}
            subsidiarieData={subsidiarieData}
          />
        )}
      </div>

      <style>
        {`
          @media print {
            body * {
              visibility: hidden !important;
            }

            #printable, #printable * {
              visibility: visible !important;
            }

            #printable {
              display: block !important;
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 1cm;
              background: white;
            }

            @page {
              size: auto;
              margin: 1cm;
            }
          }
        `}
      </style>
    </>
  )
}

export default RedirectToModal
