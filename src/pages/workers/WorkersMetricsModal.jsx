import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Plus } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const WorkersMetricsModal = ({ selectedWorker, workersMetricsModalOpen, setWorkersMetricsModalOpen }) => {
  const [historyWorkersMetrics, setHistoryWorkersMetrics] = useState([])

  const [editedMetricsById, setEditedMetricsById] = useState({})

  const [seeEditButton, setSeeEditButton] = useState({})

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
        .then((res) => {
          setHistoryWorkersMetrics(res.data)
        })
    }
  }, [workersMetricsModalOpen])

  const handleClose = () => {
    setHistoryWorkersMetrics([])

    setEditedMetricsById({})

    setSeeEditButton({})

    setAleloFrequency()

    setAssiduity()

    setProductivity()

    setCourses()

    setChallengeRanking()

    setGridOil()

    setAttendance()

    setWorkersMetricsModalOpen(false)
  }

  const handleInputChange = (id, field, value) => {
    setEditedMetricsById(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      }
    }))

    setSeeEditButton(prev => ({ ...prev, [id]: true }))
  }

  const handleEdit = (id) => {
    const updatedMetrics = editedMetricsById[id]

    if (!updatedMetrics) return

    api
      .patch(`/workers-metrics/${id}`, {
        metrics: JSON.stringify(updatedMetrics)
      })
      .then(() => {
        setEditedMetricsById(prev => {
          const copy = { ...prev }
          delete copy[id]
          return copy
        })

        setSeeEditButton(prev => ({ ...prev, [id]: false }))

        api
          .get(`/workers-metrics/${selectedWorker?.worker_id}`)
          .then((res) => {
            setHistoryWorkersMetrics(res.data)
          })
      })
  }

  const handleSubmit = () => {
    const metrics = {
      alelo_frequency: aleloFrequency || "0",
      assiduity: assiduity || "0",
      productivity: productivity || "0",
      courses: courses || "0",
      challenge_ranking: challengeRanking || "0",
      gridOil: gridOil || "0",
      attendance: attendance || "0",
    }

    api
      .post("/workers-metrics", {
        worker_id: selectedWorker?.worker_id,
        date: dayjs().format("MM/YYYY"),
        metrics: JSON.stringify(metrics),
      })
      .then(() => {
        api
          .get(`/workers-metrics/${selectedWorker?.worker_id}`)
          .then((res) => {
            setHistoryWorkersMetrics(res.data)
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
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="mb-0">Histórico de Indicadores</h5>
          </div>

          {historyWorkersMetrics.map((history, index) => {
            let parsed = {}
            try {
              parsed = JSON.parse(history.metrics)
            } catch (e) { }

            return (
              <div key={history.id} className="mb-4 border-bottom pb-3">
                <div className="mb-2">
                  <input
                    className="form-control text-center fw-bold"
                    value={history.date}
                    disabled
                  />
                </div>

                {[
                  ["Alelo Frequência", "alelo_frequency"],
                  ["Assiduidade", "assiduity"],
                  ["Produtividade", "productivity"],
                  ["Cursos", "courses"],
                  ["Ranking Desafio", "challenge_ranking"],
                  ["Gasolina Grid", "gridOil"],
                  ["Atendimento", "attendance"],
                ].map(([label, field]) => (
                  <div className="mb-2" key={field}>
                    <label className="form-label fw-bold">{label}</label>
                    <input
                      className="form-control text-center"
                      defaultValue={parsed[field] ?? ''}
                      onChange={(e) => handleInputChange(history.id, field, e.target.value)}
                    />
                  </div>
                ))}

                {seeEditButton[history.id] && (
                  <div className="text-end">
                    <button className="btn btn-success" onClick={() => handleEdit(history.id)}>
                      Salvar
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="bg-light p-4 rounded shadow">
          <h5>Novo Indicador</h5>

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

          {[
            ["Alelo Frequência", setAleloFrequency],
            ["Assiduidade", setAssiduity],
            ["Produtividade", setProductivity],
            ["Cursos", setCourses],
            ["Ranking Desafio", setChallengeRanking],
            ["Gasolina Grid", setGridOil],
            ["Atendimento", setAttendance],
          ].map(([label, setter]) => (
            <div className="mb-3" key={label}>
              <label className="form-label fw-bold">{label}</label>
              <input className="form-control" onChange={(e) => setter(e.target.value)} />
            </div>
          ))}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WorkersMetricsModal
