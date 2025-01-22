import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactSelect from 'react-select';
import useUserSessionStore from '../../../data/userSession';
import api from '../../../services/api';
import moment from 'moment';

const SundayModal = (props) => {
  const { sundayModalOpen, setSundayModalOpen, selectedDate } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [stationAttendantOptions, setStationAttendantOptions] = useState([])

  const [selectStationAttendant, setSelectedStationAttendant] = useState()

  const [operators, setOperators] = useState([])

  const [selectedOperators, setSelectedOperators] = useState()

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsdiarie.value}/frentistas`)
      .then((response) => {
        let stationAttendantOptions = []

        response.data?.map((stationAttendant) => {
          stationAttendantOptions.push({ "label": stationAttendant.name, "value": stationAttendant.id })
        })

        setStationAttendantOptions(stationAttendantOptions)
      })

    api
      .get(`/subsidiaries/${selectedSubsdiarie.value}/caixas`)
      .then((response) => {
        let operatorsOptions = []

        response.data?.map((operator) => {
          operatorsOptions.push({ "label": operator.name, "value": operator.id })
        })

        setOperators(operatorsOptions)
      })
  }, [])

  const handleSubmit = () => {
    let stationAttendantArray = []

    let operatorArray = []

    {
      selectStationAttendant?.map((stationAttendant) => {
        stationAttendantArray.push(stationAttendant.value)
      })
    }

    {
      selectedOperators?.map((operator) => {
        operatorArray.push(operator.value)
      })
    }

    let formData = {
      "station_attendant": `[${stationAttendantArray.map(dayOff => `'${dayOff}'`).join(',')}]`,
      "operator": `[${operatorArray.map(dayOff => `'${dayOff}'`).join(',')}]`
    }

    api
      .post("/scale", formData)
  }

  return (
    <Modal
      show={sundayModalOpen}
      onHide={() => setSundayModalOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{moment(selectedDate).format("DD-MM-YYYY")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-6">
            <ReactSelect
              placeholder="Frentistas"
              options={stationAttendantOptions}
              isMulti
              onChange={(value) => setSelectedStationAttendant(value)}
            />
          </div>

          <div className="col-6">
            <ReactSelect
              placeholder="Caixa"
              options={operators}
              isMulti
              onChange={(value) => setSelectedOperators(value)}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={() => setSundayModalOpen(false)}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SundayModal
