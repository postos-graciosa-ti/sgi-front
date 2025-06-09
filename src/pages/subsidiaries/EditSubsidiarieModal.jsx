import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from 'react-select'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const EditSubsidiarieModal = (props) => {
  const {
    selectedSubsidiarie,
    editSubsidiarieModalOpen,
    setEditSubsidiarieModalOpen,
    setSubsidiaries,
    setSelectedSubsidiarie
  } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const [manager, setManager] = useState(null)

  const [usersOptions, setUsersOptions] = useState([])

  const [selectedUser, setSelectedUser] = useState(null)

  const [name, setName] = useState('')

  const [address, setAddress] = useState('')

  const [phone, setPhone] = useState('')

  const [email, setEmail] = useState('')

  useEffect(() => {
    api
      .get('/users')
      .then((response) => {
        let options = response?.data.map((user) => ({
          label: user.user_name,
          value: user.user_id,
        }))

        setUsersOptions(options)
      })

  }, [])

  const handleCloseModal = () => {
    api
      .get("/subsidiaries")
      .then((response) => setSubsidiaries(response.data))

    setManager(null)

    setSelectedUser(null)

    setSelectedSubsidiarie({})

    setName('')

    setAddress('')

    setPhone('')

    setEmail('')

    setEditSubsidiarieModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      name: name || selectedSubsidiarie?.name,
      adress: address || selectedSubsidiarie?.address,
      phone: phone || selectedSubsidiarie?.phone,
      email: email || selectedSubsidiarie?.email,
      coordinator: selectedUser?.value || selectedSubsidiarie?.coordinator,
      manager: manager?.value || selectedSubsidiarie?.manager,
    }

    api
      .put(`/subsidiaries/${selectedSubsidiarie.id}`, formData)
      .then(() => handleCloseModal())
  }

  return (
    <Modal show={editSubsidiarieModalOpen} onHide={handleCloseModal} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Filial</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <label className="mb-2"><b>Gerente</b></label>

            <ReactSelect
              options={usersOptions}
              placeholder="Gerente"
              defaultValue={usersOptions.find((user) => user.value === selectedSubsidiarie?.manager)}
              onChange={setManager}
            />
          </div>

          <div className="mb-3">
            <label className="mb-2"><b>Coordenador</b></label>

            <ReactSelect
              options={usersOptions}
              placeholder="Coordenador"
              defaultValue={usersOptions.find((user) => user.value === selectedSubsidiarie?.coordinator)}
              onChange={setSelectedUser}
            />
          </div>

          <div className="mb-3">
            <label className="mb-2"><b>Nome</b></label>

            <input
              type="text"
              className="form-control"
              placeholder="Nome"
              defaultValue={selectedSubsidiarie?.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="mb-2"><b>Endereço</b></label>

            <input
              type="text"
              className="form-control"
              placeholder="Endereço"
              defaultValue={selectedSubsidiarie?.adress}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="mb-2"><b>Telefone</b></label>

            <input
              type="text"
              className="form-control"
              placeholder="Telefone"
              defaultValue={selectedSubsidiarie?.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="mb-2"><b>E-mail</b></label>

            <input
              type="email"
              className="form-control"
              placeholder="E-mail"
              defaultValue={selectedSubsidiarie?.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleCloseModal}>Fechar</Button>

          <Button type="submit" variant="success">Editar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EditSubsidiarieModal;