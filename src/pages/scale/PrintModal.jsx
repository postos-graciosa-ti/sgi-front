import moment from "moment";
import printJS from "print-js";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactDOMServer from 'react-dom/server';
import ReactSelect from "react-select";
import useUserSessionStore from "../../data/userSession";
import api from "../../services/api";

// const PrintContent = (scales, initialDate, endDate) => {
//   return (
//     <>
//       <div className="container">
//         <h5>Escala de folgas ({initialDate} até {endDate})</h5>

//         <div className="row gap-2">
//           <div className="col">
//             {
//               scales &&
//               scales.primeiro_turno_folgas &&
//               scales.primeiro_turno_folgas.map((firstTurn) => (
//                 <>
//                   <div>
//                     {firstTurn.turn_info && `${firstTurn.turn_info.start_time} - ${firstTurn.turn_info.end_time}`}
//                   </div>

//                   <div className="card mb-2">
//                     <div>
//                       {firstTurn && firstTurn.date}
//                     </div>

//                     <div>
//                       {firstTurn.frentistas && firstTurn.frentistas.map((frentista) => (
//                         <>
//                           <span>Frentistas:</span>

//                           <div>
//                             {frentista.name} __________
//                           </div>
//                         </>
//                       ))}
//                     </div>

//                     <div>
//                       {firstTurn.trocadores && firstTurn.trocadores.map((trocador) => (
//                         <>
//                           <span>Trocadores:</span>

//                           <div>
//                             {trocador.name} __________
//                           </div>
//                         </>
//                       ))}
//                     </div>
//                   </div>
//                 </>
//               ))
//             }
//           </div>

//           <div className="col">
//             {
//               scales &&
//               scales.segundo_turno_folgas &&
//               scales.segundo_turno_folgas.map((secondTurn) => (
//                 <>
//                   <div>
//                     {secondTurn.turn_info && `${secondTurn.turn_info.start_time} - ${secondTurn.turn_info.end_time}`}
//                   </div>

//                   <div className="card mb-2">
//                     <div>
//                       {secondTurn && secondTurn.date}
//                     </div>

//                     <div>
//                       {secondTurn.frentistas && secondTurn.frentistas.map((frentista) => (
//                         <>
//                           <span>Frentistas:</span>

//                           <div>
//                             {frentista.name} __________
//                           </div>
//                         </>
//                       ))}
//                     </div>

//                     <div>
//                       {secondTurn.trocadores && secondTurn.trocadores.map((trocador) => (
//                         <>
//                           <span>Trocadores:</span>

//                           <div>
//                             {trocador.name} __________
//                           </div>
//                         </>
//                       ))}
//                     </div>
//                   </div>
//                 </>
//               ))
//             }
//           </div>

//           <div className="col">
//             {
//               scales &&
//               scales.terceiro_turno_folgas &&
//               scales.terceiro_turno_folgas.map((thirdTurn) => (
//                 <>
//                   <div>
//                     {thirdTurn.turn_info && `${thirdTurn.turn_info.start_time} - ${thirdTurn.turn_info.end_time}`}
//                   </div>

//                   <div className="card mb-2">
//                     <div>
//                       {thirdTurn && thirdTurn.date}
//                     </div>

//                     <div>
//                       {thirdTurn.frentistas && thirdTurn.frentistas.map((frentista) => (
//                         <>
//                           <span>Frentistas:</span>

//                           <div>
//                             {frentista.name} __________
//                           </div>
//                         </>
//                       ))}
//                     </div>

//                     <div>
//                       {thirdTurn.trocadores && thirdTurn.trocadores.map((trocador) => (
//                         <>
//                           <span>Trocadores:</span>

//                           <div>
//                             {trocador.name} __________
//                           </div>
//                         </>
//                       ))}
//                     </div>
//                   </div>
//                 </>
//               ))
//             }
//           </div>
//         </div>

//         <h6>Assinaturas:</h6>
//       </div>
//     </>
//   )
// }

