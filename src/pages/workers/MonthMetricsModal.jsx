import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const MonthMetricsModal = (props) => {
  const { monthMetricsModalOpen, setMonthMetricsModalOpen } = props

  const [monthMetricsList, setMonthMetricsList] = useState()

  useEffect(() => {
    if (monthMetricsModalOpen) {
      api
        .get("/asas")
        .then((response) => {
          setMonthMetricsList(response.data)
        })
    }
  }, [monthMetricsModalOpen])

  const handleClose = () => {
    setMonthMetricsList()
    setMonthMetricsModalOpen(false)
  }

  return (
    <Modal
      show={monthMetricsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Métricas mensais</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="bg-light p-4 mb-5 rounded shadow">
          <div>
            <h5>Indicadores por colaborador</h5>
          </div>

          {monthMetricsList?.map((entry, index) => {
            const { worker, date, metrics } = entry

            return (
              <div key={index} className="mb-4 border-bottom pb-3">
                <div className="mb-3">
                  <input
                    className="form-control text-center fw-bold"
                    value={`${worker?.name ?? 'Sem nome'} - ${date}`}
                    disabled
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label fw-bold">Alelo Frequência</label>
                  <input
                    className="form-control text-center"
                    value={metrics.alelo_frequency ?? ''}
                    disabled
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label fw-bold">Assiduidade</label>
                  <input
                    className="form-control text-center"
                    value={metrics.assiduity ?? ''}
                    disabled
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label fw-bold">Produtividade</label>
                  <input
                    className="form-control text-center"
                    value={metrics.productivity ?? ''}
                    disabled
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label fw-bold">Cursos</label>
                  <input
                    className="form-control text-center"
                    value={metrics.courses ?? ''}
                    disabled
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label fw-bold">Ranking Desafio</label>
                  <input
                    className="form-control text-center"
                    value={metrics.challenge_ranking ?? ''}
                    disabled
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label fw-bold">Gasolina Grid</label>
                  <input
                    className="form-control text-center"
                    value={metrics.gridOil ?? ''}
                    disabled
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label fw-bold">Atendimento</label>
                  <input
                    className="form-control text-center"
                    value={metrics.attendance ?? ''}
                    disabled
                  />
                </div>
              </div>
            )
          })}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Entendido
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MonthMetricsModal
