import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/drvzslkwn/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'sef26f5y'

const IdentityModal = ({ identityModalOpen, setIdentityModalOpen, selectedApplicant }) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const [photoPreview, setPhotoPreview] = useState(null)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        videoRef.current.srcObject = stream
        streamRef.current = stream
      } catch (err) {
        console.error('Erro ao acessar a câmera:', err)
        Swal.fire('Erro', 'Não foi possível acessar a câmera.', 'error')
      }
    }

    if (identityModalOpen) startCamera()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [identityModalOpen])

  const handleClose = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }
    setIdentityModalOpen(false)
    setPhotoPreview(null)
  }

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  const handleCapture = async () => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const dataURL = canvas.toDataURL('image/jpeg')
    setPhotoPreview(dataURL)

    if (!selectedApplicant?.id) {
      Swal.fire('Erro', 'Nenhum candidato selecionado.', 'error')
      return
    }

    Swal.fire({
      title: 'Enviando...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    })

    try {
      // 📤 Upload para Cloudinary
      const formData = new FormData()
      const blob = dataURLtoBlob(dataURL)
      formData.append('file', blob)
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

      const cloudinaryRes = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      })

      const cloudinaryData = await cloudinaryRes.json()
      const imageUrl = cloudinaryData.secure_url

      if (!imageUrl) throw new Error('URL não recebida do Cloudinary')

      // 📨 Enviar URL para o backend
      const response = await fetch(`/applicants/${selectedApplicant.id}/api/upload-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageUrl }),
      })

      if (response.ok) {
        Swal.fire('Sucesso', 'Imagem salva com sucesso!', 'success').then(() => {
          handleClose()
        })
      } else {
        const errorData = await response.text()
        console.error('Erro ao salvar imagem:', errorData)
        Swal.fire('Erro', 'Falha ao salvar a imagem.', 'error')
      }
    } catch (error) {
      console.error('Erro no envio:', error)
      Swal.fire('Erro', 'Erro ao processar a imagem.', 'error')
    }
  }

  return (
    <Modal
      show={identityModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Identificação</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: 8 }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        {photoPreview && (
          <img
            src={photoPreview}
            alt="Prévia da foto"
            style={{ width: '100%', marginTop: 10, borderRadius: 8 }}
          />
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>
        <Button variant="success" onClick={handleCapture}>Concluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default IdentityModal