const PrintContent = (scales, initialDate, endDate) => {
  // Função para verificar se há frentistas ou trocadores em um turno
  const hasStaff = (turn) => {
    return (turn.frentistas && turn.frentistas.length > 0) || (turn.trocadores && turn.trocadores.length > 0);
  };

  // Função para exibir frentistas e trocadores
  const renderStaff = (label, staff) => (
    <>
      <span>{label}:</span>
      {staff.map((person) => (
        <div key={person.name}>
          {person.name}
        </div>
      ))}
    </>
  );

  // Coletar todos os frentistas e trocadores
  const allStaff = new Set();
  scales?.primeiro_turno_folgas?.forEach(turno => {
    turno.frentistas?.forEach(f => allStaff.add(f.name));
    turno.trocadores?.forEach(t => allStaff.add(t.name));
  });
  scales?.segundo_turno_folgas?.forEach(turno => {
    turno.frentistas?.forEach(f => allStaff.add(f.name));
    turno.trocadores?.forEach(t => allStaff.add(t.name));
  });
  scales?.terceiro_turno_folgas?.forEach(turno => {
    turno.frentistas?.forEach(f => allStaff.add(f.name));
    turno.trocadores?.forEach(t => allStaff.add(t.name));
  });

  return (
    <>
      <div className="container">
        <h5>Escala de folgas ({initialDate} até {endDate})</h5>

        <div className="row gap-2">
          <div className="col">
            {scales?.primeiro_turno_folgas?.map((firstTurn) => (
              hasStaff(firstTurn) && (
                <div key={firstTurn.date}>
                  <div>
                    {firstTurn.turn_info && `${firstTurn.turn_info.start_time} - ${firstTurn.turn_info.end_time}`}
                  </div>
                  <div className="card mb-2">
                    <div>
                      {firstTurn.date}
                    </div>
                    <div>
                      {firstTurn.frentistas && renderStaff('Frentistas', firstTurn.frentistas)}
                    </div>
                    <div>
                      {firstTurn.trocadores && renderStaff('Trocadores', firstTurn.trocadores)}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="col">
            {scales?.segundo_turno_folgas?.map((secondTurn) => (
              hasStaff(secondTurn) && (
                <div key={secondTurn.date}>
                  <div>
                    {secondTurn.turn_info && `${secondTurn.turn_info.start_time} - ${secondTurn.turn_info.end_time}`}
                  </div>
                  <div className="card mb-2">
                    <div>
                      {secondTurn.date}
                    </div>
                    <div>
                      {secondTurn.frentistas && renderStaff('Frentistas', secondTurn.frentistas)}
                    </div>
                    <div>
                      {secondTurn.trocadores && renderStaff('Trocadores', secondTurn.trocadores)}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="col">
            {scales?.terceiro_turno_folgas?.map((thirdTurn) => (
              hasStaff(thirdTurn) && (
                <div key={thirdTurn.date}>
                  <div>
                    {thirdTurn.turn_info && `${thirdTurn.turn_info.start_time} - ${thirdTurn.turn_info.end_time}`}
                  </div>
                  <div className="card mb-2">
                    <div>
                      {thirdTurn.date}
                    </div>
                    <div>
                      {thirdTurn.frentistas && renderStaff('Frentistas', thirdTurn.frentistas)}
                    </div>
                    <div>
                      {thirdTurn.trocadores && renderStaff('Trocadores', thirdTurn.trocadores)}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        <h6>Assinaturas:</h6>
        <div>
          {Array.from(allStaff).map((name) => (
            <div key={name}>
              {name} ________________________
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const PrintModal = (props) => {
  const { printModalOpen, setPrintModalOpen } = props;
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie);
  const [initialDate, setInitialDate] = useState();
  const [finalDate, setFinalDate] = useState();
  const [printStyle, setPrintStyle] = useState();

  const printOptions = [
    { "label": "relatório por turno", "value": 1 },
    { "label": "relatório simples", "value": 2 }
  ];

  const handleSubmit = async () => {
    let formData = {
      "initial_date": moment(initialDate).format("DD-MM-YYYY"),
      "end_date": moment(finalDate).format("DD-MM-YYYY")
    };

    try {
      const response = await api.post(
        `/subsidiaries/${selectedSubsdiarie.value}/prints/${printStyle.value}/scales`,
        formData
      );

      const bootstrapCSS = await fetch(
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
      ).then(res => res.text());

      const printableContent = `
        <html>
          <head>
            <style>
              ${bootstrapCSS}
              @media print {
                .container { width: 100% !important; }
                .row, .col { margin: 0; padding: 0; }
                .card { page-break-inside: avoid; }
              }
            </style>
          </head>
          <body>
            ${ReactDOMServer.renderToStaticMarkup(PrintContent(response.data, formData.initial_date, formData.end_date))}
          </body>
        </html>
      `;

      printJS({
        printable: printableContent,
        type: 'raw-html',
      });
    } catch (error) {
      console.error("Erro ao gerar o conteúdo para impressão:", error);
    }
  };

  return (
    <Modal
      show={printModalOpen}
      onHide={() => setPrintModalOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Selecione o dia e tipo de impressão</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col">
            <input
              type="date"
              className="form-control"
              onChange={(e) => setInitialDate(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              onChange={(e) => setFinalDate(e.target.value)}
            />
          </div>
          <div className="col">
            <ReactSelect
              options={printOptions}
              onChange={(value) => setPrintStyle(value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => setPrintModalOpen(false)}>Fechar</Button>
        <Button variant="success" onClick={handleSubmit}>Imprimir</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrintModal;
