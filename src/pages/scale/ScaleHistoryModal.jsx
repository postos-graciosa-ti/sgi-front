import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useUserSessionStore from '../../data/userSession';
import api from '../../services/api';

const TurnCard = ({ report }) => {
  const frentistas = report.dados_frentistas || [];
  const trocadores = report.dados_trocadores || [];

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div>
          <b>{report.date && `Data: ${report.date}`}</b>
        </div>
        <div>
          <i>
            {report.quantidade_frentistas === 0 ? "Quantidade de frentistas: 0" : `Quantidade de frentistas: ${report.quantidade_frentistas}`}
          </i>
        </div>
        <div>
          <i>
            {report.quantidade_trocadores === 0 ? "Quantidade de trocadores de óleo: 0" : `Quantidade de trocadores de óleo: ${report.quantidade_trocadores}`}
          </i>
        </div>
        <div>
          <i>{report.status && `Status: ${report.status}`}</i>
        </div>
        {frentistas.length > 0 && (
          <div>
            <span>
              <i>
                <b>Frentistas:</b>
              </i>
            </span>
            <ul>
              {frentistas.map((frentista) => (
                <li key={frentista.dados.name}>{frentista.dados.name}</li>
              ))}
            </ul>
          </div>
        )}
        {trocadores.length > 0 && (
          <div>
            <span>
              <i>
                <b>Trocadores:</b>
              </i>
            </span>
            <ul>
              {trocadores.map((trocador) => (
                <li key={trocador.dados.name}>{trocador.dados.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const TurnColumn = ({ turnReport, turnName }) => {
  return (
    <div className="col">
      <h5>{turnName}</h5>
      {turnReport.map((report, index) => (
        <TurnCard key={index} report={report} />
      ))}
    </div>
  );
};

const ScaleHistoryModal = (props) => {
  const { scaleHistoryModalOpen, setScaleHistoryModalOpen } = props;
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie);

  let today = new Date();
  let monthLastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  const [validationResults, setValidationResults] = useState([]);
  const [report, setReport] = useState({});

  useEffect(() => {
    if (scaleHistoryModalOpen) {
      api
        .post(`/validate_monthly_scale/${selectedSubsdiarie.value}`, {
          "first_day": moment(today).format("DD-MM-YYYY"),
          "last_day": moment(monthLastDay).format("DD-MM-YYYY")
        })
        .then((response) => {
          setValidationResults(response.data.validation_results);
        });

      api
        .post(`/subsidiaries/${selectedSubsdiarie.value}/scales/report`, {
          "initial_date": moment(today).format("DD-MM-YYYY"),
          "final_date": moment(monthLastDay).format("DD-MM-YYYY")
        })
        .then((response) => {
          console.log(response.data);
          setReport(response.data);
        });
    }
  }, [scaleHistoryModalOpen]);

  return (
    <Modal
      show={scaleHistoryModalOpen}
      onHide={() => setScaleHistoryModalOpen(false)}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Relatório de dias {selectedSubsdiarie.label}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          {report.primeiro_turno_report && (
            <TurnColumn turnReport={report.primeiro_turno_report} turnName="06:00 - 14:00" />
          )}
          {report.segundo_turno_report && (
            <TurnColumn turnReport={report.segundo_turno_report} turnName="14:00 - 22:00" />
          )}
          {report.terceiro_turno_report && (
            <TurnColumn turnReport={report.terceiro_turno_report} turnName="22:00 - 06:00" />
          )}
          {report.quarto_turno_report && (
            <TurnColumn turnReport={report.quarto_turno_report} turnName="08:00 - 18:00" />
          )}
          {report.quinto_turno_report && (
            <TurnColumn turnReport={report.quinto_turno_report} turnName="14:00 - 22:00" />
          )}
          {report.sexto_turno_report && (
            <TurnColumn turnReport={report.sexto_turno_report} turnName="18:00 - 02:00" />
          )}
          {report.setimo_turno_report && (
            <TurnColumn turnReport={report.setimo_turno_report} turnName="06:00 - 15:00" />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => setScaleHistoryModalOpen(false)}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScaleHistoryModal;