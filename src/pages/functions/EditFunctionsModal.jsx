import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import getFunctions from '../../requests/getFunctions'
import putFunction from '../../requests/putFunction'
import useUserSessionStore from '../../data/userSession'

const EditFunctionsModal = (props) => {
  const {
    editFunctionModalOpen,
    setEditFunctionModalOpen,
    selectedFunction,
    setFunctionsList,
    setSelectedFunction
  } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [functionName, setFunctionName] = useState()

  const [functionDescription, setFunctionDescription] = useState()

  const [functionQuantity, setFunctionQuantity] = useState()

  const handleClose = () => {
    setFunctionName()

    setFunctionDescription()

    setFunctionQuantity()

    setSelectedFunction({})

    setEditFunctionModalOpen(false)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    let formData = {
      name: functionName || selectedFunction?.name,
      description: functionDescription || selectedFunction?.description,
      ideal_quantity: functionQuantity || selectedFunction?.ideal_quantity,
      subsidiarie_id: selectedSubsdiarie.value
    }

    putFunction(selectedFunction.id, formData)
      .then(() => {
        getFunctions()
          .then((response) => setFunctionsList(response.data))

        handleClose()
      })
  }

  return (
    <Modal
      show={editFunctionModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar função</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleOnSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <input type="text" className="form-control" defaultValue={selectedFunction?.name} onChange={(e) => setFunctionName(e.target.value)} />
          </div>

          <div className="mb-3">
            <input type="text" className="form-control" defaultValue={selectedFunction?.description} onChange={(e) => setFunctionDescription(e.target.value)} />
          </div>

          <div className="mb-3">
            <input type="number" className="form-control" defaultValue={selectedFunction?.ideal_quantity} placeholder="Quantidade ideal por turno" required onChange={(e) => setFunctionQuantity(e.target.value)} />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Fechar
          </Button>

          <Button type="submit" variant="success">
            Editar
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default EditFunctionsModal
