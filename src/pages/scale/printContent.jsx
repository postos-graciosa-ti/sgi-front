import moment from "moment"

const printContent = (scalesList) => {
  console.log(scalesList)
  
  return (
    <div className="container">
      <h3>Escala de folgas de Colaboradores — {moment().format('MM/YYYY')}</h3>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Colaborador</th>

              <th>Folga</th>
            </tr>
          </thead>

          <tbody>
            {
              scalesList && scalesList.map((scale) => (
                <tr key={scale.worker.id}>
                  <td>
                    {scale.worker.name} ({scale.worker.function.name}/{`${scale.worker.turn.start_time} - ${scale.worker.turn.end_time}`})
                  </td>

                  <td>
                    <div className="badge-container">
                      {scale.days_off?.map((dayOff, index) => (

                        <div key={index} className="badge text-bg-success">
                          {dayOff.date} (
                          {
                            dayOff.weekday === "Monday" ? "Segunda-Feira" :
                              dayOff.weekday === "Tuesday" ? "Terça-Feira" :
                                dayOff.weekday === "Wednesday" ? "Quarta-Feira" :
                                  dayOff.weekday === "Thursday" ? "Quinta-Feira" :
                                    dayOff.weekday === "Friday" ? "Sexta-Feira" :
                                      dayOff.weekday === "Saturday" ? "Sábado" :
                                        dayOff.weekday === "Sunday" ? "Domingo" :
                                          ""
                          })
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <div>
        <h3>Assinaturas:</h3>
        {
          scalesList?.map((scale) => (
            <div>
              {scale.worker.name} __________________________________________________
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default printContent