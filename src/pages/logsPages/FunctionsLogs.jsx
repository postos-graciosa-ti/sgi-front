import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import api from "../../services/api"
import LogsRowTable from "./LogsRowTable"
import useUserSessionStore from "../../data/userSession"

const FunctionsLogs = () => {
  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [functionLogs, setFunctionLogs] = useState([])

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie.value}/functions/logs`)
      .then((response) => setFunctionLogs(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <LogsRowTable
          title={`Logs`}
          logs={functionLogs}
        />
      </div>
    </>
  )
}

export default FunctionsLogs