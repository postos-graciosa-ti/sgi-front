import { Trash } from "react-bootstrap-icons";
import useUserSessionStore from "../../../data/userSession";
import api from "../../../services/api";

const ScaleRow = ({ 
  title, 
  scalesList, 
  functionId, 
  selectedWorker, 
  setScalesList, 
  setDaysOff 
}) => {
  const selectedSubsdiarie = useUserSessionStore((state) => state.selectedSubsdiarie);

  const translateWeekday = (weekday) => {
    const days = {
      Monday: "Segunda-Feira",
      Tuesday: "Terça-Feira",
      Wednesday: "Quarta-Feira",
      Thursday: "Quinta-Feira",
      Friday: "Sexta-Feira",
      Saturday: "Sábado",
      Sunday: "Domingo",
    };
    return days[weekday] || "";
  };

  const handleDelete = (scaleId) => {
    api.delete(`/scales/${scaleId}/subsidiaries/${selectedSubsdiarie.value}`)
      .then(() => {
        api.get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
          .then((response) => setScalesList(response.data));

        setDaysOff([]);

        api.get(`/scales/subsidiaries/${selectedSubsdiarie.value}/workers/${selectedWorker.value}`)
          .then((response) => {
            const scales = response.data;
            const options = scales.days_off?.map((scale) => scale.date) || [];
            setDaysOff(options);
          });
      });
  };

  const renderScaleRows = () => {
    const filteredScales = scalesList.filter((scale) => scale.worker.function.id === functionId);

    if (filteredScales.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="text-center text-muted py-5">
            <div>
              <i className="bi bi-info-circle-fill" style={{ fontSize: '2rem', color: '#f0ad4e' }}></i>
              <p className="mt-3">
                <strong>Não há registros de escala</strong> para a função "{title}".
              </p>
            </div>
          </td>
        </tr>
      );
    }

    return filteredScales.map((scale) => (
      <tr key={scale.id}>
        <td>
          <div>
            {scale.worker.name} | {scale.worker.function.name} | {scale.worker.turn.start_time} - {scale.worker.turn.end_time}
          </div>
        </td>

        <td>
          <div className="badge-container">
            {scale.days_on?.map((dayOn, index) => 
              dayOn.date && dayOn.weekday && (
                <span key={index} className="badge text-bg-success">
                  {`${dayOn.date} (${translateWeekday(dayOn.weekday)})`}
                </span>
              )
            )}
          </div>
        </td>

        <td>
          <div className="badge-container">
            {JSON.parse(scale.proportion).map((item, index) => (
              <span key={index} className="badge text-bg-danger">
                {`${item.data} (${translateWeekday(item.weekday)}): ${item.proporcao}`}
              </span>
            ))}
          </div>
        </td>

        <td>
          <div className="d-inline-flex">
            <button
              id="delete-scale"
              className="btn btn-danger mt-2 me-2"
              onClick={() => handleDelete(scale.id)}
              title="Excluir escala"
            >
              <Trash />
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="row">
      <div className="col-12">
        <h4>{title}</h4>

        <div className="table-responsive">
          <table className="table table-hover table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Colaborador</th>
                <th>Dias de trabalho</th>
                <th>Dias de folga</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {renderScaleRows()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScaleRow;
