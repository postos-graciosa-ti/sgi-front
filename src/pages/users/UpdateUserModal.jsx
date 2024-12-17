import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Select from 'react-select';
import getFunctions from '../../requests/getFunctions';
import getRoles from '../../requests/getRoles';
import getSubsidiaries from '../../requests/getSubsidiaries';
import putUser from '../../requests/putUser';

const EditUserModal = ({ editUserModalOpen, setEditUserModalOpen, selectedUser }) => {
  const [rolesList, setRolesList] = useState([]);
  const [functionsList, setFunctionsList] = useState([]);
  const [subsidiariesList, setSubsidiariesList] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState(null);
  const [functions, setFunctions] = useState(null);
  const [subsidiaries, setSubsidiaries] = useState([]);

  useEffect(() => {
    if (editUserModalOpen && selectedUser) {
      setEmail(selectedUser.user_email || '');
      setName(selectedUser.user_name || '');
      setRole({
        value: selectedUser.role_id,
        label: selectedUser.role_name,
      });
      setFunctions({
        value: selectedUser.function_id,
        label: selectedUser.function_name,
      });
      setSubsidiaries(
        selectedUser.subsidiaries?.map((subsidiary) => ({
          value: subsidiary.id,
          label: subsidiary.name,
        })) || []
      );
    }
  }, [editUserModalOpen, selectedUser]);

  useEffect(() => {
    fetchRoles();
    fetchFunctions();
    fetchSubsidiaries();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      const options = response.data.map((role) => ({
        value: role.id,
        label: role.name,
      }));
      setRolesList(options);
    } catch (error) {
      console.error('Erro ao buscar roles:', error);
    }
  };

  const fetchFunctions = async () => {
    try {
      const response = await getFunctions();
      const options = response.data.map((func) => ({
        value: func.id,
        label: func.name,
      }));
      setFunctionsList(options);
    } catch (error) {
      console.error('Erro ao buscar funções:', error);
    }
  };

  const fetchSubsidiaries = async () => {
    try {
      const response = await getSubsidiaries();
      const options = response.data.map((subsidiary) => ({
        value: subsidiary.id,
        label: subsidiary.name,
      }));
      setSubsidiariesList(options);
    } catch (error) {
      console.error('Erro ao buscar subsidiárias:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      name,
      role: role?.value,
      functions: functions?.value,
      subsidiaries: subsidiaries.map((sub) => sub.value),
    };
    try {
      await putUser(selectedUser?.user_id, formData);
      setEditUserModalOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  return (
    <Modal
      show={editUserModalOpen}
      onHide={() => setEditUserModalOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar usuário</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRole">
            <Form.Label>Função</Form.Label>
            <Select
              options={rolesList}
              value={role}
              onChange={setRole}
              placeholder="Selecione uma função"
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFunctions">
            <Form.Label>Cargo</Form.Label>
            <Select
              options={functionsList}
              value={functions}
              onChange={setFunctions}
              placeholder="Selecione um cargo"
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSubsidiaries">
            <Form.Label>Subsidiárias</Form.Label>
            <Select
              options={subsidiariesList}
              value={subsidiaries}
              onChange={setSubsidiaries}
              isMulti
              placeholder="Selecione as subsidiárias"
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditUserModalOpen(false)}>
            Fechar
          </Button>
          <Button type="submit" variant="primary">
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
