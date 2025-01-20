import { useEffect, useState } from "react"
import getScalesLogs from "../../requests/getScalesLogs"
import Nav from "../../components/Nav"

const ScalesLogs = () => {
  const [scalesLogs, setScalesLogs] = useState([])

  useEffect(() => {
    getScalesLogs()
      .then((response) => setScalesLogs(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container mt-5">
        <h2 className="mb-4">Logs de Escalas</h2>

        {
          Array.isArray(scalesLogs) && scalesLogs.map((scaleLog) => (
            <div key={scaleLog.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{scaleLog.user_name}</h5>

                <p className="card-text">
                  Atualizou a escala para <strong>{scaleLog.worker_name}</strong> em 
                  
                  <span className="text-muted"> {scaleLog.inserted_at}</span> às 
                  
                  <span className="font-weight-bold"> {scaleLog.at_time}</span>
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default ScalesLogs
