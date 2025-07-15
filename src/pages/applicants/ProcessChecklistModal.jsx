import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const ProcessChecklistModal = ({ processChecklistModalOpen, setProcessChecklistModalOpen, applicantId }) => {
  const [selectedItems, setSelectedItems] = useState([])

  const handleClose = () => setProcessChecklistModalOpen(false)

  const handleChange = (e) => {
    const value = e.target.value
    const isChecked = e.target.checked

    setSelectedItems((prev) =>
      isChecked ? [...prev, value] : prev.filter((item) => item !== value)
    )
  }

  const handleSubmit = () => {
    const payload = {
      applicant_id: applicantId,
      exam: selectedItems.includes("avaliacoes"),
      hr_interview: selectedItems.includes("entrevista_rh"),
      coordinator_interview: selectedItems.includes("entrevista_gestor"),
      accounting_form: selectedItems.includes("ficha_contabilidade"),
      add_time_system: selectedItems.includes("sistema_ponto"),
      add_web_system: selectedItems.includes("sistema_web_postos"),
      add_sgi_system: selectedItems.includes("sgi"),
    }

    api.put(`/applicant-process/${applicantId}`, payload)
      .then(res => {
        handleClose()
      })
      .catch(err => {
        console.error("Erro ao salvar processo", err)
      })
  }

  useEffect(() => {
    if (!processChecklistModalOpen || !applicantId) return

    api.get(`/applicant-process/${applicantId}`)
      .then(res => {
        const data = res.data
        const selected = []

        if (data.exam) selected.push("avaliacoes")
        if (data.hr_interview) selected.push("entrevista_rh")
        if (data.coordinator_interview) selected.push("entrevista_gestor")
        if (data.accounting_form) selected.push("ficha_contabilidade")
        if (data.add_time_system) selected.push("sistema_ponto")
        if (data.add_web_system) selected.push("sistema_web_postos")
        if (data.add_sgi_system) selected.push("sgi")

        setSelectedItems(selected)
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setSelectedItems([]) // não iniciado ainda
        } else {
          console.error("Erro ao carregar processo", err)
        }
      })
  }, [processChecklistModalOpen, applicantId])

  return (
    <Modal show={processChecklistModalOpen} onHide={handleClose} backdrop="static" keyboard={false} fullscreen={true}>
      <Modal.Header closeButton>
        <Modal.Title>Andamento do processo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="avaliacoes" id="check1" checked={selectedItems.includes("avaliacoes")} onChange={handleChange} />
          <label className="form-check-label" htmlFor="check1">Avaliações</label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="entrevista_rh" id="check2" checked={selectedItems.includes("entrevista_rh")} onChange={handleChange} />
          <label className="form-check-label" htmlFor="check2">Entrevista RH</label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="entrevista_gestor" id="check3" checked={selectedItems.includes("entrevista_gestor")} onChange={handleChange} />
          <label className="form-check-label" htmlFor="check3">Entrevista gestor</label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="ficha_contabilidade" id="check4" checked={selectedItems.includes("ficha_contabilidade")} onChange={handleChange} />
          <label className="form-check-label" htmlFor="check4">Preenchimento ficha da contabilidade</label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="sistema_ponto" id="check5" checked={selectedItems.includes("sistema_ponto")} onChange={handleChange} />
          <label className="form-check-label" htmlFor="check5">Adição ao sistema ponto</label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="sistema_web_postos" id="check6" checked={selectedItems.includes("sistema_web_postos")} onChange={handleChange} />
          <label className="form-check-label" htmlFor="check6">Adição ao sistema web postos</label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="sgi" id="check7" checked={selectedItems.includes("sgi")} onChange={handleChange} />
          <label className="form-check-label" htmlFor="check7">Adição ao SGI</label>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>
        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProcessChecklistModal
