import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import api from "../../services/api"

const ScalesLogs = () => {
  const [scalesLogs, setScalesLogs] = useState([])

  useEffect(() => {
    api
      .get("/logs/scales")
      .then((response) => setScalesLogs(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container mt-5">
        <h4>Log de escala</h4>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Atualizações</th>
              </tr>
            </thead>

            <tbody>
              {
                scalesLogs?.length > 0 && (
                  scalesLogs?.map((scaleLog) => (
                    <tr>
                      <td>
                        <b>{scaleLog.user_name}</b> Atualizou a escala para <b>{scaleLog.worker_name}</b> em <b>{scaleLog.inserted_at}</b> às <b>{scaleLog.at_time}</b> horas
                      </td>
                    </tr>
                  ))
                ) || <div>Não há registros de log disponíveis</div>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ScalesLogs
