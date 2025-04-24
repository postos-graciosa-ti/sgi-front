import axios from 'axios'
import { useEffect, useState } from 'react'
import { Plus, Trash } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const WorkerDocsModal = (props) => {
  const { workerDocsModalOpen, setWorkerDocsModalOpen, selectedWorker, setSelectedWorker } = props

  const [docsList, setDocsList] = useState()

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
          "file": doc
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
                  <h3>Documento #{pdf.doc_id}</h3>
                </div>

                <div className="col-2">
                  <button className="btn btn-danger" onClick={() => handleDelete(pdf.doc_id)}>
                    <Trash />
                  </button>
                </div>
              </div>

              <iframe
                src={`http://localhost:8000/get-pdf/${pdf.doc_id}`}
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