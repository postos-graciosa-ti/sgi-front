import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import api from "../../services/api"

const SystemLog = () => {
  const [systemLog, setSystemLog] = useState()

  useEffect(() => {
    api
      .get("/system-log")
      .then((response) => {
        setSystemLog(response.data)
      })
  }, [])

  return (
    <>
      <Nav />

      <div className="container-fluid">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th></th>

                <th></th>

                <th></th>

                <th></th>

                <th></th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                systemLog && systemLog.map((log) => (
                  <tr key={log.id}>
                    <td>{log.action}</td>

                    <td>{log.table_name}</td>

                    <td>{log.record_id}</td>

                    <td>{log.user_id}</td>

                    <td>{log.timestamp}</td>

                    <td>{log.details}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default SystemLog