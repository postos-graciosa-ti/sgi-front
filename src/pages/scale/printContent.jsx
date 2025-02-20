import moment from "moment"

const printContent = (scalesList) => {
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

  return (
    <div className="container">
      <h3>
        Escala de folgas de Colaboradores — {moment().format("MM/YYYY")}
      </h3>

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
              scalesList?.map((scale) => (
                <tr key={scale.worker.id}>
                  <td>{scale.worker.name}</td>

                  <td>
                    <div className="badge-container">
                      {
                        scale.dates?.map((dateItem, index) => {
                          const weekdayInEnglish = moment(dateItem, "YYYY-MM-DD").format("dddd")

                          return (
                            <div key={index} className="badge text-bg-success">
                              {`${moment(dateItem).format("DD-MM-YYYY")} (${translateWeekday(weekdayInEnglish)})`}
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
      </div>

      <div>
        <h3>Assinaturas:</h3>

        {
          scalesList?.map((scale) => (
            <div key={scale.worker.id}>
              {scale.worker.name} __________________________________________________
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default printContent
