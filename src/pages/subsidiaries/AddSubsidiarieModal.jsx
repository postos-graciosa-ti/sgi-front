import moment from 'moment'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import getSubsidiaries from '../../requests/getSubsidiaries'
import postSubsidiarie from '../../requests/postSubsidiarie'
import api from '../../services/api'
import useUserSessionStore from '../../data/userSession'

const AddSubsidiarieModal = (props) => {
  const {
    addSubsidiarieModalOpen,
    setAddSubsidiarieModalOpen,
    setSubsidiaries
  } = props

  const userSession = useUserSessionStore(state => state.userSession)

  const [name, setName] = useState()

  const [adress, setAdress] = useState()

  const [phone, setPhone] = useState()

  const [email, setEmail] = useState()

  const handleCloseModal = () => {
    getSubsidiaries()
      .then((response) => setSubsidiaries(response.data))

    setName()

    setAdress()

    setPhone()

    setEmail()

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

    postSubsidiarie(formData)
      .then((response) => {
        let logStr = `${userSession.name} adicionou ${response.data.name} (nome=${response.data.name}, endereço=${response.data.adress}, telefone=${response.data.phone}, email=${response.data.email})`

        let logFormData = {
          "log_str": logStr,
          "happened_at": moment(new Date()).format("DD-MM-YYYY"),
          "happened_at_time": moment(new Date()).format("HH:mm"),
          "user_id": userSession.id
        }

        api
          .post(`/subsidiaries/logs`, logFormData)
          .then(() => handleCloseModal())
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
