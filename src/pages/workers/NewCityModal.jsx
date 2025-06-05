import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'

const NewCityModal = (props) => {
  const { newCityModalOpen, setNewCityModalOpen, setCitiesOptions } = props

  const [statesOptions, setStatesOptions] = useState()

  const [name, setName] = useState()

  const [selectedState, setSelectedState] = useState()

  useEffect(() => {
    api
      .get("/states")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setStatesOptions(options)
      })
  }, [])

  const handleClose = () => {
    api
      .get("/cities")
      .then((response) => {
        let options = response?.data.map((option) => ({ value: option.Cities.id, label: option.Cities.name, stateId: option.Cities.state_id }))

        setCitiesOptions(options)
      })

    setNewCityModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      name: name,
      state_id: selectedState,
    }

    api
      .post("/new-city", requestBody)
      .then(() => {
        handleClose()
      })
  }

  return (
    <Modal
      show={newCityModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Nova cidade</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">
            Nome
          </label>

          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Estado
          </label>

          <ReactSelect
            options={statesOptions}
            onChange={(option) => setSelectedState(option.value)}
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

export default NewCityModal