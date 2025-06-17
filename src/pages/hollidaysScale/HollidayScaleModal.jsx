import moment from 'moment'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const HollidayScaleModal = (props) => {
  const { hollidayScaleModalOpen, setHollidayScaleModalOpen, selectedHolliday, setSelectedHolliday } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [scalesList, setScalesList] = useState()

  const [workersOptions, setWorkersOptions] = useState()

  const [working, setWorking] = useState()

  const [resting, setResting] = useState()

  useEffect(() => {
    if (hollidayScaleModalOpen) {
      api
        .get(`/subsidiaries/${selectedSubsidiarie?.value}/holliday-schedule/${selectedHolliday?.date}`)
        .then((response) => setScalesList(response.data))

      api
        .get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`)
        .then((response) => {
          let options = response.data.map((option) => ({ value: option.worker_id, label: option.worker_name, isActive: option.worker_is_active }))

          let active_workers_options = options.filter((option) => option.isActive == true)

          setWorkersOptions(active_workers_options)
        })
    }
  }, [hollidayScaleModalOpen])

  const handleSubmit = () => {
    const requestBody = {
      subsidiarie_id: selectedSubsidiarie?.value,
      date: selectedHolliday?.date,
      working: JSON.stringify(working.map((work) => ({ id: work.value, name: work.label }))),
      resting: JSON.stringify(resting.map((rest) => ({ id: rest.value, name: rest.label }))),
    }

    api
      .post("/holliday-schedule", requestBody)
      .then(() => {
        api
          .get(`/subsidiaries/${selectedSubsidiarie?.value}/holliday-schedule/${selectedHolliday?.date}`)
          .then((response) => setScalesList(response.data))
      })
  }

  const handleClose = () => {
    setScalesList()

    setWorking()

    setSelectedHolliday()

    setResting()

    setHollidayScaleModalOpen(false)
  }

  return (
    <>
      <Modal
        show={hollidayScaleModalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{moment(selectedHolliday?.date).format("DD-MM-YYYY")}: {selectedHolliday?.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-3">
            <label className="form-label fw-bold">Trabalhando</label>

            <ReactSelect
              placeholder={""}
              options={workersOptions}
              isMulti={true}
              onChange={(values) => setWorking(values)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Folgando</label>

            <ReactSelect
              placeholder={""}
              options={workersOptions}
              isMulti={true}
              onChange={(values) => setResting(values)}
            />
          </div>

          {
            scalesList && (
              <div className="accordion mb-3" id="hollidayAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingWorking">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseWorking"
                      aria-expanded="true"
                      aria-controls="collapseWorking"
                    >
                      <b>Trabalhando</b>
                    </button>
                  </h2>
                  <div
                    id="collapseWorking"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingWorking"
                    data-bs-parent="#hollidayAccordion"
                  >
                    <div className="accordion-body">
                      {scalesList?.working?.map((work, index) => (
                        <div key={index}>
                          <span>{work.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingResting">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseResting"
                      aria-expanded="false"
                      aria-controls="collapseResting"
                    >
                      <b>Folgando</b>
                    </button>
                  </h2>
                  <div
                    id="collapseResting"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingResting"
                    data-bs-parent="#hollidayAccordion"
                  >
                    <div className="accordion-body">
                      {scalesList?.resting?.map((rest, index) => (
                        <div key={index}>
                          <span>{rest.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>Concluir</Button>

          <Button variant="light" onClick={handleClose}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default HollidayScaleModal