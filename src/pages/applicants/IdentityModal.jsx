import { useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const IdentityModal = (props) => {
  const { identityModalOpen, setIdentityModalOpen } = props

  const videoRef = useRef(null)

  const streamRef = useRef(null)

  const canvasRef = useRef(null)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })

        videoRef.current.srcObject = stream

        streamRef.current = stream
      } catch (err) {
        console.error('Erro ao acessar a câmera:', err)
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
    setIdentityModalOpen(false)
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

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: dataURL }),
      })

      const result = await response.json()

      console.log('Imagem salva:', result)

      handleClose()
    } catch (error) {
      console.error('Erro ao salvar imagem:', error)
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
        <video
          ref={videoRef}
          autoPlay
          style={{ width: '100%', borderRadius: 8 }}
        />

        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleCapture}>Concluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default IdentityModal
