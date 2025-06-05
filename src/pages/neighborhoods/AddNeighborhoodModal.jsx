import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StateManagedSelect from 'react-select';
import api from "../../services/api";

const AddNeighborhoodModal = (props) => {
  const { addNeighborhoodModalOpen, setAddNeighborhoodModalOpen, setNeighborhoods } = props

  const [citiesOptions, setCitiesOptions] = useState()

  const [selectedCity, setSelectedCity] = useState()

  const [name, setName] = useState()

  useEffect(() => {
    api
      .get("/cities")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.Cities.id, label: option.Cities.name }))

        setCitiesOptions(options)
      })
  }, [addNeighborhoodModalOpen])

  const handleClose = () => {
    api
      .get("/neighborhoods")
      .then((response) => setNeighborhoods(response.data))

    setName()

    setSelectedCity()

    setAddNeighborhoodModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      "name": name,
      "city_id": selectedCity?.value,
    }

    api
      .post("/neighborhoods", formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={addNeighborhoodModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar bairro</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <input
              placeholder="Nome"
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <StateManagedSelect
            options={citiesOptions}
            placeholder={"Cidade"}
            onChange={(value) => setSelectedCity(value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Fechar</Button>

          <Button type="submit" variant="success">Confirmar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default AddNeighborhoodModal