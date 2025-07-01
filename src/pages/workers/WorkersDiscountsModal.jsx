import { useEffect, useState } from 'react'
import { Plus } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'

const WorkersDiscountsModal = (props) => {
  const { selectedWorker, workersDiscountsModalOpen, setWorkersDiscountsModalOpen } = props

  const [workerDiscountsList, setWorkerDiscountsList] = useState()

  const [discountReasonsOptions, setDiscountReasonsOptions] = useState()

  const [selectedDiscountReasons, setSelectedDiscountReasons] = useState()

  const [discountValue, setDiscountValue] = useState()

  useEffect(() => {
    if (workersDiscountsModalOpen) {
      api
        .get(`/workers-discounts/${selectedWorker?.worker_id}`)
        .then((response) => {
          setWorkerDiscountsList(response.data)
        })

      api
        .get("/discounts-reasons")
        .then((response) => {
          let options = response.data.map((option) => ({ value: option.id, label: option.name }))

          setDiscountReasonsOptions(options)
        })
    }
  }, [workersDiscountsModalOpen])

  const handleClose = () => {
    setWorkersDiscountsModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      "worker_id": selectedWorker?.worker_id,
      "discount_reason_id": selectedDiscountReasons?.value,
      "value": discountValue,
    }

    api
      .post("/workers-discounts", requestBody)
      .then(() => {
        api
          .get(`/workers-discounts/${selectedWorker?.worker_id}`)
          .then((response) => {
            setWorkerDiscountsList(response.data)
          })
      })
  }

  return (
    <Modal
      show={workersDiscountsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Descontos de colaborador {selectedWorker?.worker_name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {
          workerDiscountsList && workerDiscountsList.map((discount, idx) => (
            <>
              <div className="bg-light rounded shadow p-4 mb-3">
                <div>
                  <h4>Desconto #0{idx + 1}</h4>
                </div>

                <div>
                  <b>Razão do Desconto</b>: {(discountReasonsOptions?.find((discountReason) => discountReason.value == discount.discount_reason_id))?.label}
                </div>

                <div>
                  <b>Valor do Desconto</b>: {discount.value}
                </div>
              </div>
            </>
          ))
        }

        <div className="bg-light rounded shadow p-4">
          <div>
            <h5>Novo Desconto</h5>
          </div>

          <div className="row mb-3">
            <div className="col">
              <ReactSelect
                placeholder={"Razão de Desconto"}
                options={discountReasonsOptions}
                onChange={(value) => setSelectedDiscountReasons(value)}
              />
            </div>

            <div className="col-auto">
              <button className="btn btn-warning" onClick={handleSubmit}>
                <Plus />
              </button>
            </div>
          </div>

          <div>
            <input
              placeholder="Valor do Desconto"
              type="text"
              className="form-control"
              onChange={(e) => setDiscountValue(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WorkersDiscountsModal