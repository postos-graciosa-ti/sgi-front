import { useEffect, useState } from "react"
import { Plus } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import api from "../../services/api"
import AddIndicatorsModal from "./AddIndicatorsModal"

const Indicators = () => {
  const [addIndicatorsModalOpen, setAddIndicatorsModalOpen] = useState(false)

  const [indicatorsList, setIndicatorsList] = useState()

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

  return (
    <>
      <Nav />

      <div className="container">
        <div>
          <button
            onClick={handleOpenAddIndicatorsModal}
            className="btn btn-primary"
          >
            <Plus />
          </button>
        </div>
      </div>

      <AddIndicatorsModal
        addIndicatorsModalOpen={addIndicatorsModalOpen}
        setAddIndicatorsModalOpen={setAddIndicatorsModalOpen}
      />
    </>
  )
}

export default Indicators