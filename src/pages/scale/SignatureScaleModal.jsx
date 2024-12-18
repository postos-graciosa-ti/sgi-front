import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api';
import ReactSelect from 'react-select';
import { Printer, Search } from 'react-bootstrap-icons';
import moment from 'moment';

const SignatureScaleModal = (props) => {
  const { signatureScaleModalOpen, setSignatureScaleModalOpen, selectedScale, setSelectedScale } = props

  const [initialDate, setInitialDate] = useState()

  const [finalDate, setFinalDate] = useState()

  const [datesToPrint, setDatesToPrint] = useState()

  const handleSearchDates = () => {
    console.log(initialDate, finalDate)

    let formData = {
      initial_date: `${moment(initialDate).format('DD/MM/YYYY')}`,
      final_date: `${moment(finalDate).format('DD/MM/YYYY')}`,
    }

    api
      .post(`/scales/date`, {
        initial_date: formData.initial_date,
        end_date: formData.final_date,
      })
      .then((response) => {
        setDatesToPrint(response.data)
      })
  }

  const handlePrint = () => {
    const printContent = document.getElementById("modalContent");
    const newWindow = window.open("", "_blank");
    newWindow.document.write(printContent.innerHTML);
    newWindow.document.close();
    newWindow.print();
  }


  return (
    <Modal
      show={signatureScaleModalOpen}
      onHide={() => setSignatureScaleModalOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Detalhes da Escala</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col">
            <input type="date" className="form-control" onChange={(e) => setInitialDate(e.target.value)} />
          </div>

          <div className="col">
            <input type="date" className="form-control" onChange={(e) => setFinalDate(e.target.value)} />
          </div>
        </div>

        {
          datesToPrint && (
            datesToPrint.map((date) => (
              <div id="modalContent" key={date.id} className="mt-4">
                <h3>{date.date}</h3>

                <div className="mt-3">
                  <h5>Trabalhadores Presentes:</h5>
                  {date.workers_on.map(worker => (
                    <div key={worker.id} className="d-flex align-items-center mb-3">
                      <span>{worker.name}</span>
                      <div className="border-bottom border-dark ms-4" style={{ width: '200px' }}></div>
                    </div>
                  ))}
                </div>

                <div className="mt-3">
                  <h5>Trabalhadores Ausentes:</h5>
                  {date.workers_off.map(worker => (
                    <div key={worker.id} className="d-flex align-items-center mb-3">
                      <span>{worker.name}</span>
                      <div className="border-bottom border-dark ms-4" style={{ width: '200px' }}></div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )
        }
      </Modal.Body>

      <Modal.Footer>
        <button className='btn btn-primary' onClick={handleSearchDates}>
          <Search />
        </button>

        <button className='btn btn-light' onClick={handlePrint}>
          <Printer />
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignatureScaleModal;
