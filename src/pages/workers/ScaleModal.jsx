import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ScaleModal = (props) => {
  const {
    scaleModalOpen,
    setScaleModalOpen,
  } = props

  const [test, setTest] = useState()

  useEffect(() => {
    api
      .get("/teste")
      .then((response) => {
        setTest(response.data)
      })
  }, [])

  return (
    <>
      <Modal
        show={scaleModalOpen}
        onHide={() => setScaleModalOpen(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {test && test.map((test) => {
            test
          })}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setScaleModalOpen(false)}>
            Close
          </Button>

          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ScaleModal