import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Input from '../../components/form/Input'
import Select from '../../components/form/Select'
import loadNationalitiesOptions from '../../requests/loadOptions/loadNationalitiesOptions'
import getStates from '../../requests/states/getStates'
import putStates from '../../requests/states/putStates'

const EditStateModal = (props) => {
  const { editStateModalOpen, setEditStateModalOpen, selectedState, setSelectedState, setStatesList } = props

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

    setSelectedState()

    setName()

    setSail()

    setSelectedNationalitie()

    setEditStateModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      name: name,
      sail: sail,
      nationalities_id: selectedNationalitie?.value
    }

    putStates(selectedState?.id, formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={editStateModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar estado</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Input
          placeholder={"Nome"}
          type={"text"}
          setSelectedValue={setName}
          label={"Nome"}
          defaultValue={selectedState?.name}
        />

        <Input
          placeholder={"Sigla"}
          type={"text"}
          setSelectedValue={setSail}
          label={"Sigla"}
          defaultValue={selectedState?.sail}
        />

        <Select
          placeholder={"Nacionalidade"}
          options={nationalitiesOptions}
          setSelectedValue={setSelectedNationalitie}
          defaultValue={nationalitiesOptions?.find((nationalitie) => nationalitie.id == selectedState?.nationalities_id)}
          label={"Nacionalidade"}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Editar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditStateModal