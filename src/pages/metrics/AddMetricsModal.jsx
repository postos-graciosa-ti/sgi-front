import { useEffect, useState } from 'react'
import { Plus } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const AddMetricsModal = (props) => {
  const { addMetricsModalOpen, setAddMetricsModalOpen } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [workersOptions, setWorkersOptions] = useState()

  const [monthYear, setMonthYear] = useState()

  const [ligeirinho, setLigeirinho] = useState()

  useEffect(() => {
    api
      .get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`)
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.worker_id, label: option.worker_name }))

        setWorkersOptions(options)
      })
  }, [])

  const handleClose = () => {
    setAddMetricsModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      year_month: monthYear,
      ligeirinho: `[${ligeirinho.map((lig) => lig.value).join(',')}]`
    }

    api.post("/metrics", requestBody)
  }

  return (
    <Modal
      show={addMetricsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Definir métricas mensais</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="bg-light rounded p-3">
          <div className="mb-3"></div>
        </div>
        
        {/* <div className="row align-items-end g-2">
          <div className="col">
            <label className="form-label">Trabalhador</label>
            <ReactSelect
              options={workersOptions}
              classNamePrefix="react-select"
            />
          </div>

          <div className="col">
            <label className="form-label">Campo adicional</label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite algo"
            />
          </div>

          <div className="col-auto">
            <button className="btn btn-warning mt-4">
              <Plus />
            </button>
          </div>
        </div> */}

        {/* <div className="mb-3">
          <label className="form-label fw-bold">
            Mês/Ano
          </label>

          <input
            type="text"
            className="form-control"
            onChange={(e) => setMonthYear(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Ligeirinho
          </label>

          <ReactSelect
            options={workersOptions}
            isMulti
            onChange={(values) => setLigeirinho(values)}
          />
        </div> */}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Concluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddMetricsModal