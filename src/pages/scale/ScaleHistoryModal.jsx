import moment from 'moment'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const ScaleHistoryModal = (props) => {
  const { scaleHistoryModalOpen, setScaleHistoryModalOpen } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  let today = new Date()

  let monthLastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

  const [validationResults, setValidationResults] = useState([])

  useEffect(() => {
    if (scaleHistoryModalOpen) {
      api
        .post(`/validate_monthly_scale/${selectedSubsdiarie.value}`, {
          "first_day": moment(today).format("DD-MM-YYYY"),
          "last_day": moment(monthLastDay).format("DD-MM-YYYY")
        })
        .then((response) => {
          setValidationResults(response.data.validation_results)
        })
    }
  }, [scaleHistoryModalOpen])

  return (
    <Modal
      show={scaleHistoryModalOpen}
      onHide={() => setScaleHistoryModalOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Relatório de dias</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {
          validationResults && validationResults.map((result) => (
            <div className="card mb-3">
              <div className="card-body">
                <div>
                  <b>{result.date}:</b> {result.status == "Insufficient workers" && "Funcionários insuficiente"}
                </div>

                <div><b>Frentistas:</b> {result.frentistas}</div>

                <div><b>Trocadores de óleo:</b> {result.trocadores}</div>
              </div>
            </div>
          ))
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={() => setScaleHistoryModalOpen(false)}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ScaleHistoryModal 
