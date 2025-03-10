import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import LogsRowTable from "./LogsRowTable"

const TurnsLogs = () => {
  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [turnsLogs, setTurnsLogs] = useState([])

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie.value}/logs/turns`)
      .then((response) => setTurnsLogs(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Histórico de alterações de turnos</h4>

        <LogsRowTable
          title={`Logs`}
          logs={turnsLogs}
        />
      </div>
    </>
  )
}

export default TurnsLogs
