import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import useUserSessionStore from '../../data/userSession';
import api from '../../services/api';
import moment from 'moment';

const DaysOnReportModal = ({ show, onHide }) => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie);

  let monthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  let monthLastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  const [reportData, setReportData] = useState();

  const getStatusColor = (status) => {
    return status === 'trabalhadores suficientes' ? 'success' : 'danger';
  };

  useEffect(() => {
    api
      .post(`/reports/subsidiaries/${selectedSubsdiarie.value}/scales/days-on`, {
        "first_day": moment(monthFirstDay).format("DD-MM-YYYY"),
        "last_day": moment(monthLastDay).format("DD-MM-YYYY")
      })
      .then((response) => {
        const sortedData = response.data.sort((a, b) => {
          const startA = moment(a[0].turn_info.start_time, "HH:mm");
          const startB = moment(b[0].turn_info.start_time, "HH:mm");
          return startA - startB;
        });
        setReportData(sortedData);
      });
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      fullscreen
      centered
      scrollable
      className="modal-fullscreen"
    >
      <Modal.Header closeButton className="bg-dark text-white border-bottom-0">
        <Modal.Title>Relatório de dias de trabalho</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0 bg-light">
        <Container fluid className="h-100">
          <Row className="h-100 flex-nowrap overflow-x-auto gx-3">
            {reportData?.map((turnReport, turnIndex) => (
              <Col
                key={turnIndex}
                className="h-100 py-3"
                style={{ minWidth: '350px', maxWidth: '350px' }}
              >
                <div className="bg-white p-3 rounded-3 shadow-sm mb-3 sticky-top">
                  <h5 className="mb-0">
                    {turnReport[0].turn_info.name}
                  </h5>
                </div>

                <div
                  className="d-flex flex-column gap-3 pe-2"
                  style={{
                    height: 'calc(100vh - 160px)',
                    overflowY: 'auto'
                  }}
                >
                  {turnReport.slice(1).map((dayReport, dayIndex) => (
                    <Card key={`${turnIndex}-${dayIndex}`} className="shadow-sm">
                      <Card.Header className="py-2 bg-primary text-white">
                        <strong>{dayReport.date}</strong>
                      </Card.Header>

                      <Card.Body className="p-3">
                        <Row className="g-2">
                          {/* Caixas */}
                          <Col xs={12}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <Badge bg="info">Caixas</Badge>
                              <span className="fw-bold">
                                {dayReport.quantidade_caixas}
                              </span>
                            </div>
                            {dayReport.dados_caixas?.map((caixa, index) => (
                              <div key={index} className="text-muted small">
                                {caixa.name}
                              </div>
                            ))}
                          </Col>

                          {/* Frentistas */}
                          <Col xs={12}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <Badge bg="warning">Frentistas</Badge>
                              <span className="fw-bold">
                                {dayReport.quantidade_frentistas}
                              </span>
                            </div>
                            {dayReport.dados_frentistas?.map((frentista, index) => (
                              <div key={index} className="text-muted small">
                                {frentista.name}
                              </div>
                            ))}
                          </Col>

                          {/* Trocadores */}
                          <Col xs={12}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <Badge bg="secondary">Trocadores</Badge>
                              <span className="fw-bold">
                                {dayReport.quantidade_trocadores}
                              </span>
                            </div>
                            {dayReport.dados_trocadores?.map((trocador, index) => (
                              <div key={index} className="text-muted small">
                                {trocador.name}
                              </div>
                            ))}
                          </Col>

                          {/* Status */}
                          <Col xs={12} className="mt-3">
                            <Badge
                              bg={getStatusColor(dayReport.status)}
                              className="w-100 py-2"
                            >
                              {dayReport.status.toUpperCase()}
                            </Badge>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </Modal.Body>

      <Modal.Footer className="bg-white border-top-0 shadow-sm">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex gap-2 align-items-center">
            <Badge bg="info" className="py-2">Caixas</Badge>
            <Badge bg="warning" className="py-2">Frentistas</Badge>
            <Badge bg="secondary" className="py-2">Trocadores</Badge>
          </div>

          <div className="d-flex gap-2">
            <Button
              variant="danger"
              onClick={onHide}
            >
              Fechar (ESC)
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DaysOnReportModal;