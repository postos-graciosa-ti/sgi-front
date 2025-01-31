import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import getFunctions from '../../requests/getFunctions'
import postFunction from '../../requests/postFunction'
import useUserSessionStore from '../../data/userSession'

const AddFunctionsModal = (props) => {
  const {
    addFunctionModalOpen,
    setAddFunctionModalOpen,
    setFunctionsList,
  } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [functionName, setFunctionName] = useState()

  const [functionDescription, setFunctionDescription] = useState()

  const [functionQuantity, setFunctionQuantity] = useState()

  const handleCloseModal = () => {
    setFunctionName()

    setFunctionDescription()

    setFunctionQuantity()

    setAddFunctionModalOpen(false)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    let formData = {
      name: functionName,
      description: functionDescription,
      ideal_quantity: functionQuantity,
      subsidiarie_id: selectedSubsdiarie.value
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
            <input type="text" className="form-control" placeholder="Nome" required onChange={(e) => setFunctionName(e.target.value)} />
          </div>

          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Descrição" required onChange={(e) => setFunctionDescription(e.target.value)} />
          </div>

          <div className="mb-3">
            <input type="number" className="form-control" placeholder="Quantidade ideal por turno" required onChange={(e) => setFunctionQuantity(e.target.value)} />
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
