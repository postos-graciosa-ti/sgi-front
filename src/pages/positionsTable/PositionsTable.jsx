import { useEffect, useState } from "react"
import { ArrowClockwise, Trash } from "react-bootstrap-icons"
import ReactSelect from "react-select"
import Nav from "../../components/Nav"
import api from "../../services/api"
import AddOpenPositionModal from "./AddOpenPositionModal"

const PositionsTable = () => {
  const [openPositionsList, setOpenPositionsList] = useState()

  const [subsidiariesOptions, setSubsidiariesOptions] = useState()

  const [selectedSubsidiarie, setSelectedSubsidiarie] = useState(null)

  const [addOpenPositionModalOpen, setAddOpenPositionModalOpen] = useState(false)

  useEffect(() => {
    api
      .get(`/subsidiaries`)
      .then((response) => {
        const options = response.data.map((option) => ({
          value: option.id,
          label: option.name
        }))

        setSubsidiariesOptions(options)
      })

    api
      .get(`/open-positions`)
      .then((response) =>
        setOpenPositionsList(response.data)
      )
  }, [])

  useEffect(() => {
    if (selectedSubsidiarie) {
      api
        .get(`/subsidiaries/${selectedSubsidiarie.value}/open-positions`)
        .then((response) => setOpenPositionsList(response.data))
    }
  }, [selectedSubsidiarie])

  const handleResetOpenPositionsList = () => {
    api
      .get(`/open-positions`)
      .then((response) => {
        setSelectedSubsidiarie(null)

        setOpenPositionsList(response.data)
      })
  }

  const handleOpenOpenPositionModal = () => {
    setAddOpenPositionModalOpen(true)
  }

  const handleDeleteOpenPosition = (openPosition) => {
    api
      .delete(`/open-positions/${openPosition.id}`)
      .then(() => {
        api
          .get(`/open-positions`)
          .then((response) =>
            setOpenPositionsList(response.data)
          )
      })
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

        <div className="row">
          <div className="col-11">
            <ReactSelect
              options={subsidiariesOptions}
              value={selectedSubsidiarie}
              onChange={(option) => setSelectedSubsidiarie(option)}
              isClearable
              placeholder="Filtrar por filial..."
            />
          </div>

          <div className="col-1">
            <button
              className="btn btn-primary"
              onClick={handleResetOpenPositionsList}
            >
              <ArrowClockwise />
            </button>
          </div>
        </div>

        <div className="table-responsive mt-3">
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
                openPositionsList &&
                openPositionsList.map((openPosition) => (
                  <tr key={openPosition?.id}>
                    <td>{openPosition?.subsidiarie?.name}</td>

                    <td>{openPosition?.function?.name}</td>

                    <td>{openPosition?.turn?.name}</td>

                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteOpenPosition(openPosition)}
                      >
                        <Trash />
                      </button>
                    </td>
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