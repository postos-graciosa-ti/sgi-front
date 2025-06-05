import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'

const NewNeighborhoodModal = (props) => {
  const { newNeighborhoodModalOpen, setNewNeighborhoodModalOpen, setNeighborhoodOptions } = props

  const [citiesOptions, setCitiesOptions] = useState()

  const [name, setName] = useState()

  const [selectedCity, setSelectedCity] = useState()

  useEffect(() => {
    api
      .get("/cities")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.Cities.id, label: option.Cities.name }))

        setCitiesOptions(options)
      })
  }, [])

  const handleClose = () => {
    api
      .get("/neighborhoods")
      .then((response) => {
        let options = response?.data.map((neighborhood) => ({ value: neighborhood.id, label: neighborhood.name, cityId: neighborhood.city_id }))

        setNeighborhoodOptions(options)
      })

    setNewNeighborhoodModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      "name": name,
      "city_id": selectedCity,
    }

    api
      .post("/neighborhoods", requestBody)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={newNeighborhoodModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">
            Nome
          </label>

          <input className="form-control" onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Cidade
          </label>

          <ReactSelect
            options={citiesOptions}
            onChange={(option) => setSelectedCity(option.value)}
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

export default NewNeighborhoodModal