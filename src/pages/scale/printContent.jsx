import moment from "moment";

const printContent = (scalesList, onDuty, startDate, endDate, selectedTurn, selectedFunction, selectedSubsdiarie, subsidiarieCnpj) => {
  const translateWeekday = (weekday) => ({
    Monday: "Segunda-Feira",
    Tuesday: "Terça-Feira",
    Wednesday: "Quarta-Feira",
    Thursday: "Quinta-Feira",
    Friday: "Sexta-Feira",
    Saturday: "Sábado",
    Sunday: "Domingo",
  })[weekday] || "";

  const formatDate = (date) => moment(date).format("DD-MM-YYYY");
  const formatWeekday = (date) => translateWeekday(moment(date, "YYYY-MM-DD").format("dddd"));
  const countSundays = (scale) => scale.days_off?.filter((dateItem) => moment(dateItem).format("dddd") === "Sunday").length || 0;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>

        <div style={{ marginLeft: '8px' }}>
          {selectedSubsdiarie?.label} | CNPJ: {subsidiarieCnpj}
        </div>
      </div>

      <div className="container" style={{ fontSize: '11px' }}>
        <h3 style={{ fontSize: '13px' }}>Escala de folgas de Colaboradores — {moment().format("MM/YYYY")}</h3>
        <p style={{ fontSize: '11px' }}>{selectedFunction?.label} (turno {selectedTurn?.label}): semana de {startDate} até {endDate}</p>

        {scalesList?.map((scale) => (
          <div key={scale.worker.name} style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '7px', fontSize: '11px' }}>{scale.worker.name}</div>

            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '11px' }}>Dias de trabalho:</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                {scale.days_on?.map((dateItem, index) => (
                  <div key={index} style={{ fontSize: '11px' }}>{`${formatDate(dateItem)} (${formatWeekday(dateItem)})`}</div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '7px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '11px' }}>Dias de folga:</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                {scale.proportion?.map((item, index) => (
                  <div key={index} style={{ fontSize: '11px' }}>{`${item.data} (${translateWeekday(item.weekday)} - ${item.proporcao})`}</div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div>
          <h3 style={{ fontSize: '13px' }}>Plantão</h3>
          
          <div style={{ fontSize: '11px' }}>{onDuty}</div>
        </div>

        <div>
          <h3 style={{ fontSize: '13px' }}>Assinaturas:</h3>

          {
            scalesList?.map((scale) => (
              <>
                <div key={scale.worker.id} style={{ fontSize: '11px' }}>
                  {scale.worker.name} ____________________
                </div>

                <br />
              </>
            ))
          }
        </div>
      </div>

      <div style={{ fontSize: '11px', marginTop: '10px', bottom: "0", position: "fixed", left: "0" }}>
        Emitido em {moment().format("DD-MM-YYYY")} {moment().format("HH:mm")}
      </div>
    </>
  );
};

export default printContent;