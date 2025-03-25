const WorkersByTurnPrintContent = ({ workersByTurnAndFunction, selectedFields }) => {
  return (
    <>
      <div>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>
      </div>

      <div>
        <h4>Relatório de funcionários por turno e função</h4>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              {
                selectedFields?.map((field) => (
                  <th key={field.value}>
                    {field.label}
                  </th>
                ))
              }
            </tr>
          </thead>

          <tbody>
            {
              workersByTurnAndFunction?.map((worker, index) => (
                <tr key={index}>
                  {
                    selectedFields?.map((field) => (
                      <td key={field.value}>
                        {worker[field.value]}
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default WorkersByTurnPrintContent