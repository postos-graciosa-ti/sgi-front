import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'

const AddCitiesModal = (props) => {
  const { addCitiesModalOpen, setAddCitiesModalOpen, setCitiesList } = props

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

    setName()

    setSelectedState()

    setAddCitiesModalOpen()
  }

  const handleSubmit = async () => {
    let formData = {
      name: name,
      state_id: selectedState?.value,
    }

    await api
      .post(`/new-city`, formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={addCitiesModalOpen}
      onHide={setAddCitiesModalOpen}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar cidade</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            placeholder={"Estado"}
            options={statesOptions}
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

export default AddCitiesModal