import { useEffect, useState } from "react"
import { Plus, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import api from "../../services/api"
import AddMetricsModal from "./AddMetricsModal"
import DeleteMetricsModal from "./DeleteMetricsModal"

const Metrics = () => {
  const [metricsList, setMetricsList] = useState()

  const [selectedMetric, setSelectedMetric] = useState()

  const [addMetricsModalOpen, setAddMetricsModalOpen] = useState(false)

  const [deleteMetricsModalOpen, setDeleteMetricsModalOpen] = useState(false)

  useEffect(() => {
    api
      .get("/metrics")
      .then((response) => setMetricsList(response.data))
  }, [])

  const handleOpenAddMetricsModal = () => {
    setAddMetricsModalOpen(true)
  }

  const handleOpenDeleteMetricsModal = (metric) => {
    setSelectedMetric(metric)

    setDeleteMetricsModalOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <button className="btn btn-primary" onClick={handleOpenAddMetricsModal}>
          <Plus />
        </button>

        {
          metricsList && metricsList.map((metric) => (
            <div className="card mt-3 mb-3">
              <div className="card-body">
                <h5 className="card-title">{metric.year_month}</h5>

                <p className="card-text text-muted">Métricas mensais</p>
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div>
                    <span className="fw-bold">Ligeirinho</span>
                  </div>

                  <div>
                    {
                      metric?.ligeirinho.map((lig) => (
                        <span className="badge text-bg-primary me-1">{lig.name}</span>
                      ))
                    }
                  </div>
                </li>

                <li className="list-group-item text-end">
                  <button
                    onClick={() => handleOpenDeleteMetricsModal(metric)}
                    className="btn btn-danger"
                  >
                    <Trash />
                  </button>
                </li>

                {/* <li class="list-group-item">A third item</li> */}
              </ul>

              {/* <div class="card-body">
                <a href="#" class="card-link">Card link</a>

                <a href="#" class="card-link">Another link</a>
              </div> */}
            </div>
          ))
        }
      </div>

      <AddMetricsModal
        addMetricsModalOpen={addMetricsModalOpen}
        setAddMetricsModalOpen={setAddMetricsModalOpen}
      />

      <DeleteMetricsModal
        setMetricsList={setMetricsList}
        selectedMetric={selectedMetric}
        deleteMetricsModalOpen={deleteMetricsModalOpen}
        setDeleteMetricsModalOpen={setDeleteMetricsModalOpen}
      />
    </>
  )
}

export default Metrics