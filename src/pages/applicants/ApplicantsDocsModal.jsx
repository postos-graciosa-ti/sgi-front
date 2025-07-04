import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from "../../services/api";
import axios from 'axios';

const ApplicantsDocsModal = (props) => {
  const { selectedApplicant, applicantsDocsModalOpen, setApplicantsDocsModalOpen } = props

  const [resume, setResume] = useState()

  const [workcard, setWorkcard] = useState()

  const handleClose = () => {
    setResume()

    setWorkcard()

    setApplicantsDocsModalOpen(false)
  }

  const handleSubmit = () => {
    const formData = new FormData()
    
    formData.append("resume", resume)
    
    formData.append("workcard", workcard)

    axios
      .post(`${import.meta.env.VITE_API_URL}/applicants-docs/${selectedApplicant.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        handleClose();
      })
      .catch((err) => {
        console.error("Erro ao enviar documentos", err.response?.data || err);
      });
  };

  return (
    <Modal
      show={applicantsDocsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Histórico profissional</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">
            Currículo
          </label>

          <input type="file" className="form-control" onChange={(e) => setResume(e.target.files[0])} />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Carteira de trabalho
          </label>

          <input type="file" className="form-control" onChange={(e) => setWorkcard(e.target.files[0])} />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ApplicantsDocsModal