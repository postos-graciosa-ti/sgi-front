import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Trash } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'

const reviewsOptions = [
  { value: 1, label: "Avaliação períodica" },
  { value: 2, label: "Avaliação improdutividade" }
]

const periodicReviewQuestions = [
  { value: 1, label: "Como a empresa pode ajudar a melhorar o seu trabalho?" },
  { value: 2, label: "Está faltando uniforme?" },
  { value: 3, label: "Está faltando EPI?" },
  { value: 4, label: "Está faltando alguma informação?" },
  { value: 5, label: "A empresa está deixando de cumprir o contrato?" },
  { value: 6, label: "Em nivel de estrutura, tem alguma sugestão?" },
  { value: 7, label: "Quais os pontos, em sua opinião, que são favoráveis à sua permanência na empresa e quais os pontos que precisam melhorar?" },
  { value: 8, label: "O que você quer do seu líder? Como eu posso lhe ajudar?" },
  { value: 9, label: "Do que você mais gosta de trabalhar aqui?" },
  { value: 10, label: "E qual a parte mais díficil de trabalhar aqui?" },
  { value: 11, label: "Que conselhos você daria a um funcionário recém chegado?" },
]

const improductivityReviewQuestions = [
  { value: 1, label: "O que você acredita que pode ser feito para que o resultado possa ser atingido?" },
  { value: 2, label: "Em uma escala de zero a dez o quanto você está comprometido com o resultado?" },
  { value: 3, label: "Você se permitirá fazer assim e assim (especifique) para atingir o resultado?" },
  { value: 4, label: "Se eu dissesse para deixar de fazer assim e assim (especifique) faria sentido para você?" },
  { value: 5, label: "Como você se sente em perceber que os resultados não estão sendo atingidos como está demonstrado?" },
  { value: 6, label: "Que ações você sugere para que possamos atingir os resultados?" },
  { value: 7, label: "Fazer isso e isso (especifique) faria algum sentido para você?" },
]

const PeriodicReviewsModal = (props) => {
  const { periodicReviewsModalOpen, setPeriodicReviewsModalOpen, selectedWorker } = props

  const [workerPeriodicReviews, setWorkerPeriodicReviews] = useState()

  const [reviewType, setReviewType] = useState()

  const [reviewQuestions, setReviewQuestions] = useState()

  const [reviewAnswers, setReviewAnswers] = useState()

  useEffect(() => {
    api
      .get(`/workers-periodic-reviews/${selectedWorker?.worker_id}`)
      .then((response) => {
        setWorkerPeriodicReviews(response.data)
      })
  }, [periodicReviewsModalOpen])

  useEffect(() => {
    if (reviewType) {
      setReviewQuestions()

      setReviewAnswers()

      if (reviewType.value == 1) {
        setReviewQuestions(periodicReviewQuestions)
      } else {
        setReviewQuestions(improductivityReviewQuestions)
      }
    }
  }, [reviewType])

  const handleOnChangeQuestions = (question, answer) => {
    setReviewAnswers((prev) => {
      if (prev) {
        return [...prev, { question: question, answer: answer }]
      } else {
        return [{ question: question, answer: answer }]
      }
    })
  }

  const handleClose = () => {
    setReviewType()

    setReviewQuestions()

    setReviewAnswers()

    setPeriodicReviewsModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      worker_id: selectedWorker?.worker_id,
      label: reviewType.label,
      date: dayjs().format("YYYY-MM-DD"),
      answers: JSON.stringify(reviewAnswers)
    }

    api
      .post("/workers-periodic-reviews", requestBody)
      .then(() => {
        setReviewQuestions()

        setReviewAnswers()

        api
          .get(`/workers-periodic-reviews/${selectedWorker?.worker_id}`)
          .then((response) => {
            setWorkerPeriodicReviews(response.data)
          })
      })
  }

  const handleDelete = (id) => {
    api
      .delete(`/workers-periodic-reviews/${id}`)
      .then(() => {
        api
          .get(`/workers-periodic-reviews/${selectedWorker?.worker_id}`)
          .then((response) => {
            setWorkerPeriodicReviews(response.data)
          })
      })
  }

  return (
    <Modal
      show={periodicReviewsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Avaliações periodicas</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ReactSelect
          options={reviewsOptions}
          onChange={(option) => setReviewType(option)}
        />

        {
          reviewQuestions && (
            <>
              {
                reviewQuestions && reviewQuestions.map((question) => (
                  <div className="mt-3 mb-3">
                    <label className="form-label fw-bold">{question.label}</label>

                    <textarea
                      className="form-control"
                      onChange={(e) => handleOnChangeQuestions(question.label, e.target.value)}
                    />
                  </div>
                ))
              }

              <button className="btn btn-success" onClick={handleSubmit}>Enviar</button>
            </>
          )
        }

        {
          workerPeriodicReviews && workerPeriodicReviews.map((review) => (
            <div key={review.key} className="mt-3 mb-3">
              <div className="row">
                <div className="col-11">
                  <div className="alert alert-warning fw-bold text-center" role="alert">
                    {review.label} (realizado em: {dayjs(review.date).format("DD-MM-YYYY")})
                  </div>
                </div>

                <div className="col-1">
                  <button className="btn btn-danger mt-2" onClick={() => handleDelete(review.id)}>
                    <Trash />
                  </button>
                </div>
              </div>

              {
                review.answers && review.answers.map((answer) => (
                  <div>
                    <label className="form-label fw-bold">{answer.question}</label>

                    <input type="text" className="form-control" value={answer.answer} disabled />
                  </div>
                ))
              }
            </div>
          ))
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleClose}>Concluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PeriodicReviewsModal