import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import getFunctions from '../../requests/getFunctions'
import putFunction from '../../requests/putFunction'

const EditFunctionsModal = (props) => {
  const {
    editFunctionModalOpen,
    setEditFunctionModalOpen,
    selectedFunction,
    setFunctionsList
  } = props

  const [functionName, setFunctionName] = useState()

  const [functionDescription, setFunctionDescription] = useState()

  const handleClose = () => {
    setEditFunctionModalOpen(false)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    let formData = {
      name: functionName,
      description: functionDescription
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
