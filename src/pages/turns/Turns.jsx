import { Plus } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import getTurns from "../../requests/getTurns"
import { useEffect, useState } from "react"

const Turns = () => {
  const [turnsList, setTurnsList] = useState()

  useEffect(() => {
    GetTurns()
  }, [])

  const GetTurns = () => {
    getTurns()
      .then((response) => setTurnsList(response.data))
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div>
          <button
            type="button"
            className="btn btn-primary"
          >
            <Plus />
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  Colaborador
                </th>

                <th>
                  Filial
                </th>

                <th>
                  Dias de folga
                </th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {/* {
                turnsList && turnsList.map((turn) => (
                  <tr>
                    <td>
                      {turn.worker_name}
                    </td>

                    <td>
                      {turn.subsidiarie_name}
                    </td>

                    <td>
                      {turn.holidays}
                    </td>

                    <td>
                      <button type="button" className="btn btn-primary">
                        <Pencil />
                      </button>

                      <button type="button" className="btn btn-danger">
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))
              } */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Turns