import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'

const AddOpenPositionModal = (props) => {
  const {
    addOpenPositionModalOpen,
    setAddOpenPositionModalOpen,
    setOpenPositionsList,
  } = props

  const [subsidiariesOptions, setSubsidiariesOptions] = useState()

  const [selectedSubsidiarie, setSelectedSubsidiarie] = useState()

  const [functionsOptions, setFunctionsOptions] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

  const [turnsOptions, setTurnsOptions] = useState()

  const [selectedTurn, setSelectedTurn] = useState()

  useEffect(() => {
    api
      .get("/subsidiaries")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setSubsidiariesOptions(options)
      })
  }, [addOpenPositionModalOpen])

  useEffect(() => {
    if (selectedSubsidiarie) {
      api
        .get(`/subsidiaries/${selectedSubsidiarie}/functions`)
        .then((response) => {
          let options = response.data.map((option) => ({ value: option.id, label: option.name }))

          setFunctionsOptions(options)
        })

      api
        .get(`/subsidiaries/${selectedSubsidiarie}/turns`)
        .then((response) => {
          let options = response.data.map((option) => ({ value: option.id, label: option.name }))

          setTurnsOptions(options)
        })
    }
  }, [selectedSubsidiarie])

  const handleClose = () => {
    api
      .get(`/open-positions`)
      .then((response) => setOpenPositionsList(response.data))

    setAddOpenPositionModalOpen(false)

    setSelectedFunction()

    setSelectedTurn()
  }

  const handleSubmit = () => {
    let requestBody = {
      subsidiarie_id: selectedSubsidiarie,
      function_id: selectedFunction,
      turn_id: selectedTurn,
    }

    api
      .post("/open-positions", requestBody)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={addOpenPositionModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Nova vaga</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">Filial</label>

          <ReactSelect
            options={subsidiariesOptions}
            onChange={(option) => setSelectedSubsidiarie(option.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Função</label>

          <ReactSelect
            options={functionsOptions}
            onChange={(option) => setSelectedFunction(option.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Turno</label>

          <ReactSelect
            options={turnsOptions}
            onChange={(option) => setSelectedTurn(option.value)}
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

export default AddOpenPositionModal