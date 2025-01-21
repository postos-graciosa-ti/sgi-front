import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api';

const AddDepartmentModal = (props) => {
  const { addDepartmentModalOpen, setAddDepartmentModalOpen, setDepartmentsList } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    let formData = {
      name: name,
      description: description
    };

    try {
      await api.post("/departments", formData);
      const response = await api.get("/departments");
      setDepartmentsList(response.data);
      setAddDepartmentModalOpen(false);
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  return (
    <Modal
      show={addDepartmentModalOpen}
      onHide={() => setAddDepartmentModalOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar setor</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={() => setAddDepartmentModalOpen(false)}>Fechar</Button>
        
        <Button variant="success" onClick={handleSubmit}>Criar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDepartmentModal;