const LogsRowTable = (props) => {
  const { title, logs } = props

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Alteração</th>

            <th>Horário</th>

            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {
            logs.length > 0 && (
              logs && logs.map((log) => (
                <tr key={log.id}>
                  <td className="w-50">{log.log_str}</td>

                  <td className="w-25">{log.happened_at}</td>

                  <td className="w-25">{log.happened_at_time}</td>
                </tr>
              ))
            ) || <tr><td>Não há registros de Log disponíveis</td></tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default LogsRowTable
