const WorkersByTurnPrintContent = ({ selectedSubsdiarie, workersByTurn, selectedFunction, selectedTurn }) => {
  return (
    <>
      <div>
        <img src="/logo.png" style={{ width: '80px' }} />
      </div>

      <div>
        <h4>Relatório de funcionários por turno e função</h4>
      </div>

      <div style={{ "marginTop": "30px", "marginBottom": "30px" }}>
        <div>
          <span><b>Filial</b>: {selectedSubsdiarie?.label}</span>
        </div>

        <div>
          <span><b>Função</b>: {selectedFunction?.label}</span>
        </div>

        <div>
          <span><b>Turno</b>: {selectedTurn?.label}</span>
        </div>

        <div>
          <span><b>Centro de custos</b>: {workersByTurn[0].cost_center}</span>
        </div>

        <div>
          <span><b>Setor</b>: {workersByTurn[0].department}</span>
        </div>
      </div>

      <table style={{ "textAlign": "center" }}>
        <thead>
          <tr>
            <th>Matricula</th>

            <th>Nome de colaborador</th>
          </tr>
        </thead>

        <tbody>
          {
            workersByTurn?.map((worker) => (
              <tr key={worker?.id}>
                <td>{worker?.enrolment}</td>

                <td>{worker?.name}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default WorkersByTurnPrintContent