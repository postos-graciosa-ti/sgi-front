import printJS from "print-js"
import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'
import dayjs from "dayjs"

const RedirectToDoc = ({ selectedUser, selectedApplicant, selectedSubsidiarie, datetime, subsidiarieData }) => {
  return (
    <div className="print-container">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>
      </div>

      <div>
        <p>Assunto: Encaminhamento de Candidato para Entrevista</p>
        <p>Prezado {selectedUser?.label},</p>
        <p>
          Gostaríamos de informar que identificamos um candidato potencial para trabalhar no horário das 14:00 – 22:00 que você solicitou.
        </p>
        <p>Seguem os detalhes do candidato e da entrevista agendada:</p>
        <p>Detalhes do Candidato:</p>
        <p>Nome: {selectedApplicant?.label}</p>
        <p>Currículo: Em Anexo</p>
        <p>Detalhes da Entrevista:</p>
        <p>Data e horário: {dayjs(datetime).format("DD/MM/YYYY [às] HH:mm")}</p>
        <p>Endereço: {subsidiarieData?.adress}</p>
        <p>
          Por favor, revise o currículo anexado e confirme a sua disponibilidade para conduzir a
          entrevista no horário agendado. Caso precise alterar a data ou horário, entre em
          contato conosco o mais breve possível.
        </p>
        <p>Estamos à disposição para qualquer dúvida ou necessidade de ajuste.</p>
        <p>Atenciosamente,</p>
        <p>Recursos Humanos</p>
      </div>

      <style>
        {`
          @media print {
            body {
              font-size: 12pt;
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }

            .print-container {
              padding: 1cm;
              box-sizing: border-box;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            th, td {
              padding: 6px;
              text-align: left;
            }

            .avoid-break {
              page-break-inside: avoid;
            }
          }

          @page {
            size: auto;
            margin: 1cm;
          }
        `}
      </style>
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

  const subsidiarieDataRef = useRef(null)

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
        address: opt.adress
      })))
    })
  }, [redirectToModalOpen])

  const handleClose = () => setRedirectToModalOpen(false)

  const handleSubmit = async () => {
    const subsidiarieData = await api.get(`/subsidiaries/${selectedSubsidiarie?.value}`).then(res => res.data)
    subsidiarieDataRef.current = subsidiarieData

    setTimeout(() => {
      printJS({
        printable: 'printable',
        type: 'html',
        scanStyles: true
      })
    }, 0)
  }

  return (
    <>
      {/* Modal */}
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

      {/* Conteúdo invisível para impressão */}
      <div
        id="printable"
        style={{
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          visibility: 'hidden'
        }}
      >
        <RedirectToDoc
          selectedUser={selectedUser}
          selectedApplicant={selectedApplicant}
          selectedSubsidiarie={selectedSubsidiarie}
          datetime={datetime}
          subsidiarieData={subsidiarieDataRef.current}
        />
      </div>
    </>
  )
}

export default RedirectToModal
