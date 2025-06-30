import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Plus } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const WorkersMetricsModal = (props) => {
  const { selectedWorker, workersMetricsModalOpen, setWorkersMetricsModalOpen } = props

  const [historyWorkersMetrics, setHistoryWorkersMetrics] = useState()

  const [aleloFrequency, setAleloFrequency] = useState()

  const [assiduity, setAssiduity] = useState()

  const [productivity, setProductivity] = useState()

  const [courses, setCourses] = useState()

  const [challengeRanking, setChallengeRanking] = useState()

  const [gridOil, setGridOil] = useState()

  const [attendance, setAttendance] = useState()

  useEffect(() => {
    if (workersMetricsModalOpen) {
      api
        .get(`/workers-metrics/${selectedWorker?.worker_id}`)
        .then((response) => {
          setHistoryWorkersMetrics(response.data)
        })
    }
  }, [workersMetricsModalOpen])

  const handleClose = () => {
    setHistoryWorkersMetrics()

    setAleloFrequency()

    setAssiduity()

    setProductivity()

    setCourses()

    setChallengeRanking()

    setGridOil()

    setAttendance()

    setWorkersMetricsModalOpen(false)
  }

  const handleSubmit = () => {
    let metrics = {
      "alelo_frequency": aleloFrequency || "0",
      "assiduity": assiduity || "0",
      "productivity": productivity || "0",
      "courses": courses || "0",
      "challenge_ranking": challengeRanking || "0",
      "gridOil": gridOil || "0",
      "attendance": attendance || "0",
    }

    let requestBody = {
      "worker_id": selectedWorker?.worker_id,
      "date": dayjs().format("MM/YYYY"),
      "metrics": JSON.stringify(metrics),
    }

    api
      .post("/workers-metrics", requestBody)
      .then(() => {
        api
          .get(`/workers-metrics/${selectedWorker?.worker_id}`)
          .then((response) => {
            setHistoryWorkersMetrics(response.data)
          })
      })
  }

  return (
    <Modal
      show={workersMetricsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Indicadores de desempenho {selectedWorker?.worker_name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="bg-light p-4 mb-5 rounded shadow">
          <div>
            <h5>Histórico de Indicadores</h5>
          </div>

          {
            historyWorkersMetrics && historyWorkersMetrics.map((history, index) => {
              let parsedMetrics = {}

              try {
                parsedMetrics = JSON.parse(history.metrics)
              } catch (e) {
                console.error("Erro ao fazer parse dos metrics:", e)
              }

              return (
                <div key={index} className="mb-4 border-bottom pb-3">
                  <div className="mb-2">
                    <input
                      className="form-control text-center fw-bold"
                      value={history.date}
                      disabled
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-bold">Alelo Frequência</label>
                    <input
                      className="form-control text-center"
                      value={parsedMetrics.alelo_frequency ?? ''}
                      disabled
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-bold">Assiduidade</label>
                    <input
                      className="form-control text-center"
                      value={parsedMetrics.assiduity ?? ''}
                      disabled
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-bold">Produtividade</label>
                    <input
                      className="form-control text-center"
                      value={parsedMetrics.productivity ?? ''}
                      disabled
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-bold">Cursos</label>
                    <input
                      className="form-control text-center"
                      value={parsedMetrics.courses ?? ''}
                      disabled
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-bold">Ranking Desafio</label>
                    <input
                      className="form-control text-center"
                      value={parsedMetrics.challenge_ranking ?? ''}
                      disabled
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-bold">Gasolina Grid</label>
                    <input
                      className="form-control text-center"
                      value={parsedMetrics.gridOil ?? ''}
                      disabled
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-bold">Atendimento</label>
                    <input
                      className="form-control text-center"
                      value={parsedMetrics.attendance ?? ''}
                      disabled
                    />
                  </div>
                </div>
              )
            })
          }
        </div>

        <div className="bg-light p-4 rounded shadow">
          <div>
            <h5>Novo Indicador</h5>
          </div>

          <div className="row mb-3">
            <div className="col">
              <input className="form-control text-center fw-bold" value={dayjs().format("MM/YYYY")} disabled />
            </div>

            <div className="col-auto">
              <button className="btn btn-warning" onClick={handleSubmit}>
                <Plus />
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Alelo Frequência
            </label>

            <input
              type="text"
              className="form-control"
              onChange={(e) => setAleloFrequency(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Assiduidade
            </label>

            <input
              type="text"
              className="form-control"
              onChange={(e) => setAssiduity(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Produtividade
            </label>

            <input
              type="text"
              className="form-control"
              onChange={(e) => setProductivity(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Cursos
            </label>

            <input
              type="text"
              className="form-control"
              onChange={(e) => setCourses(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Ranking Desafio
            </label>

            <input
              type="text"
              className="form-control"
              onChange={(e) => setChallengeRanking(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Gasolina Grid
            </label>

            <input
              type="text"
              className="form-control"
              onChange={(e) => setGridOil(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Atendimento
            </label>

            <input
              type="text"
              className="form-control"
              onChange={(e) => setAttendance(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WorkersMetricsModal