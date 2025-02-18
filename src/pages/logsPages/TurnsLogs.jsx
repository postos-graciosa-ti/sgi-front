import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import getTurnsLogs from "../../requests/turns/turnsLogs/getTurnsLogs"
import LogsRowTable from "./components/LogsRowTable"

const TurnsLogs = () => {
  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [turnsLogs, setTurnsLogs] = useState([])

  useEffect(() => {
    getTurnsLogs(selectedSubsidiarie.value)
      .then((response) => setTurnsLogs(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <LogsRowTable
          title={`Logs`}
          logs={turnsLogs}
        />
      </div>
    </>
  )
}

export default TurnsLogs
