import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'

const MathCorrection = (props) => {
  const {
    teoryModalOpen, 
    setTeoryModalOpen
  } = props

  const [firstQuestion, setFirstQuestion] = useState()

  const [correctFirstQuestion, setCorrectFirstQuestion] = useState(1)

  const answersOptions = [
    { "label": "a", "value": 1 },
    { "label": "b", "value": 2 },
    { "label": "c", "value": 3 },
    { "label": "d", "value": 4 },
    { "label": "e", "value": 5 }
  ]

  const handleCorrection = () => {
    console.log(firstQuestion)
  }

  return (
    <>
      <Modal
        show={teoryModalOpen}
        onHide={() => setTeoryModalOpen(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Adicione as respostas do candidato
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-3">
            <Select
              options={answersOptions}
              placeholder="Questão 01"
              onClick={(e) => console.log(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Select
              options={answersOptions}
              placeholder="Questão 02"
            />
          </div>

          <div className="mb-3">
            <Select
              options={answersOptions}
              placeholder="Questão 03"
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={() => setTeoryModalOpen(false)}>
            Fechar
          </Button>

          <Button
            variant="primary"
            onClick={() => handleCorrection()}
          >
            Corrigir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MathCorrection