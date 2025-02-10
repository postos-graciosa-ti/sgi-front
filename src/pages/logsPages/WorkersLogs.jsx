import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import api from "../../services/api"
import useUserSessionStore from "../../data/userSession"

const WorkersLogs = () => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [createLogs, setCreateLogs] = useState([])

  const [updateLogs, setUpdateLogs] = useState([])

  const [deleteLogs, setDeleteLogs] = useState([])

  useEffect(() => {
    api
      .get(`/logs/subsidiaries/${selectedSubsdiarie.value}/workers/create`)
      .then((response) => setCreateLogs(response.data))
      .catch((error) => console.error(error))

    api
      .get(`/logs/subsidiaries/${selectedSubsdiarie.value}/workers/update`)
      .then((response) => setUpdateLogs(response.data))
      .catch((error) => console.error(error))

    api
      .get(`/logs/subsidiaries/${selectedSubsdiarie.value}/workers/delete`)
      .then((response) => setDeleteLogs(response.data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Log de funcionários</h4>

        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Adições</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    createLogs && createLogs.length > 0 && (
                      createLogs.map((log, index) => (
                        <tr key={log.id}>
                          <td>
                            <b>{log.user_name}</b> criou <b>{log.worker_name}</b> em <b>{log.created_at}</b> às <b>{log.created_at_time}</b> horas
                          </td>
                        </tr>
                      ))
                    ) || (
                      <tr>
                        <td>Não há registros de criação</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Atualizações</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    updateLogs?.length > 0 && (
                      updateLogs.map((log, index) => (
                        <tr key={log.id}>
                          <td>
                            <b>{log.user_name}</b> atualizou <b>{log.worker_name}</b> em <b>{log.updated_at}</b> às <b>{log.updated_at_time}</b> horas
                          </td>
                        </tr>
                      ))
                    ) || (
                      <tr>
                        <td>Não há registros de atualização</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Exclusões</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    deleteLogs?.length > 0 ? (
                      deleteLogs.map((log) => (
                        <tr key={log.id}>
                          <td>
                            <b>{log.user_name}</b> excluiu <b>{log.worker_name}</b> em <b>{log.deleted_at}</b> às <b>{log.deleted_at_time}</b> horas
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>Não há registros de exclusão</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkersLogs
