import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import AddOpenPositionModal from "./AddOpenPositionModal"

const PositionsTable = () => {
  const [addOpenPositionModalOpen, setAddOpenPositionModalOpen] = useState(false)

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [openPositionsList, setOpenPositionsList] = useState()

  useEffect(() => {
    api
      .get(`/open-positions`)
      .then((response) => setOpenPositionsList(response.data))
  }, [])

  const handleOpenOpenPositionModal = () => {
    setAddOpenPositionModalOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Quadro de vagas</h4>

        <div className="mt-3 mb-3">
          <button
            className="btn btn-primary"
            onClick={handleOpenOpenPositionModal}
          >
            Nova vaga
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Filial</th>

                <th>Função</th>

                <th>Turno</th>
              </tr>
            </thead>

            <tbody>
              {
                openPositionsList && openPositionsList.map((openPosition) => (
                  <tr>
                    <td>{openPosition?.subsidiarie?.name}</td>

                    <td>{openPosition?.function?.name}</td>

                    <td>{openPosition?.turn?.name}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <AddOpenPositionModal
        addOpenPositionModalOpen={addOpenPositionModalOpen}
        setAddOpenPositionModalOpen={setAddOpenPositionModalOpen}
        setOpenPositionsList={setOpenPositionsList}
      />
    </>
  )
}

export default PositionsTable