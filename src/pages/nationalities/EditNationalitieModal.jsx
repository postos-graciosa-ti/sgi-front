import { useState } from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Input from "../../components/form/Input"
import getNationalities from "../../requests/nationalities/getNationalities"
import putNationalities from "../../requests/nationalities/putNationalities"

const EditNationalitieModal = (props) => {
  const { editNationalitieModalOpen, setEditNationalitieModalOpen, selectedNationalitie, setNationalitiesList, setSelectedNationalitie } = props

  const [name, setName] = useState()

  const handleClose = () => {
    getNationalities()
      .then((response) => setNationalitiesList(response?.data))

    setSelectedNationalitie()

    setName()

    setEditNationalitieModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      name: name
    }

    putNationalities(selectedNationalitie?.id, formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={editNationalitieModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar nacionalidade</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Input
          placeholder={"Nome"}
          type={"text"}
          setSelectedValue={setName}
          label={"Nome"}
          defaultValue={selectedNationalitie?.name}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditNationalitieModal