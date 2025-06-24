import { useEffect, useState } from "react"
import { Filter, Pencil, Plus, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import api from "../../services/api"
import AddIndicatorsModal from "./AddIndicatorsModal"
import IndicatorsFilterModal from "./IndicatorsFilterModal"

const Indicators = () => {
  const [addIndicatorsModalOpen, setAddIndicatorsModalOpen] = useState(false)

  const [indicatorsList, setIndicatorsList] = useState()

  const [indicatorsFilterModalOpen, setIndicatorsFilterModalOpen] = useState(false)

  useEffect(() => {
    api
      .get("/indicators")
      .then((response) => {
        setIndicatorsList(response.data)
      })
  }, [])

  const handleOpenAddIndicatorsModal = () => {
    setAddIndicatorsModalOpen(true)
  }

  const handleOpenIndicatorsFilterModal = () => {
    setIndicatorsFilterModalOpen(true)
  }

  const handleDeleteIndicator = (id) => {
    api
      .delete(`/indicators/${id}`)
      .then(() => {
        api
          .get("/indicators")
          .then((response) => {
            setIndicatorsList(response.data)
          })
      })
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div>
          <h4>Indicadores</h4>
        </div>

        <div className="mt-3 mb-3">
          <button
            onClick={handleOpenAddIndicatorsModal}
            className="btn btn-primary me-2"
          >
            <Plus />
          </button>

          <button
            onClick={handleOpenIndicatorsFilterModal}
            className="btn btn-primary"
          >
            <Filter />
          </button>
        </div>

        {
          indicatorsList && indicatorsList.map((indicator) => (
            <>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{indicator.criteria?.name} {indicator.month}</h5>

                  <p className="card-text text-muted">{indicator.note}</p>
                </div>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    {
                      indicator.workers && indicator.workers.map((worker) => (
                        <span className="badge text-bg-primary me-1">{worker?.name}</span>
                      ))
                    }
                  </li>

                  <li className="list-group-item text-end">
                    <button className="btn btn-warning me-2">
                      <Pencil />
                    </button>

                    <button
                      onClick={() => handleDeleteIndicator(indicator.id)}
                      className="btn btn-danger"
                    >
                      <Trash />
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ))
        }
      </div>

      <AddIndicatorsModal
        addIndicatorsModalOpen={addIndicatorsModalOpen}
        setAddIndicatorsModalOpen={setAddIndicatorsModalOpen}
      />

      <IndicatorsFilterModal
        indicatorsFilterModalOpen={indicatorsFilterModalOpen}
        setIndicatorsFilterModalOpen={setIndicatorsFilterModalOpen}
      />
    </>
  )
}

export default Indicators