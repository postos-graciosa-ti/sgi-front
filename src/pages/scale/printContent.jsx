import moment from "moment"

const printContent = (scalesList, onDuty, startDate, endDate, selectedTurn) => {
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
    return scale.days_off?.filter((dateItem) => {
      return moment(dateItem, "YYYY-MM-DD").format("dddd") === "Sunday";
    }).length || 0
  }

  return (
    <div className="container">
      <h3>
        Escala de folgas de Colaboradores — {moment().format("MM/YYYY")}
      </h3>

      <p>
        Turno {selectedTurn.label}: Semana de {startDate} até {endDate}
      </p>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Colaborador</th>
              <th>Domingos de Folga</th>
              <th>Dias de Trabalho</th>
              {/* <th>Folga</th> */}
              <th>Folgas</th> {/* Adicionando a coluna para 'Proporção' */}
            </tr>
          </thead>

          <tbody>
            {scalesList?.map((scale) => (
              <tr key={scale.worker.id}>
                <td>{scale.worker.name}</td>

                <td>{countSundays(scale)}</td>

                <td>
                  <div className="badge-container">
                    {scale.days_on?.map((dateItem, index) => {
                      const weekdayInEnglish = moment(dateItem, "YYYY-MM-DD").format("dddd");
                      return (
                        <div key={index} className="badge text-bg-primary">
                          {`${moment(dateItem).format("DD-MM-YYYY")} (${translateWeekday(weekdayInEnglish)})`}
                        </div>
                      );
                    })}
                  </div>
                </td>

                {/* <td>
                  <div className="badge-container">
                    {scale.days_off?.map((dateItem, index) => {
                      const weekdayInEnglish = moment(dateItem, "YYYY-MM-DD").format("dddd");
                      return (
                        <div key={index} className="badge text-bg-success">
                          {`${moment(dateItem).format("DD-MM-YYYY")} (${translateWeekday(weekdayInEnglish)})`}
                        </div>
                      )
                    })}
                  </div>
                </td> */}

                <td>
                  {/* Verificando se a proporção está presente e convertendo de string para objeto */}
                  <div className="proportions-container">
                    {scale.proportion && JSON.parse(scale.proportion)?.map((item, index) => {
                      const formattedDate = moment(item.data, "DD-MM-YYYY").format("DD-MM-YYYY");
                      const formattedWeekday = translateWeekday(item.weekday);
                      const proportion = item.proporcao;

                      return (
                        <div key={index} className="proportion-item">
                          {/* Exibindo no formato 'data (dia da semana - proporção)' */}
                          <div>{formattedDate} ({formattedWeekday} - {proportion})</div>
                        </div>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Plantão</h3>
        <div>{onDuty}</div>
      </div>

      <div>
        <h3>Assinaturas:</h3>
        {scalesList?.map((scale) => (
          <>
            <div key={scale.worker.id}>
              {scale.worker.name} __________________________________________________
            </div>
            <br></br>
          </>
        ))}
      </div>
    </div>
  )
}

export default printContent
