import moment from "moment"

const HollidayScalePrintContent = ({ workersScale, selectedHolliday, onDuty, subsidiarieData, userSession, webAdress, working }) => {
  console.log(working)

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>

        <div style={{ marginLeft: '8px' }}>
          {subsidiarieData?.name} | CNPJ: {subsidiarieData?.cnpj}
        </div>
      </div>

      <h4>Escada do dia {moment(selectedHolliday?.date).format("DD-MM-YYYY")}: feriado de {selectedHolliday?.name}</h4>

      <table>
        <thead>
          <tr>
            <th>Funcionários de folga</th>

            <th>Assinatura</th>
          </tr>
        </thead>

        <tbody>
          {
            workersScale?.map((scale) => (
              <tr>
                <td>{scale?.worker?.name}</td>

                <td>____________________________________________________________</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>Funcionários trabalhando</th>

            <th>Assinatura</th>
          </tr>
        </thead>

        <tbody>
          {
            working?.map((worker) => (
              <tr>
                <td>{worker.worker_name}</td>

                <td>____________________________________________________________</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <h4>Plantão</h4>

      {onDuty}

      <div style={{ bottom: "0", position: "fixed", left: "0" }}>
        Documento gerado por <strong>{userSession?.name}</strong> em {moment().format('DD-MM-YYYY')} às {moment().format('HH:mm')} via <strong>{webAdress}</strong>
      </div>
    </>
  )
}

export default HollidayScalePrintContent