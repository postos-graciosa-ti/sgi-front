import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'
import moment from 'moment'

const NewTicketModal = (props) => {
  const { newTicketModalOpen, setNewTicketModalOpen, setRequestingTicketsList } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const [responsibleOptions, setResponsibleOptions] = useState()

  const [servicesOptions, setServicesOptions] = useState()

  const [selectedResponsibles, setSelectedResponsibles] = useState()

  const [selectedService, setSelectedService] = useState()

  const [description, setDescription] = useState()

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        let options = response?.data.map((option) => ({ value: option.user_id, label: option.user_name }))

        setResponsibleOptions(options)
      })

    api
      .get("/services")
      .then((response) => {
        let options = response?.data.map((option) => ({ value: option.id, label: option.name }))

        setServicesOptions(options)
      })
  }, [])

  const handleClose = () => {
    api
      .get(`/tickets/requesting/${userSession?.id}`)
      .then((response) => setRequestingTicketsList(response.data))

    setSelectedResponsibles()

    setSelectedService()

    setDescription()

    setNewTicketModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      requesting_id: userSession?.id,
      responsibles_ids: selectedResponsibles?.map((responsible) => responsible.value),
      service: selectedService?.value,
      description: description,
      is_open: true,
      opened_at: moment().format("YYYY-MM-DD"),
    }

    api
      .post("/tickets", formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={newTicketModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Abrir novo chamado</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <ReactSelect
            placeholder={"Atribuir para"}
            options={responsibleOptions}
            isMulti={true}
            onChange={(value) => setSelectedResponsibles(value)}
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            placeholder={"Tipo"}
            options={servicesOptions}
            onChange={(value) => setSelectedService(value)}
          />
        </div>

        <div className="mb-3">
          <textarea
            placeholder="Descrição"
            className="form-control"
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewTicketModal