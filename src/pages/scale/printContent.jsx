import moment from "moment";

const printContent = (scalesList, onDuty, startDate, endDate, selectedTurn, selectedFunction) => {
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
    <div className="container" style={{ fontSize: '12px' }}>
      <h3 style={{ fontSize: '14px' }}>Escala de folgas de Colaboradores — {moment().format("MM/YYYY")}</h3>
      <p style={{ fontSize: '12px' }}>{selectedFunction?.label} (turno {selectedTurn?.label}): semana de {startDate} até {endDate}</p>

      {scalesList?.map((scale) => (
        <div key={scale.worker.name} style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '12px' }}>{scale.worker.name}</div>

          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '12px' }}>Dias de trabalho:</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
              {scale.days_on?.map((dateItem, index) => (
                <div key={index} style={{ fontSize: '12px' }}>{`${formatDate(dateItem)} (${formatWeekday(dateItem)})`}</div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '8px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '12px' }}>Dias de folga:</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
              {scale.proportion?.map((item, index) => (
                <div key={index} style={{ fontSize: '12px' }}>{`${item.data} (${translateWeekday(item.weekday)} - ${item.proporcao})`}</div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div>
        <h3 style={{ fontSize: '14px' }}>Plantão</h3>
        <div style={{ fontSize: '12px' }}>{onDuty}</div>
      </div>

      <div>
        <h3 style={{ fontSize: '14px' }}>Assinaturas:</h3>
        {scalesList?.map((scale) => (
          <div key={scale.worker.id} style={{ fontSize: '12px' }}>
            {scale.worker.name} ____________________
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default printContent;
