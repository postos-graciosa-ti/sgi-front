import printJS from 'print-js'
import { useState } from 'react'
import { Printer } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import Swal from 'sweetalert2'

const ExamsEmissionModal = (props) => {
  const { examsEmissionModalOpen, setExamsEmissionModalOpen } = props

  const [exam, setExam] = useState()

  const handleClose = () => {
    setExam()

    setExamsEmissionModalOpen(false)
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

  return (
    <Modal
      show={examsEmissionModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Emitir provas</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <button className="btn btn-light mb-3" onClick={handlePrintExam}>
          <Printer />
        </button>

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
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ExamsEmissionModal