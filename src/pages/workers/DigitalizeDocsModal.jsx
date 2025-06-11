import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DigitalizeDocsModal = ({ digitalizeDocsModalOpen, setDigitalizeDocsModalOpen }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');
  const [capturedImage, setCapturedImage] = useState(null);

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    setDigitalizeDocsModalOpen(false);
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Erro ao acessar a câmera:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const toggleCamera = () => {
    stopCamera();
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };

  useEffect(() => {
    if (digitalizeDocsModalOpen) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [digitalizeDocsModalOpen, facingMode]);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
      setCapturedImage(blob);
    }, 'image/jpeg', 0.95);
  };

  const sendToBackend = async () => {
    if (!capturedImage) return;

    const formData = new FormData();
    formData.append('document', capturedImage, 'document.jpg');

    try {
      const response = await fetch('/api/upload-doc', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Documento enviado com sucesso!');
        handleClose();
      } else {
        alert('Erro ao enviar o documento.');
      }
    } catch (err) {
      console.error('Erro ao enviar:', err);
      alert('Falha na comunicação com o servidor.');
    }
  };

  return (
    <Modal
      show={digitalizeDocsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Digitalizar Documento</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: '100%', maxHeight: '60vh', borderRadius: '8px' }}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <div className="mt-3 d-flex justify-content-center gap-2 flex-wrap">
          <Button variant="secondary" onClick={toggleCamera}>
            Trocar Câmera ({facingMode === 'user' ? 'Frontal' : 'Traseira'})
          </Button>
          <Button variant="primary" onClick={takePhoto}>Bater Foto</Button>
        </div>

        {capturedImage && (
          <div className="mt-4">
            <p>Pré-visualização:</p>
            <img
              src={URL.createObjectURL(capturedImage)}
              alt="captura"
              style={{ maxWidth: '100%', maxHeight: '40vh', border: '1px solid #ccc', borderRadius: '8px' }}
            />
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>
        <Button
          variant="success"
          onClick={sendToBackend}
          disabled={!capturedImage}
        >
          Enviar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DigitalizeDocsModal;
