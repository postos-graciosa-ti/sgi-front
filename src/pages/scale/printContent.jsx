import moment from "moment"

const printContent = (scalesList) => {
  const currentDate = new Date()

  const currentMonth = currentDate.getMonth()

  return (
    <div>
      <h3>Escala de Colaboradores — {moment().format('MM/YYYY')}</h3>

      <table>
        <thead>
          <tr>
            <th>Colaborador</th>

            <th>Folga</th>

            <th>Assinatura</th>
          </tr>
        </thead>

        <tbody>
          {
            scalesList && scalesList.map((scale) => (
              <tr key={scale.worker.id}>
                <td>{scale.worker.name}</td>

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

                <td></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default printContent