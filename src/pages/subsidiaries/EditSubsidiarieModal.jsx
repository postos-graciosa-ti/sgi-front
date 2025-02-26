import moment from 'moment';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactSelect from 'react-select';
import useUserSessionStore from '../../data/userSession';
import getSubsidiaries from '../../requests/getSubsidiaries';
import putSubsidiarie from '../../requests/putSubsidiarie';
import api from '../../services/api';

const EditSubsidiarieModal = ({
  selectedSubsidiarie,
  editSubsidiarieModalOpen,
  setEditSubsidiarieModalOpen,
  setSubsidiaries,
  setSelectedSubsidiarie
}) => {
  const userSession = useUserSessionStore((state) => state.userSession);
  const [manager, setManager] = useState(null);
  const [usersOptions, setUsersOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    api.get('/users').then((response) => {
      if (response?.data) {
        const options = response.data.map((user) => ({
          label: user.user_name,
          value: user.user_id,
        }));
        setUsersOptions(options);
      }
    });
  }, []);

  const handleCloseModal = () => {
    getSubsidiaries().then((response) => setSubsidiaries(response.data));
    setManager(null);
    setSelectedUser(null);
    setSelectedSubsidiarie({});
    setName('');
    setAddress('');
    setPhone('');
    setEmail('');
    setEditSubsidiarieModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: name || selectedSubsidiarie?.name,
      adress: address || selectedSubsidiarie?.address,
      phone: phone || selectedSubsidiarie?.phone,
      email: email || selectedSubsidiarie?.email,
      coordinator: selectedUser?.value || selectedSubsidiarie?.coordinator,
      manager: manager?.value || selectedSubsidiarie?.manager,
    };

    putSubsidiarie(selectedSubsidiarie.id, formData).then((response) => {
      const logStr = `${userSession.name} alterou ${selectedSubsidiarie.name} de (nome=${selectedSubsidiarie.name}, endereço=${selectedSubsidiarie.address}, telefone=${selectedSubsidiarie.phone}, email=${selectedSubsidiarie.email}) para ${response.data.name} (nome=${response.data.name}, endereço=${response.data.address}, telefone=${response.data.phone}, email=${response.data.email})`;

      const logFormData = {
        log_str: logStr,
        happened_at: moment().format('DD-MM-YYYY'),
        happened_at_time: moment().format('HH:mm'),
        user_id: userSession.id,
      };

      api.post('/subsidiaries/logs', logFormData).then(() => handleCloseModal());
    });
  };

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