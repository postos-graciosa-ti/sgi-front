import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import LogsRowTable from "./LogsRowTable"

const WorkersLogs = () => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [workersLogs, setWorkersLogs] = useState([])

  useEffect(() => {
    api
      .get(`/logs/subsidiaries/${selectedSubsdiarie.value}/workers`)
      .then((response) => setWorkersLogs(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Histórico de alterações de colaboradores</h4>
        
        <LogsRowTable
          title={`logs`}
          logs={workersLogs}
        />
      </div>
    </>
  )
}

export default WorkersLogs
