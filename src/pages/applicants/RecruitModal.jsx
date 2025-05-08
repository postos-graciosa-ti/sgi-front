import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'
import useUserSessionStore from '../../data/userSession'

const RecruitModal = (props) => {
  const { recruitModalOpen, setRecruitModalOpen } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [subsidiariesList, setSubsidiariesList] = useState()

  const [functionsList, setFunctionsList] = useState()

  useEffect(() => {
    api
      .get(`/subsidiaries`)
      .then((response) => {
        let options = response.data.map((subsidiarie) => ({ value: subsidiarie.id, label: subsidiarie.name }))

        setSubsidiariesList(options)
      })

    api
      .get(`/subsidiaries/${selectedSubsidiarie?.value}/functions`)
      .then((response) => {
        let options = response.data.map((func) => ({ value: func.id, label: func.name }))

        setFunctionsList(options)
      })
  }, [])

  const handleClose = () => {
    setRecruitModalOpen(false)
  }

  return (
    <Modal
      show={recruitModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Efetivar</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="mb-1"><b>Filial</b></label>

          <ReactSelect
            placeholder={""}
            options={subsidiariesList}
          />
        </div>

        <div className="mb-3">
          <label className="mb-1"><b>Função</b></label>

          <ReactSelect
            placeholder={""}
            options={functionsList}
          />
        </div>

        <div className="mb-3">
          <label className="mb-1"><b>Turno</b></label>

          <ReactSelect
            placeholder={""}
            options={functionsList}
          />
        </div>

        <div className="mb-3">
          <label className="mb-1"><b>Centro de custos</b></label>

          <ReactSelect
            placeholder={""}
            options={functionsList}
          />
        </div>

        <div className="mb-3">
          <label className="mb-1"><b>Setor</b></label>

          <ReactSelect
            placeholder={""}
            options={functionsList}
          />
        </div>

        <div className="mb-3">
          <label className="mb-1"><b>Data de admissão</b></label>

          <input
            type='date'
            className="form-control"
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success">Concluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RecruitModal