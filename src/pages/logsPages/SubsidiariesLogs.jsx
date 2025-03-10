import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import api from "../../services/api"
import LogsRowTable from "./LogsRowTable"

const SubsidiariesLogs = () => {
  const [subsidiariesLogs, setSubsidiariesLogs] = useState([])

  useEffect(() => {
    api
      .get(`/subsidiaries-logs`)
      .then((response) => setSubsidiariesLogs(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Histórico de alterações de filiais</h4>

        <LogsRowTable
          title={`logs`}
          logs={subsidiariesLogs}
        />
      </div>
    </>
  )
}

export default SubsidiariesLogs
