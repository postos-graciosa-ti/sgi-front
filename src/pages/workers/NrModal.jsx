import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactSelect from "react-select";
import useUserSessionStore from '../../data/userSession';
import api from '../../services/api';

const NrModal = (props) => {
  const { nrModalOpen, setNrModalOpen } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [workersOptions, setWorkersOptions] = useState()

  const [date, setDate] = useState()

  const [selectedWorker, setSelectedWorker] = useState()

  useEffect(() => {
    if (nrModalOpen) {
      api
        .get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`)
        .then((response) => {
          let options = response.data.map((option) => ({ value: option.worker_id, label: option.worker_name }))

          setWorkersOptions(options)
        })
    }
  }, [nrModalOpen])

  const handleSendEmail = () => {

    let message = `
Caros coordenadores,

Segue lista de colaboradores para treinamento de NR-20 no dia ${dayjs(date).format("DD/MM/YYYY")}:

  ${selectedWorker.map((w) => `- ${w.label}`).join("\n  ")}

Atenciosamente,
Equipe de RH
`

    api
      .post("/send-nr-20-email-to-coordinators", { message: message })
      .then((response) => {
        console.log(response)
      })
  }

  const handleClose = () => {
    setNrModalOpen(false)
  }

  return (
    <Modal
      show={nrModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Notificar treinamento de NR-20</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="mb-3">
          <ReactSelect
            options={workersOptions}
            isMulti
            onChange={(value) => setSelectedWorker(value)}
          />
        </div>

        <div className="row mt-3">
          <div className="col">
            <button className="btn btn-light shadow w-100" onClick={handleSendEmail}>E-mail</button>
          </div>

          <div className="col">
            <button className="btn btn-light shadow w-100">WhatsApp</button>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NrModal