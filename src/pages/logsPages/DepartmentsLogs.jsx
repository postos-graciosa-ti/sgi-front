import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import LogsRowTable from "./LogsRowTable"

const DepartmentsLogs = () => {
  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [departmentLogs, setDepartmentLogs] = useState([])

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie.value}/logs/departments`)
      .then((response) => setDepartmentLogs(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Histórico de alterações de setores</h4>

        <LogsRowTable
          title={`Logs`}
          logs={departmentLogs}
        />
      </div>
    </>
  )
}

export default DepartmentsLogs
