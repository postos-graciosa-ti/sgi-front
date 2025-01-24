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

        {
          frentistas.length > 0 && (
            <div>
              <span>
                <i>
                  <b>Frentistas:</b>
                </i>
              </span>
              
              <ul>
                {frentistas.map((frentista) => (
                  <li key={frentista.dados.name}>{frentista.dados?.name || 'Nome não disponível'}</li>
                ))}
              </ul>
            </div>
          )
        }

        {
          trocadores.length > 0 && (
            <div>
              <span>
                <i>
                  <b>Trocadores:</b>
                </i>
              </span>

              <ul>
                {trocadores.map((trocador) => (
                  <li key={trocador.dados.name}>{trocador.dados?.name || 'Nome não disponível'}</li>
                ))}
              </ul>
            </div>
          )
        }
      </div>
    </div>
  );
};

const TurnColumn = ({ turnReport, turnName }) => {
  // Filtra os itens que não possuem turn_info
  const filteredReports = turnReport.filter(report => !report.turn_info);

  return (
    <div className="col">
      <h5>{turnName}</h5>
      {filteredReports.map((report, index) => (
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
          {report.primeiro_turno_report && report.primeiro_turno_report.length > 0 && report.primeiro_turno_report[0]?.turn_info?.name && (
            <TurnColumn turnReport={report.primeiro_turno_report} turnName={report.primeiro_turno_report[0].turn_info.name} />
          )}
          {report.segundo_turno_report && report.segundo_turno_report.length > 0 && report.segundo_turno_report[0]?.turn_info?.name && (
            <TurnColumn turnReport={report.segundo_turno_report} turnName={report.segundo_turno_report[0].turn_info.name} />
          )}
          {report.terceiro_turno_report && report.terceiro_turno_report.length > 0 && report.terceiro_turno_report[0]?.turn_info?.name && (
            <TurnColumn turnReport={report.terceiro_turno_report} turnName={report.terceiro_turno_report[0].turn_info.name} />
          )}
          {report.quarto_turno_report && report.quarto_turno_report.length > 0 && report.quarto_turno_report[0]?.turn_info?.name && (
            <TurnColumn turnReport={report.quarto_turno_report} turnName={report.quarto_turno_report[0].turn_info.name} />
          )}
          {report.quinto_turno_report && report.quinto_turno_report.length > 0 && report.quinto_turno_report[0]?.turn_info?.name && (
            <TurnColumn turnReport={report.quinto_turno_report} turnName={report.quinto_turno_report[0].turn_info.name} />
          )}
          {report.sexto_turno_report && report.sexto_turno_report.length > 0 && report.sexto_turno_report[0]?.turn_info?.name && (
            <TurnColumn turnReport={report.sexto_turno_report} turnName={report.sexto_turno_report[0].turn_info.name} />
          )}
          {report.setimo_turno_report && report.setimo_turno_report.length > 0 && report.setimo_turno_report[0]?.turn_info?.name && (
            <TurnColumn turnReport={report.setimo_turno_report} turnName={report.setimo_turno_report[0].turn_info.name} />
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