import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from 'react-select'
import api from '../../services/api'

const TalentsDatabaseModal = (props) => {
  const {
    selectedApplicant,
    talentsDatabaseModalOpen,
    setTalentsDatabaseModalOpen,
    setDefaultTalentsDatabaseTurn,
    setDefaultTalentsDatabaseFunction,
  } = props

  const [subsidiariesOptions, setSubsidiariesOptions] = useState([])
  const [selectedSubsidiarieOption, setSelectedSubsidiarieOption] = useState(null)

  const [turnsOptions, setTurnsOptions] = useState([])
  const [selectedTurnOption, setSelectedTurnOption] = useState(null)

  const [functionsOptions, setFunctionsOptions] = useState([])
  const [selectedFunctionOption, setSelectedFunctionOption] = useState(null)

  useEffect(() => {
    api.get('/subsidiaries').then((response) => {
      const options = response.data.map((option) => ({
        value: option.id,
        label: option.name,
      }))
      setSubsidiariesOptions(options)
    })
  }, [])

  useEffect(() => {
    if (selectedSubsidiarieOption) {
      api
        .get(`/subsidiaries/${selectedSubsidiarieOption.value}/turns`)
        .then((response) => {
          const options = response.data.map((option) => ({
            value: option.id,
            label: option.name,
          }))
          setTurnsOptions(options)
        })

      api
        .get(`/subsidiaries/${selectedSubsidiarieOption.value}/functions`)
        .then((response) => {
          const options = response.data.map((option) => ({
            value: option.id,
            label: option.name,
          }))
          setFunctionsOptions(options)
        })
    } else {
      setTurnsOptions([])
      setFunctionsOptions([])
      setSelectedTurnOption(null)
      setSelectedFunctionOption(null)
    }
  }, [selectedSubsidiarieOption])

  useEffect(() => {
    if (selectedApplicant) {
      const { talents_database, talents_database_turn, talents_database_function } = selectedApplicant

      // Subsidiária
      if (talents_database) {
        const selected = subsidiariesOptions.find((opt) => opt.value === talents_database)
        setSelectedSubsidiarieOption(selected)
      }

      // Turno
      if (talents_database_turn) {
        api.get(`/turns/${talents_database_turn}`).then((response) => {
          const option = {
            value: response.data.id,
            label: response.data.name,
          }
          setDefaultTalentsDatabaseTurn(option)
          setSelectedTurnOption(option)
        })
      }

      // Função
      if (talents_database_function) {
        api.get(`/functions/${talents_database_function}`).then((response) => {
          const option = {
            value: response.data.id,
            label: response.data.name,
          }
          setDefaultTalentsDatabaseFunction(option)
          setSelectedFunctionOption(option)
        })
      }
    }
  }, [selectedApplicant, subsidiariesOptions])

  const handleClose = () => {
    setSelectedSubsidiarieOption(null)
    setSelectedTurnOption(null)
    setSelectedFunctionOption(null)
    setDefaultTalentsDatabaseTurn(null)
    setDefaultTalentsDatabaseFunction(null)
    setTalentsDatabaseModalOpen(false)
  }

  const handleSubmit = () => {
    const requestBody = {
      talents_database: selectedSubsidiarieOption?.value,
      talents_database_turn: selectedTurnOption?.value,
      talents_database_function: selectedFunctionOption?.value,
    }

    api.patch(`/applicants/${selectedApplicant?.id}`, requestBody).then(() => handleClose())
  }

  return (
    <Modal show={talentsDatabaseModalOpen} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Banco de Talentos</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <ReactSelect
            options={subsidiariesOptions}
            onChange={setSelectedSubsidiarieOption}
            value={selectedSubsidiarieOption}
            placeholder="Selecione a filial"
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            options={turnsOptions}
            onChange={setSelectedTurnOption}
            value={selectedTurnOption}
            placeholder="Selecione o turno"
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            options={functionsOptions}
            onChange={setSelectedFunctionOption}
            value={selectedFunctionOption}
            placeholder="Selecione a função"
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TalentsDatabaseModal
