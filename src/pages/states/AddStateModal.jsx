import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Input from "../../components/form/Input"
import Select from "../../components/form/Select"
import loadNationalitiesOptions from "../../requests/loadOptions/loadNationalitiesOptions"
import getStates from '../../requests/states/getStates'
import postStates from "../../requests/states/postStates"

const AddStateModal = (props) => {
  const { addStateModalOpen, setAddStateModalOpen, setStatesList } = props

  const [nationalitiesOptions, setNationalitiesOptions] = useState()

  const [name, setName] = useState()

  const [sail, setSail] = useState()

  const [selectedNationalitie, setSelectedNationalitie] = useState()

  useEffect(() => {
    loadNationalitiesOptions(setNationalitiesOptions)
  }, [])

  const handleClose = () => {
    getStates()
      .then((response) => setStatesList(response?.data))

    setName()

    setSail()

    setSelectedNationalitie()

    setAddStateModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      name: name,
      sail: sail,
      nationalities_id: selectedNationalitie?.value
    }

    postStates(formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={addStateModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar estado</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Input
          placeholder={"Nome"}
          type={"text"}
          setSelectedValue={setName}
        />

        <Input
          placeholder={"Sigla"}
          type={"text"}
          setSelectedValue={setSail}
        />

        <Select
          placeholder={"Nacionalidade"}
          options={nationalitiesOptions}
          setSelectedValue={setSelectedNationalitie}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddStateModal