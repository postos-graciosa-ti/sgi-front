import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import api from "../../services/api"
import LogsRowTable from "./LogsRowTable"

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
