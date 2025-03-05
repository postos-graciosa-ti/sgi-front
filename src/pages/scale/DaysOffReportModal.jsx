import moment from 'moment';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Badge, Button, Card, Col, Container, Modal, Row, Spinner } from 'react-bootstrap';
import useUserSessionStore from '../../data/userSession';
import api from '../../services/api';

const TurnsRows = React.memo(({ turnReport, turnIndex }) => {
  const renderRoleBadge = useCallback((role, key, quantity, data) => (
    <Col xs={12} key={key}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Badge bg={key === 'caixas' ? 'info' : key === 'frentistas' ? 'warning' : 'secondary'}>
          {role}
        </Badge>
        <span className="fw-bold">{quantity}</span>
      </div>
      {data?.map((item, index) => (
        <div key={index} className="text-muted small">
          {item.name}
        </div>
      ))}
    </Col>
  ), []);

  return (
    <Col className="h-100 py-3" style={{ minWidth: '350px', maxWidth: '350px' }}>
      <div className="bg-white p-3 rounded-3 shadow-sm mb-3 sticky-top">
        <h5 className="mb-0">{turnReport[0].turn_info.name}</h5>
      </div>
      <div className="d-flex flex-column gap-3 pe-2" style={{ height: 'calc(100vh - 160px)', overflowY: 'auto' }}>
        {turnReport.slice(1).map((dayReport, dayIndex) => (
          <Card key={`${turnIndex}-${dayIndex}`} className="shadow-sm">
            <Card.Header className="py-2 bg-primary text-white">
              <strong>{dayReport.date}</strong>
            </Card.Header>
            <Card.Body className="p-3">
              <Row className="g-2">
                {['Caixas', 'Frentistas', 'Trocadores'].map((role, i) => {
                  const key = role.toLowerCase();
                  return renderRoleBadge(
                    role,
                    key,
                    dayReport[`quantidade_${key}`],
                    dayReport[`dados_${key}`]
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Col>
  );
});

const DaysOnReportModal = ({ show, onHide }) => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  const sortReportData = useCallback((data) => {
    return data.sort((a, b) => {
      const startA = moment(a[0].turn_info.start_time, 'HH:mm');
      const startB = moment(b[0].turn_info.start_time, 'HH:mm');
      const endA = moment(a[0].turn_info.end_time, 'HH:mm');
      const endB = moment(b[0].turn_info.end_time, 'HH:mm');
      return startA.isBefore(startB) ? -1 : startA.isAfter(startB) ? 1 : endA.isBefore(endB) ? -1 : 1;
    });
  }, []);

  useEffect(() => {
    if (!selectedSubsdiarie || !show) return;

    let isMounted = true;
    setLoading(true);
    const fetchData = async () => {
      try {
        const formData = {
          first_day: moment().startOf('week').format('DD-MM-YYYY'),
          last_day: moment().endOf('week').format('DD-MM-YYYY')
        };
        const response = await api.post(`/reports/subsidiaries/${selectedSubsdiarie.value}/scales/days-off`, formData);
        if (isMounted) {
          setReportData(sortReportData(response.data));
        }
      } catch (error) {
        console.error("Erro ao buscar relatório", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [show, selectedSubsdiarie, sortReportData]);

  const renderedTurns = useMemo(() => (
    reportData.map((turnReport, turnIndex) => (
      <TurnsRows key={turnIndex} turnReport={turnReport} turnIndex={turnIndex} />
    ))
  ), [reportData]);

  return (
    <Modal show={show} onHide={onHide} fullscreen centered scrollable className="modal-fullscreen">
      <Modal.Header closeButton className="bg-dark text-white border-bottom-0">
        <Modal.Title>Relatório de dias de folgas</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 bg-light">
        <Container fluid className="h-100">
          <Row className="h-100 flex-nowrap overflow-x-auto gx-3">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center w-100" style={{ height: '80vh' }}>
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              renderedTurns
            )}
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
          <Button variant="danger" onClick={onHide}>Fechar (ESC)</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DaysOnReportModal;
