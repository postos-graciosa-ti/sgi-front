import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const ResponsibleCommentsModal = (props) => {
  const { responsibleCommentsModalOpen, setResponsibleCommentsModalOpen, selectedResponsibleTicket, setSelectedResponsibleTicket } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const [comments, setComments] = useState([])

  const [newComment, setNewComment] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (selectedResponsibleTicket?.ticket_id) {
      fetchComments()
    }
  }, [responsibleCommentsModalOpen, selectedResponsibleTicket])

  const fetchComments = async () => {
    try {
      const response = await api.get(`/tickets-comments/${selectedResponsibleTicket?.ticket_id}`)
      setComments(response.data)
    } catch (error) {
      console.error('Erro ao buscar comentários:', error)
    }
  }

  const handleClose = () => {
    setSelectedResponsibleTicket(null)
    setResponsibleCommentsModalOpen(false)
    setNewComment('')
    setIsSubmitting(false)
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)

    try {
      const formData = {
        ticket_id: selectedResponsibleTicket?.ticket_id,
        comentator_id: userSession?.id,
        comment: newComment,
      }

      await api.post(`/tickets-comments`, formData)

      setNewComment('')
      await fetchComments()
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      show={responsibleCommentsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>
          <h4>{selectedResponsibleTicket?.service?.name}</h4>
          <small className="text-muted">Chamado #0{selectedResponsibleTicket?.ticket_id}</small>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body-custom">
        <div className="ticket-description mb-4 p-3 bg-light rounded">
          <h5>Descrição do chamado:</h5>
          <p>{selectedResponsibleTicket?.description}</p>
        </div>

        <div className="comments-section">
          <h5 className="mb-3">Comentários ({comments?.length || 0})</h5>

          {comments?.length > 0 ? (
            <div className="comments-list">
              {comments.map((comment, index) => (
                <div key={index} className="comment-item mb-3 p-3 border rounded">
                  <div className="comment-header d-flex justify-content-between align-items-center mb-2">
                    <strong className="comment-author">{comment?.User?.name}</strong>
                  </div>
                  <div className="comment-content">
                    {comment?.TicketsComments?.comment}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-comments text-center py-4 text-muted">
              Nenhum comentário ainda. Seja o primeiro a comentar!
            </div>
          )}
        </div>

        <div className="add-comment mt-4">
          <Form.Group controlId="newComment">
            <Form.Label>Adicionar Comentário</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Digite seu comentário..."
              disabled={isSubmitting}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleAddComment}
            disabled={!newComment.trim() || isSubmitting}
            className="mt-2"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Comentário'}
          </Button>
        </div>
      </Modal.Body>

      <Modal.Footer className="modal-footer-custom">
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ResponsibleCommentsModal
