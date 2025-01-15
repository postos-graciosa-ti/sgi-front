import React, { useEffect, useState } from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactSelect from "react-select";
import api from "../../services/api";
import useUserSessionStore from "../../data/userSession";
import { Plus } from "react-bootstrap-icons";

const ScaleModal = (props) => {
  const { scaleModalOpen, setScaleModalOpen, selectedDate } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [turnsOptions, setTurnsOptions] = useState([])

  const [selectedTurn, setSelectedTurn] = useState()

  const [functionsOptions, setFunctionsOptions] = useState([])

  const [selectedFunctions, setSelectedFunctions] = useState()

  const [workersOptions, setWorkersOptions] = useState([])

  useEffect(() => {
    api
      .get("/turns")
      .then((response) => {
        let options = []

        response.data && response.data.map((turn) => {
          options.push({ "label": turn.name, value: turn.id })
        })

        setTurnsOptions(options)
      })

    api
      .get("/functions")
      .then((response) => {
        let options = []

        response.data && response.data.map((func) => {
          options.push({ "label": func.name, "value": func.id })
        })

        setFunctionsOptions(options)
      })

  }, [])

  useEffect(() => {
    if (selectedTurn && selectedFunctions) {
      api
        .get(`/workers/subsidiaries/${selectedSubsdiarie.value}/functions/${selectedFunctions.value}/turns/${selectedTurn.value}`)
        .then((response) => {
          let options = []

          response.data && response.data.map((worker) => {
            options.push({ "label": worker.name, "value": worker.id })
          })

          setWorkersOptions(options)
        })
    }

  }, [selectedFunctions, selectedTurn])

  return (
    <Modal
      show={scaleModalOpen}
      onHide={() => setScaleModalOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Escala de folga para {moment(selectedDate).format("DD-MM-YYYY")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <div className="row">
            <div className="col">
              <ReactSelect
                placeholder="Turno"
                options={turnsOptions}
                onChange={(value) => setSelectedTurn(value)}
              />
            </div>

            <div className="col">
              <ReactSelect
                placeholder="Função"
                options={functionsOptions}
                onChange={(value) => setSelectedFunctions(value)}
              />
            </div>

            <div className="col">
              <ReactSelect
                options={workersOptions}
                isMulti
              />
            </div>

            <div className="col">
              <button><Plus /></button>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={() => setScaleModalOpen(false)}>Fechar</Button>

        <Button variant="success">Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ScaleModal
