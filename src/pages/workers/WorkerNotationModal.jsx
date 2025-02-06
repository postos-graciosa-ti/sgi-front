import { useEffect, useState } from 'react'
import { Plus, Dash } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const WorkerNotationModal = (props) => {
  const {
    workerNotationModalOpen,
    setWorkerNotationModalOpen,
    selectedWorker,
    setSelectedWorker,
  } = props

  const [workerNotations, setWorkerNotations] = useState()

  const [newNotation, setNewNotation] = useState()

  useEffect(() => {
    api
      .get(`/workers/${selectedWorker?.worker_id}/notations`)
      .then((response) => {
        setWorkerNotations(response.data)
      })
  }, [workerNotationModalOpen])

  const handleClose = () => {
    setWorkerNotations()

    setNewNotation()

    setSelectedWorker()

    setWorkerNotationModalOpen(false)
  }

  const handleDeleteWorkerNotation = (item) => {
    api
      .delete(`/workers-notations/${item.id}`)
      .then(() => {
        api
          .get(`/workers/${selectedWorker?.worker_id}/notations`)
          .then((response) => {
            setWorkerNotations(response.data)
          })
      })
  }

  const handleAddWorkerNotation = () => {
    api
      .post(`/workers/${selectedWorker?.worker_id}/notations`, { notation: newNotation })
      .then(() => {
        api
          .get(`/workers/${selectedWorker?.worker_id}/notations`)
          .then((response) => {
            setWorkerNotations(response.data)
          })
      })
  }

  return (
    <Modal
      show={workerNotationModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Observações para {selectedWorker?.worker_name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {
          workerNotations && workerNotations.map((item) => (
            <>
              <div className='row'>
                <div className='col-10 mb-3'>
                  <input className='form-control' disabled value={item.notation} />
                </div>

                <div className='col-2'>
                  <button className="btn btn-danger" onClick={() => handleDeleteWorkerNotation(item)}>
                    <Dash />
                  </button>
                </div>
              </div>
            </>
          ))
        }

        <div className="row">
          <div className="col-10">
            <input className="form-control" placeholder="Incluir observação" onChange={(e) => setNewNotation(e.target.value)} />
          </div>

          <div className="col-2">
            <button className="btn btn-warning" onClick={handleAddWorkerNotation}>
              <Plus />
            </button>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WorkerNotationModal
