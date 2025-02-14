import { useEffect, useState } from "react"
import api from "../../services/api"
import LogsRowTable from "./components/LogsRowTable"
import Nav from "../../components/Nav"

const UsersLogs = () => {
  const [usersLogs, setUsersLogs] = useState([])

  useEffect(() => {
    api
      .get(`/logs/users`)
      .then((response) => setUsersLogs(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <LogsRowTable
          title={`logs`}
          logs={usersLogs}
        />
      </div>
    </>
  )
}

export default UsersLogs
