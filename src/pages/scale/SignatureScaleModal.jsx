import moment from 'moment'
import { useState } from 'react'
import { Printer, Search } from 'react-bootstrap-icons'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const SignatureScaleModal = (props) => {
  const { signatureScaleModalOpen, setSignatureScaleModalOpen, selectedScale, setSelectedScale } = props

  const [initialDate, setInitialDate] = useState()

  const [finalDate, setFinalDate] = useState()

  const [datesToPrint, setDatesToPrint] = useState()

  const handleSearchDates = () => {
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
    const printContent = document.getElementById("modalContent")

    const newWindow = window.open("", "_blank")

    newWindow.document.write(printContent.innerHTML)

    newWindow.document.close()

    newWindow.print()

    setDatesToPrint([])
  }

  return (
    <Modal
      show={signatureScaleModalOpen}
      onHide={() => {
        setSignatureScaleModalOpen(false)

        setDatesToPrint([])
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Imprimir Escala</Modal.Title>
      </Modal.Header>

      <Modal.Body id="modalContent">
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
              <div key={date.id} className="mt-4">
                <h3>{date.date}</h3>

                <div className="mt-3">
                  <h5>Trabalhando:</h5>
                  {date.workers_on.map(worker => (
                    <div key={worker.id} className="d-flex align-items-center mb-3">
                      <span>{worker.name}</span>
                      <div className="border-bottom border-dark ms-4" style={{ width: '200px' }}></div>
                    </div>
                  ))}
                </div>

                <div className="mt-3">
                  <h5>Folgando:</h5>
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
