import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import getSubsidiaries from "../../requests/getSubsidiaries"
import putSubsidiarie from '../../requests/putSubsidiarie'
import useUserSessionStore from '../../data/userSession'
import moment from 'moment'
import api from '../../services/api'

const EditSubsidiarieModal = (props) => {
  const {
    selectedSubsidiarie,
    editSubsidiarieModalOpen,
    setEditSubsidiarieModalOpen,
    setSubsidiaries,
    setSelectedSubsidiarie
  } = props

  const userSession = useUserSessionStore(state => state.userSession)

  const [name, setName] = useState()

  const [adress, setAdress] = useState()

  const [phone, setPhone] = useState()

  const [email, setEmail] = useState()

  const handleCloseModal = () => {
    getSubsidiaries()
      .then((response) => setSubsidiaries(response.data))

    setSelectedSubsidiarie({})

    setName()

    setAdress()

    setPhone()

    setEmail()

    setEditSubsidiarieModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      "name": name || selectedSubsidiarie.name,
      "adress": adress || selectedSubsidiarie.adress,
      "phone": phone || selectedSubsidiarie.phone,
      "email": email || selectedSubsidiarie.email
    }

    putSubsidiarie(selectedSubsidiarie.id, formData)
      .then((response) => {
        let logStr = `${userSession.name} alterou ${selectedSubsidiarie.name} de (nome=${selectedSubsidiarie.name}, endereço=${selectedSubsidiarie.adress}, telefone=${selectedSubsidiarie.phone}, email=${selectedSubsidiarie.email}) para ${response.data.name} (nome=${response.data.name}, endereço=${response.data.adress}, telefone=${response.data.phone}, email=${response.data.email})`

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
              <label className='mb-2'><b>Nome</b></label>

              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                defaultValue={selectedSubsidiarie && selectedSubsidiarie.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className='mb-2'><b>Endereço</b></label>

              <input
                type="text"
                className="form-control"
                placeholder="Endereço"
                defaultValue={selectedSubsidiarie && selectedSubsidiarie.adress}
                onChange={(e) => setAdress(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className='mb-2'><b>Telefone</b></label>

              <input
                type="text"
                className="form-control"
                placeholder="Telefone"
                defaultValue={selectedSubsidiarie && selectedSubsidiarie.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className='mb-2'><b>E-mail</b></label>

              <input
                type="text"
                className="form-control"
                placeholder="E-mail"
                defaultValue={selectedSubsidiarie && selectedSubsidiarie.email}
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
