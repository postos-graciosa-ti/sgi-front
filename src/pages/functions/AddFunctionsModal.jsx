import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import getFunctions from '../../requests/getFunctions'
import postFunction from '../../requests/postFunction'

const AddFunctionsModal = (props) => {
  const {
    addFunctionModalOpen,
    setAddFunctionModalOpen,
    setFunctionsList,
  } = props

  const [functionName, setFunctionName] = useState()

  const [functionDescription, setFunctionDescription] = useState()

  const handleCloseModal = () => {
    setAddFunctionModalOpen(false)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    let formData = {
      name: functionName,
      description: functionDescription
    }

    postFunction(formData)
      .then(() => {
        getFunctions()
          .then((response) => setFunctionsList(response.data))

        handleCloseModal()
      })
  }

  return (
    <Modal
      show={addFunctionModalOpen}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar função</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleOnSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Nome" onChange={(e) => setFunctionName(e.target.value)} />
          </div>

          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Descrição" onChange={(e) => setFunctionDescription(e.target.value)} />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleCloseModal}>
            Fechar
          </Button>

          <Button type="submit" variant="success">
            Salvar
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default AddFunctionsModal
