import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import loadStatesOptions from '../../requests/loadOptions/loadStatesOptions'
import api from '../../services/api'

const NewStateModal = (props) => {
  const { newStateModalOpen, setNewStateModalOpen, setStatesOptions } = props

  const [nationalityOptions, setNationalityOptions] = useState()

  const [name, setName] = useState()

  const [sail, setSail] = useState()

  const [selectedNationality, setSelectedNationality] = useState()

  useEffect(() => {
    api
      .get("/nationalities")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setNationalityOptions(options)
      })
  }, [])

  const handleClose = () => {
    loadStatesOptions(setStatesOptions)

    setName()

    setSail()

    setSelectedNationality()

    setNewStateModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      "name": name,
      "sail": sail,
      "nationalities_id": selectedNationality,
    }

    api
      .post("/states", requestBody)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={newStateModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Novo estado</Modal.Title>
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
            Sigla
          </label>

          <input className="form-control" onChange={(e) => setSail(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Nacionalidades
          </label>

          <ReactSelect
            options={nationalityOptions}
            onChange={(option) => setSelectedNationality(option.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewStateModal