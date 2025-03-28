import moment from 'moment'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const WorkerInfoModal = (props) => {
  const { workerInfoModalOpen, setWorkerInfoModalOpen, selectedWorker, setSelectedWorker } = props

  const handleClose = () => {
    setSelectedWorker()

    setWorkerInfoModalOpen(false)
  }

  return (
    <Modal
      show={workerInfoModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Informações de colaborador</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">E-social</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.esocial || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Matrícula</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.worker_enrolment || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Código de vendas</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.worker_sales_code || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Código de ponto</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.timecode || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Nome</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.worker_name || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Função</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.function_name || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Turno</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.turn_name || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Centro de custo</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.cost_center || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Setor</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.department || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Data de admissão</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={moment(selectedWorker?.admission_date).format("DD-MM-YYYY") || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Gênero</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.gender?.name || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Estado civil</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.civil_status?.name || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Logradouro</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.street || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Número</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.street_number || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Complemento</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.street_complement || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Bairro</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.neighborhood?.name || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">CEP</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.cep || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Cidade</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.city?.name || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Estado</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.state?.name || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Telefone</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.phone || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Celular</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.mobile || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">E-mail</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.email || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Etnia</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.ethnicity?.name || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Data de nascimento</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker && moment(selectedWorker?.birthdate).format("DD-MM-YYYY") || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Cidade de nascimento</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.birthcity || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Estado de nascimento</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.birthstate?.name || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Nome do pai</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.fathername || "Não consta registro"}
            disabled
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text fw-bold">Nome da mãe</span>

          <textarea
            className="form-control"
            aria-label="With textarea"
            rows={1}
            value={selectedWorker?.mothername || "Não consta registro"}
            disabled
          />
        </div>

        {
          !selectedWorker?.worker_is_active && (
            <div className="input-group mb-3">
              <span className="input-group-text fw-bold">Data de demissão</span>

              <textarea
                className="form-control"
                aria-label="With textarea"
                rows={1}
                value={selectedWorker?.resignation_date || "Não consta registro"}
                disabled
              />
            </div>
          )
        }

        {
          !selectedWorker?.worker_is_active && (
            <div className="input-group mb-3">
              <span className="input-group-text fw-bold">Razão de demissão</span>

              <textarea
                className="form-control"
                aria-label="With textarea"
                rows={1}
                value={selectedWorker?.resignation_reason_name || "Não consta registro"}
                disabled
              />
            </div>
          )
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WorkerInfoModal