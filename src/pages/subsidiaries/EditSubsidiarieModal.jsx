import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import getSubsidiaries from "../../requests/getSubsidiaries"
import putSubsidiarie from '../../requests/putSubsidiarie'

const EditSubsidiarieModal = (props) => {
  const {
    selectedSubsidiarie,
    editSubsidiarieModalOpen,
    setEditSubsidiarieModalOpen,
    setSubsidiaries
  } = props

  const [name, setName] = useState()

  const [adress, setAdress] = useState()

  const [phone, setPhone] = useState()

  const [email, setEmail] = useState()

  const handleCloseModal = () => {
    setEditSubsidiarieModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      "name": name,
      "adress": adress,
      "phone": phone,
      "email": email
    }

    putSubsidiarie(selectedSubsidiarie.id, formData)
      .then(() => {
        getSubsidiaries()
          .then((response) => {
            setSubsidiaries(response.data)
            handleCloseModal()
          })
      })
  }

  return (
    <>
      <Modal
        show={editSubsidiarieModalOpen}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Editar filial
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                defaultValue={selectedSubsidiarie && selectedSubsidiarie.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Endereço"
                defaultValue={selectedSubsidiarie && selectedSubsidiarie.adress}
                onChange={(e) => setAdress(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Telefone"
                defaultValue={selectedSubsidiarie && selectedSubsidiarie.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="E-mail"
                defaultValue={selectedSubsidiarie && selectedSubsidiarie.phone}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="light"
              onClick={handleCloseModal}
            >
              Fechar
            </Button>

            <Button
              type="submit"
              variant="success"
            >
              Editar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default EditSubsidiarieModal
