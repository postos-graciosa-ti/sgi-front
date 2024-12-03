import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from 'react-select'
import getFunctions from '../../requests/getFunctions'
import getTurns from '../../requests/getTurns'
import useUserSessionStore from '../../data/userSession'
import postDefaultScale from '../../requests/postDefaultScale'

const DefaultScaleModal = (props) => {
  const {
    defaultScaleModalOpen,
    setDefaultScaleModalOpen,
  } = props

  const [quantity, setQuantity] = useState()

  const [turnsList, setTurnsList] = useState()

  const [selectedTurn, setSelectedTurn] = useState()

  const [functionsList, setFunctionsList] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

  const selectedSubsdiarie = useUserSessionStore((state) => state.selectedSubsdiarie)

  useEffect(() => {
    getTurns()
      .then((response) => {
        let turnsData = response.data

        let options = []

        turnsData && turnsData.map((data) => {
          options.push({ "value": data.id, "label": data.name })
        })

        setTurnsList(options)
      })

    getFunctions()
      .then((response) => {
        let functionsData = response.data

        let options = []

        functionsData && functionsData.map((data) => {
          options.push({ "value": data.id, "label": data.name })
        })

        setFunctionsList(options)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      "quantity": quantity,
      "function_id": selectedFunction,
      "subsidiarie_id": selectedSubsdiarie.value,
      "turn_id": selectedTurn
    }

    postDefaultScale(formData)
      .then((response) => console.log(response))
  }

  return (
    <>
      <Modal
        show={defaultScaleModalOpen}
        onHide={() => setDefaultScaleModalOpen(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Definir escala padrão de funcionários</Modal.Title>
        </Modal.Header>

        <form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Body>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Quantidade de funcionários"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <ReactSelect
                placeholder="Turno"
                options={turnsList}
                onChange={(e) => setSelectedTurn(e.value)}
              />
            </div>

            <div className="mb-3">
              <ReactSelect
                placeholder="Cargo"
                options={functionsList}
                onChange={(e) => setSelectedFunction(e.value)}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setDefaultScaleModalOpen(false)}>
              Fechar
            </Button>

            <Button type="submit" variant="primary">Concluir</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default DefaultScaleModal