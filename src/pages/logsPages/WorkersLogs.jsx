import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import LogsRowTable from "./components/LogsRowTable"

const WorkersLogs = () => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [workersLogs, setWorkersLogs] = useState([])

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsdiarie.value}/workers/logs`)
      .then((response) => setWorkersLogs(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <LogsRowTable
          title={`logs`}
          logs={workersLogs}
        />
      </div>
    </>
  )
}

export default WorkersLogs
