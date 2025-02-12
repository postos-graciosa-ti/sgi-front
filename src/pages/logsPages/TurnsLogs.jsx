import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"

export const LogsRowTable = ({ title, children }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>{title}</th>
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

const TurnsLogs = () => {
  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [postLogs, setPostLogs] = useState()

  const [putLogs, setPutLogs] = useState()

  const [deleteLogs, setDeleteLogs] = useState()

  useEffect(() => {
    api
      .get(`/logs/subsidiaries/${selectedSubsidiarie.value}/turns`)
      .then((response) => {
        let logs = response.data

        setPostLogs(logs.post_logs)

        setPutLogs(logs.put_logs)

        setDeleteLogs(logs.delete_logs)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Log de turnos</h4>

        <LogsRowTable title={"adição"}>
          {
            postLogs && postLogs.map((postLog) => (
              <tr>
                <td><b>{postLog.user_name}</b> adicionou <b>{postLog.turn_name}</b> em <b>{postLog.happened_at}</b> às <b>{postLog.happened_at_time}</b></td>
              </tr>
            ))
          }
        </LogsRowTable>

        <LogsRowTable title={"atualização"}>
          {
            putLogs && putLogs.map((putLog) => (
              <tr>
                <td><b>{putLog.user_name}</b> atualizou <b>{putLog.turn_name}</b> em <b>{putLog.happened_at}</b> às <b>{putLog.happened_at_time}</b></td>
              </tr>
            ))
          }
        </LogsRowTable>

        <LogsRowTable title={"exclusões"}>
          {
            deleteLogs && deleteLogs.map((deleteLog) => (
              <tr>
                <td><b>{deleteLog.user_name}</b> atualizou <b>{deleteLog.turn_name}</b> em <b>{deleteLog.happened_at}</b> às <b>{deleteLog.happened_at_time}</b></td>
              </tr>
            ))
          }
        </LogsRowTable>
      </div>
    </>
  )
}

export default TurnsLogs
