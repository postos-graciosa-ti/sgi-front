import axios from 'axios'
import { useEffect, useState } from 'react'
import { Plus, Trash } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'
import Select from '../../components/form/Select'

const WorkerDocsModal = (props) => {
  const { workerDocsModalOpen, setWorkerDocsModalOpen, selectedWorker, setSelectedWorker } = props

  const [docsList, setDocsList] = useState()

  const [docTitle, setDocTitle] = useState()

  const [doc, setDoc] = useState()

  useEffect(() => {
    api
      .get(`/worker-pdfs/${selectedWorker?.worker_id}`)
      .then((response) => {
        setDocsList(response.data)
      })
  }, [workerDocsModalOpen])

  const handleClose = () => {
    setDoc()

    setSelectedWorker()

    setWorkerDocsModalOpen(false)
  }

  const handleSubmit = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/upload-pdf/${selectedWorker?.worker_id}`,
        {
          "file": doc,
          "doc_title": docTitle.label
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then(() => {
        api
          .get(`/worker-pdfs/${selectedWorker?.worker_id}`)
          .then((response) => {
            setDocsList(response.data)
          })
      })
  }

  const handleDelete = (docId) => {
    api
      .delete(`/workers-docs/${docId}`)
      .then(() => {
        api
          .get(`/worker-pdfs/${selectedWorker?.worker_id}`)
          .then((response) => {
            setDocsList(response.data)
          })
      })
  }

  return (
    <Modal
      show={workerDocsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Documentos de {selectedWorker?.worker_name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <Select
            label={"Título do documento"}
            placeholder={""}
            options={[
              { value: 1, label: "CTPS" },
              { value: 2, label: "Exame médico admissional" },
              { value: 3, label: "Identidade" },
              { value: 4, label: "CPF" },
              { value: 5, label: "Titulo eleitoral" },
              { value: 7, label: "Comprovante de residência" },
              { value: 8, label: "CNH" },
              { value: 9, label: "Certidão de casamento" },
              { value: 10, label: "Certificado de reservista" },
              { value: 11, label: "Certidão de nascimento (filhos menores de 14)" },
              { value: 12, label: "Carteira de vacinação (filhos menores de 5)" },
              { value: 13, label: "Comprovante de frequência escolar (filhos entre 7 e 14)" },
            ]}
            setSelectedValue={setDocTitle}
          />
        </div>

        <div className="row">
          <div className="col-10">
            <input type="file" className="form-control" onChange={(e) => setDoc(e.target.files[0])} />
          </div>

          <div className="col-2">
            <button className="btn btn-warning" onClick={handleSubmit}>
              <Plus />
            </button>
          </div>
        </div>

        {
          docsList?.map((pdf) => (
            <div key={pdf.doc_id} className="mt-5 mb-5">
              <div className="row mb-2">
                <div className="col-10">
                  <h4> {`${pdf.doc_title}` || `Documento #${pdf.doc_id}`}</h4>
                </div>

                <div className="col-2">
                  <button className="btn btn-danger" onClick={() => handleDelete(pdf.doc_id)}>
                    <Trash />
                  </button>
                </div>
              </div>

              <iframe
                src={`${import.meta.env.VITE_API_URL}/get-pdf/${pdf.doc_id}`}
                width="100%"
                height="500px"
                style={{ border: 'none' }}
                title={`PDF-${pdf.doc_id}`}
              />
            </div>
          ))
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WorkerDocsModal