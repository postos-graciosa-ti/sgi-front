import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import LogsRowTable from "./LogsRowTable"

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
        <h4>Histórico de alterações de centros de custos</h4>

        <LogsRowTable
          title={`Logs de centro de custo`}
          logs={costCentersLogs}
        />
      </div>
    </>
  )
}

export default CostCentersLogs
