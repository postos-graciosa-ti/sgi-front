import moment from "moment"
import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import NewTicketModal from "./NewTicketModal"
import RequestingComments from "./RequestingCommentsModal"

const Requesting = () => {
  const userSession = useUserSessionStore((state) => state.userSession)

  const [requestingTicketsList, setRequestingTicketsList] = useState()

  const [selectedRequestingTicket, setSelectedRequestingTicket] = useState()

  const [newTicketModalOpen, setNewTicketModalOpen] = useState(false)

  const [requestingCommentsOpen, setRequestingCommentsOpen] = useState(false)

  useEffect(() => {
    api
      .get(`/tickets/requesting/${userSession?.id}`)
      .then((response) => setRequestingTicketsList(response.data))
  }, [])

  const handleOpenNewTicketModal = () => {
    setNewTicketModalOpen(true)
  }

  const handleCloseTicket = (ticketId) => {
    api
      .patch(`/tickets/${ticketId}/close`)
      .then(() => {
        api
          .get(`/tickets/requesting/${userSession?.id}`)
          .then((response) => setRequestingTicketsList(response.data))
      })
  }

  const handleOpenRequestingCommentsModal = (ticket) => {
    setSelectedRequestingTicket(ticket)

    setRequestingCommentsOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div>
          <button className="btn btn-primary" onClick={handleOpenNewTicketModal}>
            Novo chamado
          </button>
        </div>

        {
          requestingTicketsList?.length > 0 ? (
            requestingTicketsList.map((ticket) => (
              <div key={ticket.ticket_id} className="card mt-3 mb-3 p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    Aberto por: {ticket.requesting?.name || 'Usuário desconhecido'}
                  </h5>
                  <div>
                    {ticket.is_open ? (
                      <span className="badge text-bg-success me-2">Aberto</span>
                    ) : (
                      <span className="badge text-bg-danger me-2">Fechado</span>
                    )}
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleOpenRequestingCommentsModal(ticket)}
                    >
                      Comentários
                    </button>
                    {ticket.is_open && (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleCloseTicket(ticket.ticket_id)}
                      >
                        Fechar Chamado
                      </button>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-between text-muted small mb-2">
                  <span>Aberto em: {moment(ticket.opened_at).format("DD-MM-YYYY")}</span>
                  {!ticket.is_open && ticket.closed_at && (
                    <span>Fechado em: {moment(ticket.closed_at).format("DD-MM-YYYY")}</span>
                  )}
                </div>

                {ticket.description && (
                  <p className="mt-2 mb-1">{ticket.description}</p>
                )}

                {ticket.responsibles?.length > 0 && (
                  <div className="mt-2">
                    <small className="text-muted">Responsáveis:</small>
                    <div>
                      {ticket.responsibles.map(user => (
                        <span key={user.id} className="badge bg-light text-dark me-1">
                          {user.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="alert alert-info mt-3">
              Nenhum chamado encontrado
            </div>
          )
        }
      </div>

      <NewTicketModal
        newTicketModalOpen={newTicketModalOpen}
        setNewTicketModalOpen={setNewTicketModalOpen}
        setRequestingTicketsList={setRequestingTicketsList}
      />

      <RequestingComments
        requestingCommentsOpen={requestingCommentsOpen}
        setRequestingCommentsOpen={setRequestingCommentsOpen}
        selectedRequestingTicket={selectedRequestingTicket}
        setSelectedRequestingTicket={setSelectedRequestingTicket}
      />
    </>
  )
}

export default Requesting