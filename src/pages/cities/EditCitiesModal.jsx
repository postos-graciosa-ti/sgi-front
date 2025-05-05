import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'

const EditCitiesModal = (props) => {
  const { editCitiesModalOpen, setEditCitiesModalOpen, selectedCity, setSelectedCity, setCitiesList } = props

  const [name, setName] = useState()

  const [statesOptions, setStatesOptions] = useState()

  const [selectedState, setSelectedState] = useState()

  useEffect(() => {
    api
      .get("/states")
      .then((response) => {
        let options = response?.data.map((option) => ({ value: option?.id, label: option?.name }))

        setStatesOptions(options)
      })
  }, [])

  const handleClose = () => {
    api
      .get("/cities")
      .then((response) => setCitiesList(response?.data))

    setSelectedCity()

    setName()

    setSelectedState()

    setEditCitiesModalOpen(false)
  }

  const handleSubmit = async () => {
    await api
      .put(`/cities/${selectedCity?.Cities?.id}`, { name: name || selectedCity.Cities.name, state_id: selectedState?.value || selectedCity.States.id })
      .then(() => handleClose())
  }

  return (
    <Modal
      show={editCitiesModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar cidade</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <input
            className="form-control"
            defaultValue={selectedCity?.Cities?.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            placeholder={"Estados"}
            options={statesOptions}
            defaultValue={statesOptions?.find((option) => option.value == selectedCity?.States?.id)}
            onChange={(value) => setSelectedState(value)}
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

export default EditCitiesModal