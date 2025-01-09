import moment from 'moment'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'
import useUserSessionStore from '../../data/userSession'

const DeleteScaleModal = (props) => {
  const {
    deleteScaleModalOpen,
    setDeleteScaleModalOpen,
    selectedDate,
    allDaysOff,
    ilegalDaysOff,
    subsidiarieSelectedWorker,
    setDaysOff,
    setIlegalDaysOff,
    setSubsidiarieScalesList
  } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  let monthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  let monthLastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

  const handleRemoveDayOff = () => {
    let updatedIlegalDaysOff = []

    if (ilegalDaysOff) {
      updatedIlegalDaysOff = ilegalDaysOff.filter((dayOff) => dayOff != moment(selectedDate).format("DD-MM-YYYY"))
    }

    let updatedDaysOff = allDaysOff.filter((dayOff) => dayOff != moment(selectedDate).format("DD-MM-YYYY"))

    let formData = {
      "worker_id": subsidiarieSelectedWorker.value,
      "subsidiarie_id": selectedSubsdiarie.value,
      "first_day": moment(monthFirstDay).format("DD-MM-YYYY"),
      "last_day": moment(monthLastDay).format("DD-MM-YYYY"),
      "days_off": `[${updatedDaysOff.map(dayOff => `'${dayOff}'`).join(',')}]`,
      "ilegal_dates": `[${updatedIlegalDaysOff.map(ilegalDayOff => `'${ilegalDayOff}'`).join(',')}]`
    }

    api
      .post("/scales", formData)
      .then(() => {
        setDaysOff([])

        setIlegalDaysOff([])

        api
          .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
          .then((response) => {
            setSubsidiarieScalesList(response.data)
          })

        api
          .get(`/scales/subsidiaries/${selectedSubsdiarie.value}/workers/${subsidiarieSelectedWorker.value}`)
          .then((response) => {
            response.data.days_off = response.data.days_off
              .filter(dayOff => !response.data.ilegal_dates.includes(dayOff.date))
              .map(dayOff => dayOff.date);


            setDaysOff(response.data.days_off)

            setIlegalDaysOff(response.data.ilegal_dates)

            setDeleteScaleModalOpen(false)
          })
      })
  }

  return (
    <Modal
      show={deleteScaleModalOpen}
      onHide={() => setDeleteScaleModalOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Remover <b>{moment(selectedDate).format("DD-MM-YYYY")}</b> da escala?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Deseja realmente remover <b>{moment(selectedDate).format("DD-MM-YYYY")}</b> da escala?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={() => setDeleteScaleModalOpen(false)}>
          Fechar
        </Button>

        <Button variant="danger" onClick={handleRemoveDayOff}>
          Deletar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteScaleModal