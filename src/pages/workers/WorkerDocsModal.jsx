import axios from 'axios'
import { useEffect, useState } from 'react'
import { CameraFill, Trash } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx'
import Select from '../../components/form/Select'
import api from '../../services/api'
import DigitalizeDocsModal from './DigitalizeDocsModal'

export const ExcelViewer = ({ fileUrl }) => {
  const [html, setHtml] = useState("Carregando Excel...")

  useEffect(() => {
    fetch(fileUrl)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => {
        const data = new Uint8Array(arrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })

        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const htmlString = XLSX.utils.sheet_to_html(firstSheet)
        setHtml(htmlString)
      })
      .catch(() => setHtml("Erro ao carregar Excel"))
  }, [fileUrl])

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} style={{ overflowX: 'auto' }} />
  )
}


const WorkerDocsModal = (props) => {
  const { workerDocsModalOpen, setWorkerDocsModalOpen, selectedWorker, setSelectedWorker } = props

  const [docsList, setDocsList] = useState()

  const [workerPicture, setWorkerPicture] = useState()

  const [docTitle, setDocTitle] = useState()

  const [doc, setDoc] = useState()

  const [digitalizeDocsModalOpen, setDigitalizeDocsModalOpen] = useState(false)

  useEffect(() => {
    api
      .get(`/worker-pdfs/${selectedWorker?.worker_id}`)
      .then((response) => {
        setDocsList(response.data)
      })

    api
      .get(`/workers-pictures/${selectedWorker?.worker_id}`)
      .then((response) => {
        setWorkerPicture(response.data)
      })
  }, [workerDocsModalOpen])

  const handleClose = () => {
    setDoc()

    setWorkerPicture()

    setSelectedWorker()

    setWorkerDocsModalOpen(false)
  }

  const handleSubmit = () => {
    if (docTitle.label == "Foto") {
      const formData = new FormData()

      formData.append("file", doc)

      formData.append("upload_preset", "sef26f5y")

      axios
        .post("https://api.cloudinary.com/v1_1/drvzslkwn/image/upload", formData)
        .then((response) => {
          let requestBody = {
            worker_id: selectedWorker?.worker_id,
            picture_url: response.data.secure_url
          }

          api
            .post("/workers-pictures", requestBody)
            .then((response) => {
              setWorkerPicture(response.data)
            })
        })
    } else {
      axios
        .post(`${import.meta.env.VITE_API_URL}/upload-pdf/${selectedWorker?.worker_id}`,
          {
            "file": doc,
            "doc_title": docTitle.label
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then(() => {
          api
            .get(`/worker-pdfs/${selectedWorker?.worker_id}`)
            .then((response) => {
              setDocsList(response.data)
            })
        })
    }
  }

  const handleDelete = (docId) => {
    api
      .delete(`/workers-docs/${docId}`)
      .then(() => {
        api
          .get(`/worker-pdfs/${selectedWorker?.worker_id}`)
          .then((response) => {
            setDocsList(response.data)
          })
      })
  }

  const handleSendEmail = () => {
    let requestBody = {
      worker_id: selectedWorker.worker_id,
      to: selectedWorker.email,
      subject: "Contrato de Trabalho - Rede de Postos Graciosa",
      body: `${selectedWorker.worker_name}, seja bem-vindo(a) a Rede de Postos Graciosa. Em anexo, encaminhamos o seu contrato de trabalho.`,
    }

    api
      .post("/send-email", requestBody)
      .then(() => {
        Swal.fire("Sucesso", `E-mail enviado com sucesso para ${selectedWorker.worker_name}`, "success")

        handleClose()
      })
  }

  const handleDeleteWorkerPicture = () => {
    api
      .delete(`/workers-pictures/${selectedWorker?.worker_id}`)
      .then(() => setWorkerPicture())
  }

  const handleOpenDigitalizeDocsModal = () => {
    setDigitalizeDocsModalOpen(true)
  }

  const handleSendToMabecon = (workerId) => {
    api
      .post(`/workers/${workerId}/send-ficha-contabilidade-to-mabecon`)
      .then(() => Swal.fire("Sucesso", `E-mail enviado com sucesso`, "success"))
  }

  const sendDocsToMabecon = () => {
    api
      .post(`/workers/${selectedWorker?.worker_id}/send-docs-to-mabecon`)
      .then(() => {
        Swal.fire("Sucesso", `E-mail enviado com sucesso`, "success")
      })
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
            Selecionar arquivo
          </div>

          <div className="row mb-3">
            <div className="col-10">
              <input type="file" className="form-control" onChange={(e) => setDoc(e.target.files[0])} />
            </div>

            <div className="col-2">
              <button className="btn btn-dark w-100" onClick={handleOpenDigitalizeDocsModal}>
                <CameraFill />
              </button>
            </div>
          </div>

          <div className="fw-bold mb-3">
            Título de arquivo
          </div>

          <div className="row">
            <div className="col-10">
              <Select
                placeholder={""}
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
                setSelectedValue={setDocTitle}
              />
            </div>

            <div className="col-2">
              <button className="btn btn-success w-100" onClick={handleSubmit}>
                Adicionar
              </button>
            </div>
          </div>

          <div>
            <button className="btn btn-primary w-100" onClick={sendDocsToMabecon}>
              Enviar arquivos por e-mail
            </button>
          </div>

          {
            docsList?.map((doc) => (
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

                {
                  doc.doc_title === "Ficha da contabilidade" ? (
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
                  )
                }

                {
                  doc.doc_title === "Contrato de trabalho" && (
                    <div className="mt-3">
                      <button className="btn btn-primary w-100" onClick={handleSendEmail}>
                        Enviar contrato por e-mail
                      </button>
                    </div>
                  )
                }
              </div>
            ))
          }

          {
            workerPicture && (
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

                <img src={workerPicture?.picture_url} className='w-100' />
              </div>
            )
          }
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