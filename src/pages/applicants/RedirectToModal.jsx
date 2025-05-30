import printJS from "print-js"
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactDOMServer from 'react-dom/server'
import ReactSelect from "react-select"
import api from '../../services/api'
import dayjs from "dayjs"

const RedirectToDoc = ({ selectedUser, selectedApplicant, selectedSubsidiarie, datetime }) => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>
      </div>

      <div>
        <p>
          Assunto: Encaminhamento de Candidato para Entrevista
        </p>

        <p>
          Prezado {selectedUser?.label},
        </p>

        <p>
          Gostaríamos de informar que identificamos um candidato potencial para trabalhar no horário das 14:00 – 22:00 que você solicitou.
        </p>

        <p>Seguem os detalhes do candidato e da entrevista agendada:</p>

        <p>
          Detalhes do Candidato:
        </p>

        <p>
          Nome: {selectedApplicant?.label}
        </p>

        <p>
          E-mail: marciaabigail321@gmail.com
        </p>

        <p>
          Currículo: Em Anexo
        </p>

        <p>
          Detalhes da Entrevista:
        </p>

        <p>
          Data e horário: {dayjs(datetime).format("DD/MM/YYYY [às] hh:mm")}
        </p>

        <p>
          {selectedSubsidiarie?.adress}
        </p>

        <p>
          Por favor, revise o currículo anexado e confirme a sua disponibilidade para conduzir a
          entrevista no horário agendado. Caso precise alterar a data ou horário, entre em
          contato conosco o mais breve possível.
        </p>

        <p>
          Estamos à disposição para qualquer dúvida ou necessidade de ajuste.
        </p>

        <p>Atenciosamente,</p>

        <p>Recursos Humanos</p>
      </div>
    </div>
  )
}

const RedirectToModal = (props) => {
  const { redirectToModalOpen, setRedirectToModalOpen } = props

  const [applicantsOptions, setApplicantsOptions] = useState()

  const [usersOptions, setUsersOptions] = useState()

  const [subsidiariesOptions, setSubsidiariesOptions] = useState()

  const [selectedApplicant, setSelectedApplicant] = useState()

  const [selectedUser, setSelectedUser] = useState()

  const [selectedSubsidiarie, setSelectedSubsidiarie] = useState()

  const [datetime, setDatetime] = useState()

  useEffect(() => {
    api
      .get("/applicants")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setApplicantsOptions(options)
      })

    api
      .get("/users")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.user_id, label: option.user_name }))

        setUsersOptions(options)
      })

    api
      .get("/subsidiaries")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name, address: option.adress }))

        setSubsidiariesOptions(options)
      })
  }, [redirectToModalOpen])

  const handleClose = () => {
    setRedirectToModalOpen(false)
  }

  const handleSubmit = () => {
    const printableContent = ReactDOMServer.renderToString(
      <RedirectToDoc
        selectedUser={selectedUser}
        selectedApplicant={selectedApplicant}
        selectedSubsidiarie={selectedSubsidiarie}
        datetime={datetime}
      />
    )

    printJS({
      printable: printableContent,
      type: 'raw-html',
      header: null,
    })

    handleClose()
  }

  return (
    <Modal
      show={redirectToModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Emitir redirecionamento</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">
            Candidato:
          </label>

          <ReactSelect
            placeholder={""}
            options={applicantsOptions}
            onChange={(value) => setSelectedApplicant(value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Encaminhar para:
          </label>

          <ReactSelect
            placeholder={""}
            options={usersOptions}
            onChange={(value) => setSelectedUser(value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Filial:
          </label>

          <ReactSelect
            placeholder={""}
            options={subsidiariesOptions}
            onChange={(value) => setSelectedSubsidiarie(value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Data e hora:
          </label>

          <input
            type="datetime-local"
            className="form-control"
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Emitir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RedirectToModal