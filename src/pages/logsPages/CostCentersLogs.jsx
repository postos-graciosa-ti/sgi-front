import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import api from "../../services/api"
import useUserSessionStore from "../../data/userSession"

export const LogsRowTable = (props) => {
  const { title, logs } = props

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>{title}</th>

            <th></th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          {
            logs.length > 0 && (
              logs && logs.map((log) => (
                <tr>
                  <td>{log.log_str}</td>

                  <td>{log.happened_at}</td>

                  <td>{log.happened_at_time}</td>
                </tr>
              ))
            ) || <tr><td>Não há registros de Log disponíveis</td></tr>
          }
        </tbody>
      </table>
    </div>
  )
}

const CostCentersLogs = () => {
  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [costCentersLogs, setCostCenterLogs] = useState([])

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie.value}/logs/costs-centers`)
      .then((response) => setCostCenterLogs(response.data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <LogsRowTable title={`Logs de centro de custo`} logs={costCentersLogs} />
      </div>
    </>
  )
}

export default CostCentersLogs
