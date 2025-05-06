import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const RequestingComments = (props) => {
  const { requestingCommentsOpen, setRequestingCommentsOpen, selectedRequestingTicket, setSelectedRequestingTicket } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const [comments, setComments] = useState([])

  const [newComment, setNewComment] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (selectedRequestingTicket?.ticket_id) {
      fetchComments()
    }
  }, [requestingCommentsOpen, selectedRequestingTicket])

  const fetchComments = async () => {
    try {
      const response = await api.get(`/tickets-comments/${selectedRequestingTicket?.ticket_id}`)

      setComments(response.data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const handleClose = () => {
    setSelectedRequestingTicket(null)

    setRequestingCommentsOpen(false)

    setNewComment('')

    setIsSubmitting(false)
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)

    try {
      const formData = {
        "ticket_id": selectedRequestingTicket?.ticket_id,
        "comentator_id": userSession?.id,
        "comment": newComment,
      }

      await api.post(`/tickets-comments`, formData)

      setNewComment('')

      await fetchComments()
    } catch (error) {
      console.error('Error adding comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      show={requestingCommentsOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>
          <h4>{selectedRequestingTicket?.service?.name}</h4>
          <small className="text-muted">Chamado #0{selectedRequestingTicket?.ticket_id}</small>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body-custom">
        <div className="ticket-description mb-4 p-3 bg-light rounded">
          <h5>Descrição do chamado:</h5>
          <p>{selectedRequestingTicket?.description}</p>
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

export default RequestingComments