import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactDOMServer from 'react-dom/server';
import ReactSelect from 'react-select';
import useUserSessionStore from '../../data/userSession';
import api from '../../services/api';
import printContent from './printContent';

const PrintModal = ({ printModalOpen, setPrintModalOpen }) => {
  const selectedSubsidiarie = useUserSessionStore((state) => state.selectedSubsdiarie);

  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [turnsOptions, setTurnsOptions] = useState([]);
  const [selectedTurn, setSelectedTurn] = useState(null);
  const [seeWorkers, setSeeWorkers] = useState(false);
  const [workersList, setWorkersList] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]);

  const indieScale = [
    { value: 1, label: 'Sim' },
    { value: 2, label: 'Não' },
  ];

  useEffect(() => {
    if (!selectedSubsidiarie?.value) return;

    api.get(`subsidiaries/${selectedSubsidiarie.value}/turns`).then((response) => {
      setTurnsOptions(
        response.data.map((turn) => ({ value: turn.id, label: turn.name }))
      );
    });
  }, [selectedSubsidiarie]);

  useEffect(() => {
    if (!selectedTurn?.value || !selectedSubsidiarie?.value) return;

    api.get(`/subsidiaries/${selectedSubsidiarie.value}/turns/${selectedTurn.value}/workers`).then((response) => {
      setWorkersList(
        response.data.map((worker) => ({ label: worker.name, value: worker.id }))
      );
    });
  }, [selectedTurn, selectedSubsidiarie]);

  const handleClose = () => {
    setInitialDate('');
    setFinalDate('');
    setSelectedTurn(null);
    setSelectedWorkers([]);
    setSeeWorkers(false);
    setPrintModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!initialDate || !finalDate || !selectedTurn) return;

    const formData = {
      start_date: moment(initialDate).format('DD-MM-YYYY'),
      end_date: moment(finalDate).format('DD-MM-YYYY'),
      turn_id: selectedTurn.value,
      workers_ids: selectedWorkers.map((worker) => worker.value),
    };

    try {
      const { data: scalesToPrint } = await api.post(
        `/subsidiaries/${selectedSubsidiarie.value}/scales/print`,
        formData
      );

      const { data: subsidiarieData } = await api.get(
        `/subsidiaries/${selectedSubsidiarie.value}`
      );

      const { data: coordinatorData } = await api.get(
        `/users/${subsidiarieData?.coordinator}`
      );

      let managerData = null;
      if (subsidiarieData?.manager) {
        const { data } = await api.get(`/users/${subsidiarieData.manager}`);
        managerData = data;
      }

      const onDuty = managerData
        ? `${managerData.name} (Gerente - ${managerData.phone}) / ${coordinatorData.name} (Coordenador - ${coordinatorData.phone})`
        : `${coordinatorData.name} (Coordenador - ${coordinatorData.phone})`;

      const printableContent = `
        <html>
          <head>
            <style>
              table, th, td { border: 1px solid black; border-collapse: collapse; }
              th, td { text-align: left; vertical-align: top; }
              
              @media print {
                @page {
                  size: landscape;
                }
              }
            </style>
          </head>
          <body>
            ${ReactDOMServer.renderToStaticMarkup(printContent(scalesToPrint, onDuty, formData.start_date, formData.end_date, selectedTurn))}
          </body>
        </html>
      `

      printJS({ printable: printableContent, type: 'raw-html' });
      handleClose();
    } catch (error) {
      console.error('Erro ao gerar a impressão:', error);
    }
  };

  return (
    <Modal show={printModalOpen} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Intervalo de dias para impressão</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <ReactSelect
            options={turnsOptions}
            placeholder="Selecione o turno para impressão"
            onChange={setSelectedTurn}
            value={selectedTurn}
          />
        </div>
        <div className="row">
          <div className="col">
            <input
              type="date"
              className="form-control"
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
            />
          </div>
        </div>
        <div className="my-3">
          <ReactSelect
            options={indieScale}
            placeholder="Escala individual"
            onChange={(option) => setSeeWorkers(option.value === 1)}
          />
        </div>
        {seeWorkers && (
          <div className="mb-3">
            <ReactSelect
              placeholder="Selecione colaboradores"
              isMulti
              options={workersList}
              onChange={setSelectedWorkers}
              value={selectedWorkers}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>
        <Button variant="success" onClick={handleSubmit}>Imprimir</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrintModal;