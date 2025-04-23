import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useUserSessionStore from '../../data/userSession';
import api from '../../services/api';

const ScaleLogsModal = (props) => {
  const { scaleLogsModalOpen, setScaleLogsModalOpen } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [scalesLogs, setScalesLogs] = useState([])

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie.value}/scales/logs`)
      .then((response) => setScalesLogs(response.data))
  }, [scaleLogsModalOpen])

  const handleClose = () => {
    setScalesLogs()

    setScaleLogsModalOpen(false)
  }

  return (
    <Modal
      show={scaleLogsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Histórico de alterações de escala</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Atualizações</th>
              </tr>
            </thead>

            <tbody>
              {
                scalesLogs?.length > 0 && (
                  scalesLogs?.map((scaleLog) => (
                    <tr key={scaleLog.id}>
                      <td>
                        {scaleLog.log_str}
                      </td>
                    </tr>
                  ))
                ) || <div>Não há registros de log disponíveis</div>
              }
            </tbody>
          </table>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ScaleLogsModal
