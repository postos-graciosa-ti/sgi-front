import axios from 'axios'
import { useEffect, useState } from 'react'
import { CameraFill, Trash } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
import Select from '../../components/form/Select'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'
import DigitalizeDocsModal from './DigitalizeDocsModal'

const WorkerDocsModal = (props) => {
  const { workerDocsModalOpen, setWorkerDocsModalOpen, selectedWorker, setSelectedWorker, setWorkersList } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [docsList, setDocsList] = useState()

  const [workerPicture, setWorkerPicture] = useState()

  const [docs, setDocs] = useState([])

  const [docTitles, setDocTitles] = useState({})

  const [digitalizeDocsModalOpen, setDigitalizeDocsModalOpen] = useState(false)

  useEffect(() => {
    if (!workerDocsModalOpen) return

    api
      .get(`/worker-pdfs/${selectedWorker?.worker_id}`)
      .then((response) => setDocsList(response.data))

    api
      .get(`/workers-pictures/${selectedWorker?.worker_id}`)
      .then((response) => setWorkerPicture(response.data))
  }, [workerDocsModalOpen, selectedWorker?.worker_id])

  const handleClose = () => {
    api
      .get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`)
      .then((response) => {
        let allWorkers = response.data

        let statusWorkers = allWorkers.filter((worker) => worker.worker_is_active == true && worker.is_away == false)

        let sortStatusWorkers = statusWorkers.sort()

        setWorkersList(sortStatusWorkers)
      })

    setDocs([])
    setDocTitles({})
    setWorkerPicture()
    setSelectedWorker()
    setWorkerDocsModalOpen(false)
  }

  const handleFilesSelected = (files) => {
    setDocs(prev => [...prev, ...Array.from(files)])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(e.dataTransfer.files)
      e.dataTransfer.clearData()
    }
  }

  const removeFile = (fileName) => {
    setDocs(prev => prev.filter(f => f.name !== fileName))
    setDocTitles(prev => {
      const copy = { ...prev }
      delete copy[fileName]
      return copy
    })
  }

  const handleDocTitleChange = (fileName, selected) => {
    setDocTitles(prev => ({ ...prev, [fileName]: selected }))
  }

  const handleSubmit = async () => {
    if (docs.length === 0) {
      Swal.fire("Aviso", "Selecione ao menos um arquivo para enviar.", "warning")
      return
    }

    for (const docFile of docs) {
      const titleObj = docTitles[docFile.name]
      if (!titleObj) {
        Swal.fire("Aviso", `Informe o título para o arquivo ${docFile.name}`, "warning")
        return
      }

      if (titleObj.label === "Foto") {
        const formData = new FormData()
        formData.append("file", docFile)
        formData.append("upload_preset", "sef26f5y")

        try {
          const res = await axios.post("https://api.cloudinary.com/v1_1/drvzslkwn/image/upload", formData)
          const pictureUrl = res.data.secure_url

          await api.post("/workers-pictures", {
            worker_id: selectedWorker?.worker_id,
            picture_url: pictureUrl,
          })

          const picRes = await api.get(`/workers-pictures/${selectedWorker?.worker_id}`)
          setWorkerPicture(picRes.data)
        } catch (err) {
          console.error(err)
          Swal.fire("Erro", `Erro ao enviar foto ${docFile.name}`, "error")
        }
      } else {
        try {
          const formData = new FormData()
          formData.append("file", docFile)
          formData.append("doc_title", titleObj.label)

          await axios.post(`${import.meta.env.VITE_API_URL}/upload-pdf/${selectedWorker?.worker_id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })

          const docsRes = await api.get(`/worker-pdfs/${selectedWorker?.worker_id}`)
          setDocsList(docsRes.data)
        } catch (err) {
          console.error(err)
          Swal.fire("Erro", `Erro ao enviar arquivo ${docFile.name}`, "error")
        }
      }
    }

    setDocs([])
    setDocTitles({})
  }

  const handleDelete = (docId) => {
    api.delete(`/workers-docs/${docId}`)
      .then(() => {
        api.get(`/worker-pdfs/${selectedWorker?.worker_id}`)
          .then(response => setDocsList(response.data))
      })
  }

  const handleSendEmail = () => {
    let requestBody = {
      worker_id: selectedWorker.worker_id,
      to: selectedWorker.email,
      subject: "Contrato de Trabalho - Rede de Postos Graciosa",
      body: `${selectedWorker.worker_name}, seja bem-vindo(a) a Rede de Postos Graciosa. Em anexo, encaminhamos o seu contrato de trabalho.`,
    }

    api.post("/send-email", requestBody)
      .then(() => {
        Swal.fire("Sucesso", `E-mail enviado com sucesso para ${selectedWorker.worker_name}`, "success")
        handleClose()
      })
  }

  const handleDeleteWorkerPicture = () => {
    api.delete(`/workers-pictures/${selectedWorker?.worker_id}`)
      .then(() => setWorkerPicture())
  }

  const handleOpenDigitalizeDocsModal = () => {
    setDigitalizeDocsModalOpen(true)
  }

  const handleSendToMabecon = (workerId) => {
    api.post(`/workers/${workerId}/send-ficha-contabilidade-to-mabecon`)
      .then(() => Swal.fire("Sucesso", `E-mail enviado com sucesso`, "success"))
  }

  const sendDocsToMabecon = () => {
    api.post(`/workers/${selectedWorker?.worker_id}/send-docs-to-mabecon`)
      .then(() => Swal.fire("Sucesso", `E-mail enviado com sucesso`, "success"))
  }

  return (
    <>
      <Modal
        show={workerDocsModalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Documentos de {selectedWorker?.worker_name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="fw-bold mb-3">
            Selecionar arquivos
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              border: "2px dashed #0d6efd",
              borderRadius: "0.5rem",
              padding: "2rem",
              textAlign: "center",
              marginBottom: "1rem",
              cursor: "pointer",
              color: "#0d6efd",
              backgroundColor: "#e9f5ff",
              transition: "background-color 0.3s ease",
              userSelect: "none",
            }}
            onClick={() => document.getElementById("fileInput").click()}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#d6eaff"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#e9f5ff"}
          >
            <p className="mb-0 fs-5">
              <strong>Arraste e solte arquivos aqui</strong> <br />
              ou clique para selecionar múltiplos arquivos
            </p>
            <i className="bi bi-cloud-arrow-up" style={{ fontSize: "2rem", marginTop: "0.5rem" }}></i>
          </div>

          <input
            type="file"
            id="fileInput"
            multiple
            style={{ display: "none" }}
            onChange={(e) => handleFilesSelected(e.target.files)}
          />

          {docs.length > 0 && (
            <div className="mb-3">
              {docs.map((file) => (
                <div
                  key={file.name}
                  className="d-flex align-items-center justify-content-between border rounded px-3 py-2 mb-2"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {file.name}
                  </div>

                  <div style={{ width: "280px", marginLeft: "1rem" }}>
                    <Select
                      placeholder="Selecione título"
                      options={[
                        { value: 1, label: "CTPS" },
                        { value: 2, label: "Exame médico admissional" },
                        { value: 3, label: "Identidade" },
                        { value: 4, label: "CPF" },
                        { value: 5, label: "Titulo eleitoral" },
                        { value: 7, label: "Comprovante de residência" },
                        { value: 8, label: "CNH" },
                        { value: 9, label: "Certidão de casamento" },
                        { value: 10, label: "Certificado de reservista" },
                        { value: 11, label: "Certidão de nascimento (filhos menores de 14)" },
                        { value: 12, label: "Carteira de vacinação (filhos menores de 5)" },
                        { value: 13, label: "Comprovante de frequência escolar (filhos entre 7 e 14)" },
                        { value: 14, label: "Contrato de trabalho" },
                        { value: 15, label: "Foto" },
                        { value: 16, label: "Ficha da contabilidade" },
                      ]}
                      setSelectedValue={(selected) => handleDocTitleChange(file.name, selected)}
                      value={docTitles[file.name] || null}
                    />
                  </div>

                  <button
                    className="btn btn-outline-danger ms-3"
                    onClick={() => removeFile(file.name)}
                    type="button"
                    title="Remover arquivo"
                    style={{ minWidth: "40px", height: "40px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <Trash size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-success flex-grow-1" onClick={handleSubmit}>
              Adicionar arquivos
            </button>

            <button className="btn btn-dark" onClick={handleOpenDigitalizeDocsModal}>
              <CameraFill size={20} />
            </button>
          </div>

          <div>
            <button className="btn btn-primary w-100" onClick={sendDocsToMabecon}>
              Enviar arquivos por e-mail
            </button>
          </div>

          {docsList?.map((doc) => (
            <div key={doc.doc_id} className="mt-5 mb-5">
              <div className="row mb-2">
                <div className="col-10">
                  <h4>{doc.doc_title || `Documento #${doc.doc_id}`}</h4>
                </div>
                <div className="col-2 text-end">
                  <button className="btn btn-danger" onClick={() => handleDelete(doc.doc_id)}>
                    <Trash />
                  </button>
                </div>
              </div>

              {doc.doc_title === "Ficha da contabilidade" ? (
                <div className="alert alert-info">
                  <p>Este é um arquivo Excel. Clique abaixo para baixá-lo:</p>

                  <a
                    href={`${import.meta.env.VITE_API_URL}/get-pdf/${doc.doc_id}`}
                    className="btn btn-success"
                    download
                  >
                    Baixar Excel
                  </a>

                  <button className="btn btn-success ms-2" onClick={() => handleSendToMabecon(doc.worker_id)}>
                    Encaminhar por e-mail
                  </button>
                </div>
              ) : (
                <iframe
                  src={`${import.meta.env.VITE_API_URL}/get-pdf/${doc.doc_id}`}
                  width="100%"
                  height="500px"
                  style={{ border: 'none' }}
                  title={`PDF-${doc.doc_id}`}
                />
              )}

              {doc.doc_title === "Contrato de trabalho" && (
                <div className="mt-3">
                  <button className="btn btn-primary w-100" onClick={handleSendEmail}>
                    Enviar contrato por e-mail
                  </button>
                </div>
              )}
            </div>
          ))}

          {workerPicture && (
            <div>
              <div className="row mb-3">
                <div className="col-10">
                  <h4>Foto</h4>
                </div>

                <div className="col-2">
                  <button className="btn btn-danger" onClick={handleDeleteWorkerPicture}>
                    <Trash />
                  </button>
                </div>
              </div>

              <img src={workerPicture?.picture_url} className='w-100' alt="Foto do trabalhador" />
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Fechar</Button>
        </Modal.Footer>
      </Modal>

      <DigitalizeDocsModal
        digitalizeDocsModalOpen={digitalizeDocsModalOpen}
        setDigitalizeDocsModalOpen={setDigitalizeDocsModalOpen}
        selectedWorker={selectedWorker}
      />
    </>
  )
}

export default WorkerDocsModal
