import moment from "moment"

const printContent = (scalesList, onDuty, startDate, endDate, selectedTurn, selectedFunction) => {

  const translateWeekday = (weekday) => {
    const days = {
      Monday: "Segunda-Feira",
      Tuesday: "Terça-Feira",
      Wednesday: "Quarta-Feira",
      Thursday: "Quinta-Feira",
      Friday: "Sexta-Feira",
      Saturday: "Sábado",
      Sunday: "Domingo",
    }

    return days[weekday] || ""
  }

  const countSundays = (scale) => {
    return scale.days_off?.filter((dateItem) => moment(dateItem, "YYYY-MM-DD").format("dddd") === "Sunday").length || 0
  }

  const formatDate = (date) => moment(date).format("DD-MM-YYYY")

  const formatWeekday = (date) => translateWeekday(moment(date, "YYYY-MM-DD").format("dddd"))

  return (
    <div className="container">
      <h3>Escala de folgas de Colaboradores — {moment().format("MM/YYYY")}</h3>

      <p>{selectedFunction?.label} (turno {selectedTurn?.label}): semana de {startDate} até {endDate}</p>

      <div>
        {
          scalesList?.map((scale) => (
            <div key={scale.worker.name} style={{ marginBottom: '16px' }}>

              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                {scale.worker.name}
              </div>

              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  Dias de trabalho:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                  {
                    scale.days_on?.map((dateItem, index) => (
                      <div key={index}>
                        {`${formatDate(dateItem)} (${formatWeekday(dateItem)})`}
                      </div>
                    ))
                  }
                </div>
              </div>

              <div style={{ marginTop: '8px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  Dias de folga:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                  {
                    scale.proportion?.map((item, index) => (
                      <div key={index}>
                        {`${item.data} (${translateWeekday(item.weekday)} - ${item.proporcao})`}
                      </div>
                    ))
                  }
                </div>
              </div>

            </div>
          ))
        }
      </div>

      {/* <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Colaborador</th>

              <th>Domingos de Folga</th>

              <th>Folgas</th>
            </tr>
          </thead>

          <tbody>
            {
              scalesList?.map((scale) => (
                <tr key={scale.worker.id}>
                  <td>{scale.worker.name}</td>

                  <td>{countSundays(scale)}</td>

                  <td>
                    <div className="proportions-container">
                      {
                        scale.proportion?.map((item, index) => {
                          const formattedWeekday = translateWeekday(item.weekday)

                          return (
                            <div key={index} className="proportion-item">
                              <div>{`${item.data} (${formattedWeekday} - ${item.proporcao})`}</div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div> */}

      <div>
        <h3>Plantão</h3>

        <div>{onDuty}</div>
      </div>

      <div>
        <h3>Assinaturas:</h3>

        {
          scalesList?.map((scale) => (
            <>
              <div key={scale.worker.id}>
                {scale.worker.name} ____________________
              </div>

              <br />
            </>
          ))
        }
      </div>
    </div>
  )
}

export default printContent