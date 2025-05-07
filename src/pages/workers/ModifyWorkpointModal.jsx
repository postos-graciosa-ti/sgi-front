import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Modal, Spinner } from 'react-bootstrap';

const ModifyWorkpointModal = (props) => {
  const { modifyWorkpointModalOpen, setModifyWorkpointModalOpen } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setModifyWorkpointModalOpen(false);
    setSelectedFile(null);
    setError(null);
    setSuccess(false);
    setIsLoading(false);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Por favor, selecione um arquivo Excel antes de enviar.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/scripts/rhsheets`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      // Criar link para download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'planilha_atualizada.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSuccess(true);
      setTimeout(handleClose, 2000); // Fecha o modal após 2 segundos
    } catch (err) {
      console.error('Erro ao enviar arquivo:', err);
      if (err.response) {
        // Se o servidor respondeu com um status de erro
        if (err.response.status === 422) {
          setError('Formato de arquivo inválido. Por favor, envie um arquivo Excel válido.');
        } else {
          setError(`Erro ${err.response.status}: ${err.response.data?.message || 'Erro ao processar arquivo'}`);
        }
      } else if (err.request) {
        // Se a requisição foi feita mas não houve resposta
        setError('Não foi possível conectar ao servidor. Verifique sua conexão.');
      } else {
        // Outros erros
        setError('Ocorreu um erro inesperado. Por favor, tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={modifyWorkpointModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Atualizar Planilha de Ponto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
        {success && <Alert variant="success">Planilha processada com sucesso! O download começará automaticamente.</Alert>}

        <div className="mb-3">
          <label className="form-label">Selecione a planilha de ponto:</label>
          <input
            type="file"
            className="form-control"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            disabled={isLoading}
          />
          <div className="form-text">
            A planilha será processada e retornará com os códigos eSocial atualizados.
          </div>
        </div>

        {isLoading && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Processando...</span>
            </Spinner>
            <p>Processando arquivo, por favor aguarde...</p>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
          Fechar
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isLoading || !selectedFile}
        >
          {isLoading ? 'Enviando...' : 'Enviar Arquivo'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModifyWorkpointModal;