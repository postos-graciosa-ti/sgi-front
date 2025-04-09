const WorkersByTurnPrintContent = ({ workersByTurnAndFunction, selectedFields, selectedSubsdiarie }) => {
  return (
    <>
      <div>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>
      </div>

      <div>
        <h4>Relatório de funcionários por turno e função ({selectedSubsdiarie?.label})</h4>
      </div>

      {
        Object.entries(workersByTurnAndFunction).map(([groupLabel, workers], groupIndex) => (
          <div key={groupIndex} style={{ marginBottom: '40px' }}>
            <h5 style={{ marginTop: '20px' }}>{groupLabel}</h5>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr>
                  {
                    selectedFields?.map((field) => (
                      <th
                        key={field.value}
                        style={{ border: '1px solid #000', padding: '8px', textAlign: 'left' }}
                      >
                        {field.label}
                      </th>
                    ))
                  }
                </tr>
              </thead>

              <tbody>
                {
                  workers.map((worker, index) => (
                    <tr key={index}>
                      {
                        selectedFields?.map((field) => (
                          <td
                            key={field.value}
                            style={{ border: '1px solid #000', padding: '8px' }}
                          >
                            {
                              typeof worker[field.value] === 'object'
                                ? worker[field.value]?.name || ''
                                : worker[field.value]
                            }
                          </td>
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        ))
      }
    </>
  )
}

export default WorkersByTurnPrintContent
