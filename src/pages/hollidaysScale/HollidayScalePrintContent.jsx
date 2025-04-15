import moment from "moment"

const HollidayScalePrintContent = ({ workersScale, selectedHolliday, onDuty, subsidiarieData, userSession, webAdress }) => {
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
          </tr>
        </thead>

        <tbody>
          {
            workersScale?.map((scale) => (
              <tr>
                <td>{scale?.worker?.name}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <h4>Plantão</h4>

      {onDuty}

      <h4>Assinaturas</h4>

      {
        workersScale?.map((scale) => (
          <div style={{ "marginBottom": "18px" }}>
            {scale?.worker?.name} ____________________________________________________________
          </div>
        ))
      }

      <div style={{ bottom: "0", position: "fixed", left: "0" }}>
        Documento gerado por <strong>{userSession?.name}</strong> em {moment().format('DD-MM-YYYY')} às {moment().format('HH:mm')} via <strong>{webAdress}</strong>
      </div>
    </>
  )
}

export default HollidayScalePrintContent