import axios from 'axios'
import { useEffect, useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import ReactSelect from "react-select"
import api from '../../services/api'

const ModifyWorkpointModal = (props) => {
  const { modifyWorkpointModalOpen, setModifyWorkpointModalOpen } = props

  const [subsidiariesOptions, setSubsidiariesOptions] = useState()

  const [workersOptions, setWorkersOptions] = useState()

  const [selectedSubsidiarie, setSelectedSubsidiarie] = useState()

  const [selectedWorker, setSelectedWorker] = useState()

  const [discountNote, setDiscountNote] = useState()

  const [discountsList, setDiscountsList] = useState()

  const [selectedFile, setSelectedFile] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState(null)

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    api
      .get(`/subsidiaries`)
      .then((response) => setSubsidiariesOptions(response.data.map((option) => ({ value: option.id, label: option.name }))))
  }, [])

  useEffect(() => {
    if (selectedSubsidiarie) {
      api
        .get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`)
        .then((response) => setWorkersOptions(response.data.map((option) => ({ value: option.worker_id, label: option.worker_name }))))
    }
  }, [selectedSubsidiarie])

  const handleClose = () => {
    setModifyWorkpointModalOpen(false)

    setSelectedSubsidiarie(null)

    setSelectedFile(null)

    setSelectedWorker(null)

    setDiscountNote(null)

    setDiscountsList(null)

    setError(null)

    setSuccess(false)

    setIsLoading(false)
  }

  const handleAddDiscount = () => {
    setDiscountsList((prev) => {
      if (prev) {
        return [...prev, { "worker": selectedWorker.label, "discountNote": discountNote }]
      } else {
        return [{ "worker": selectedWorker.label, "discountNote": discountNote }]
      }
    })
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])

    setError(null)

    setSuccess(false)
  }

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Por favor, selecione um arquivo Excel antes de enviar.')

      return
    }

    setIsLoading(true)

    setError(null)

    setSuccess(false)

    const formData = new FormData()

    formData.append('discountList', JSON.stringify(discountsList))

    formData.append('file', selectedFile)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/scripts/rhsheets`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))

      const link = document.createElement('a')

      link.href = url

      link.setAttribute('download', 'planilhas_ponto.xlsx')

      document.body.appendChild(link)

      link.click()

      link.remove()

      setSuccess(true)

      setTimeout(handleClose, 2000)
    } catch (err) {
      console.error('Erro ao enviar arquivo:', err)

      if (err.response) {
        if (err.response.status === 422) {
          setError('Formato de arquivo inválido. Por favor, envie um arquivo Excel válido.')
        } else {
          setError(`Erro ${err.response.status}: ${err.response.data?.message || 'Erro ao processar arquivo'}`)
        }
      } else if (err.request) {
        setError('Não foi possível conectar ao servidor. Verifique sua conexão.')
      } else {
        setError('Ocorreu um erro inesperado. Por favor, tente novamente.')
      }
    } finally {
      setIsLoading(false)
    }
  }

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

        {
          discountsList && (
            <>
              <div className="fw-bold mb-3">Descontos</div>
            </>
          )
        }

        {
          discountsList && discountsList.map((discount) => (
            <>
              <label className="form-label fw-bold">{discount.worker}</label>
              <input className="form-control mb-3" value={discount.discountNote} disabled />
            </>
          ))
        }

        <div className="mb-3">
          <label className="form-label fw-bold">Filiais:</label>

          <ReactSelect
            placeholder={""}
            options={subsidiariesOptions}
            onChange={(value) => setSelectedSubsidiarie(value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Colaborador:</label>

          <ReactSelect
            placeholder={""}
            options={workersOptions}
            onChange={(value) => setSelectedWorker(value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Desconto:</label>

          <div className="row">
            <div className="col-10">
              <input
                className="form-control"
                onChange={(e) => setDiscountNote(e.target.value)}
              />
            </div>

            <div className="col-2">
              <button className="btn btn-warning" onClick={handleAddDiscount}>
                <Plus />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Arquivo:</label>

          <input
            type="file"
            className="form-control"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose} disabled={isLoading}>Fechar</Button>

        <Button
          variant="success"
          onClick={handleSubmit}
          disabled={isLoading || !selectedFile}
        >
          {isLoading ? 'Enviando...' : 'Enviar Arquivo'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModifyWorkpointModal