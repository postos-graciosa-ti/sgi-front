import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Input from "../../components/form/Input"
import getNationalities from '../../requests/nationalities/getNationalities'
import postNationalities from "../../requests/nationalities/postNationalities"

const AddNationalitieModal = (props) => {
  const { addNationalitieModalOpen, setAddNationalitieModalOpen, setNationalitiesList } = props

  const [name, setName] = useState()

  const handleClose = () => {
    getNationalities()
      .then((response) => setNationalitiesList(response?.data))

    setName()

    setAddNationalitieModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      name: name,
    }

    postNationalities(formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={addNationalitieModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar nacionalidade</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Input
          placeholder={"Nome"}
          type={"text"}
          setSelectedValue={setName}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddNationalitieModal