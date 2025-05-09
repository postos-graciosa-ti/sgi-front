import moment from "moment"
import { useEffect, useState } from "react"
import Nav from "../../components/Nav.jsx"
import useUserSessionStore from "../../data/userSession.js"
import api from "../../services/api.js"

const Home = () => {
  const today = new Date()

  const day = today.getDay()

  const diffToMonday = (day === 0 ? -6 : 1 - day)

  const startOfWeek = new Date(today)

  startOfWeek.setDate(today.getDate() + diffToMonday)

  startOfWeek.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(startOfWeek)

  endOfWeek.setDate(startOfWeek.getDate() + 6)

  endOfWeek.setHours(23, 59, 59, 999)

  const userSession = useUserSessionStore(state => state.userSession)

  const [workersAwayEndDate, setWorkersAwayEndDate] = useState()

  const [workersWithoutFirstReview, setWorkersWithoutFirstReview] = useState()

  const [workersWithoutSecondReview, setWorkersWithoutSecondReview] = useState()

  const [ticketsNotifications, setTicketsNotifications] = useState()

  const [firstReviewRealizedBy, setFirstReviewRealizedBy] = useState()

  const [secondReviewRealizedBy, setSecondReviewRealizedBy] = useState()

  useEffect(() => {
    api
      .post(`/subsidiaries/away-workers`, { subsidiaries_ids: eval(userSession.subsidiaries_id) })
      .then((response) => setWorkersAwayEndDate(response.data))

    api
      .post("/subsidiaries/workers/experience-time-no-first-review", { subsidiaries_ids: eval(userSession.subsidiaries_id) })
      .then((response) => setWorkersWithoutFirstReview(response.data))

    api
      .post("/subsidiaries/workers/experience-time-no-second-review", { subsidiaries_ids: eval(userSession.subsidiaries_id) })
      .then((response) => setWorkersWithoutSecondReview(response.data))

    api
      .get(`/tickets/responsible/${userSession?.id}/notifications`)
      .then((response) => setTicketsNotifications(response.data))

    api
      .get(`/workers/first-review/notification`)
      .then((response) => setFirstReviewRealizedBy(response.data))

    api
      .get(`/workers/second-review/notification`)
      .then((response) => setSecondReviewRealizedBy(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container mt-4">
        {
          workersWithoutFirstReview?.workers?.length > 0 && (
            <>
              <h5>Avaliação de primeiro período de experiência</h5>

              {
                workersWithoutFirstReview?.workers?.map((data) => (
                  <div className="alert alert-warning" key={data.worker_id}>
                    Colaborador {data.worker_name} da filial {data.subsidiarie_name}, admitido em {moment(data.worker_admission_date).format("DD/MM/YYYY")}, tem sua primeira avaliação de tempo de experiência em {moment(data.worker_second_review_date).format("DD/MM/YYYY")}
                  </div>
                ))
              }
            </>
          )
        }

        {
          firstReviewRealizedBy?.length > 0 && (
            <>
              <h5>Avaliações de primeiro período de experiência realizadas</h5>

              {
                firstReviewRealizedBy?.map((notification) => (
                  <div className="alert alert-warning">
                    {notification?.User?.name} realizou a avaliação de primeiro período de experiência para {notification?.Workers?.name} em {moment(notification?.WorkersFirstReview?.realized_in).format("DD-MM-YYYY")}
                  </div>
                ))
              }
            </>
          )
        }

        {
          workersWithoutSecondReview?.workers?.length > 0 && (
            <>
              <h5>Avaliação de segundo período de experiência</h5>

              {
                workersWithoutSecondReview?.workers?.map((data) => (
                  <div className="alert alert-warning" key={data.worker_id}>
                    Colaborador {data.worker_name} da filial {data.subsidiarie_name}, admitido em {moment(data.worker_admission_date).format("DD/MM/YYYY")}, tem sua segunda avaliação de tempo de experiência em {moment(data.worker_second_review_date).format("DD/MM/YYYY")}
                  </div>
                ))
              }
            </>
          )
        }

        {
          secondReviewRealizedBy?.length > 0 && (
            <>
              <h5>Avaliações de segundo período de experiência realizadas</h5>

              {
                secondReviewRealizedBy?.map((notification) => (
                  <div className="alert alert-warning">
                    {notification?.User?.name} realizou a avaliação de primeiro período de experiência para {notification?.Workers?.name} em {moment(notification?.WorkersFirstReview?.realized_in).format("DD-MM-YYYY")}
                  </div>
                ))
              }
            </>
          )
        }

        {
          workersAwayEndDate?.workers?.length > 0 && (
            <>
              <h5>Afastados para retornar</h5>

              {
                workersAwayEndDate?.workers?.map((worker) => (
                  <div className="alert alert-warning" key={worker.id}>
                    {worker.name} deve retornar em {moment(worker.away_end_date).format("DD/MM/YYYY")}
                  </div>
                ))
              }
            </>
          )
        }

        {
          ticketsNotifications?.length > 0 && (
            <>
              <h5>Chamados atribuídos</h5>

              {
                ticketsNotifications && ticketsNotifications.map((notification) => (
                  <div className="alert alert-warning" key={notification?.Tickets?.id}>
                    {notification?.User?.name} abriu um chamado ({notification?.Tickets?.description}, {notification?.Service?.name}) atribuído a {userSession?.name} em {moment(notification?.Tickets?.opened_at).format("DD-MM-YYYY")}
                  </div>
                ))
              }
            </>
          )
        }
      </div>
    </>
  )
}

export default Home
