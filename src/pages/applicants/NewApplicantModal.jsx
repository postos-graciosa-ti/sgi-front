import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'
import useUserSessionStore from '../../data/userSession'
import dayjs from 'dayjs'
import { Printer } from 'react-bootstrap-icons'
import ReactSelect from "react-select"

const NewApplicantModal = (props) => {
  const { newApplicantModalOpen, setNewApplicantModalOpen, setApplicantsList } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const [applicantName, setApplicantName] = useState()

  const [exam, setExam] = useState()

  const handleClose = () => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))

    setNewApplicantModalOpen(false)
  }

  const handlePrintExam = () => {
    const examMap = {
      1: '/avaliacao_matematica_frentista.pdf',
      2: '/avaliacao_teorica_frentista.pdf',
      3: '/avaliacao_de_matematica_operador_de_caixa.pdf',
      4: '/avaliacao_teorica_operador_de_caixa.pdf',
      5: '/avaliacao_de_matematica_frentista_caixa.pdf',
      6: '/avaliacao_teorica_frentista_caixa.pdf',
      7: '/avaliacao_de_matematica_trocador_de_oleo.pdf',
      8: '/avaliacao_teorica_trocador_de_oleo.pdf',
    }

    if (!exam || !examMap[exam.value]) {
      Swal.fire("Erro", "Selecione uma prova válida para imprimir", "error")

      return
    }

    printJS(examMap[exam.value])
  }

  const handleSubmit = () => {
    let requestBody = {
      name: applicantName,
      created_by: userSession.id,
      attendance_date: dayjs().format("YYYY-MM-DD"),
    }

    api
      .post("/applicants", requestBody)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={newApplicantModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Novo candidato</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">
            Nome
          </label>

          <input
            className="form-control"
            onChange={(e) => setApplicantName(e.target.value)}
          />
        </div>

        <div className="fw-bold mb-3">
          Emissão de provas
        </div>

        <div className="row">
          <div className="col-10">
            <ReactSelect
              placeholder={""}
              options={[
                { value: 1, label: "Avaliação de matemática frentista" },
                { value: 2, label: "Avaliação teórica frentista" },
                { value: 3, label: "Avaliação matemática operador de caixa" },
                { value: 4, label: "Avaliação teórica operador de caixa" },
                { value: 5, label: "Avaliação matemática frentista caixa" },
                { value: 6, label: "Avaliação teórica frentista caixa" },
                { value: 7, label: "Avaliação matemática trocador de óleo" },
                { value: 8, label: "Avaliação teórica trocador de óleo" },
              ]}
              onChange={(value) => setExam(value)}
            />
          </div>

          <div className="col-2">
            <button className="btn btn-light mb-3" onClick={handlePrintExam}>
              <Printer />
            </button>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Concluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewApplicantModal