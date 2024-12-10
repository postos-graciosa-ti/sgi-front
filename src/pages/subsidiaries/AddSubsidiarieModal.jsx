import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import postSubsidiarie from '../../requests/postSubsidiarie'
import getSubsidiaries from '../../requests/getSubsidiaries'

const AddSubsidiarieModal = (props) => {
  const {
    addSubsidiarieModalOpen,
    setAddSubsidiarieModalOpen,
    setSubsidiaries
  } = props

  const [name, setName] = useState()

  const [adress, setAdress] = useState()

  const [phone, setPhone] = useState()

  const [email, setEmail] = useState()

  const handleCloseModal = () => {
    setAddSubsidiarieModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      "name": name,
      "adress": adress,
      "phone": phone,
      "email": email
    }

    console.log(formData)

    postSubsidiarie(formData)
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
        show={addSubsidiarieModalOpen}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Adicionar filial
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Endereço"
                onChange={(e) => setAdress(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Telefone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="E-mail"
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
              Criar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddSubsidiarieModal
