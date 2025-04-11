import moment from 'moment'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Input from '../../components/form/Input'
import Select from '../../components/form/Select'
import getParentsType from "../../requests/parentsType/getParentsType"
import getWorkersParents from "../../requests/workersParents/getWorkersParents"
import postWorkersParents from "../../requests/workersParents/postWorkersParents"

const AddWorkerParentsModal = (props) => {
  const { addWorkersParentsModalOpen, setAddWorkersParentsModalOpen, selectedWorker, setSelectedWorker } = props

  const [workersParentsList, setWorkersParentsList] = useState()

  const [parentsTypeOptions, setParentsTypeOptions] = useState()

  const [selectedParentsType, setSelectedParentsType] = useState()

  const [name, setName] = useState()

  const [cpf, setCpf] = useState()

  const [birthdate, setBirthdate] = useState()

  const [books, setBooks] = useState()

  const [papers, setPapers] = useState()

  useEffect(() => {
    getWorkersParents(selectedWorker?.worker_id)
      .then((response) => setWorkersParentsList(response?.data))

    getParentsType()
      .then((response) => {
        let options = response?.data.map((parentType) => ({ value: parentType.id, label: parentType.name }))

        setParentsTypeOptions(options)
      })
  }, [addWorkersParentsModalOpen])

  const handleClose = () => {
    setSelectedWorker()

    setSelectedParentsType()

    setName()

    setCpf()

    setBirthdate()

    setBooks()

    setPapers()

    setAddWorkersParentsModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      worker_id: selectedWorker?.worker_id,
      parent_type_id: selectedParentsType?.value,
      name: name,
      cpf: cpf,
      birthdate: birthdate,
      books: books && books,
      papers: papers && papers
    }

    postWorkersParents(formData)
      .then(() => {
        getWorkersParents(selectedWorker?.worker_id)
          .then((response) => setWorkersParentsList(response?.data))
      })
  }

  return (
    <Modal
      show={addWorkersParentsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Select
          placeholder={""}
          options={parentsTypeOptions}
          setSelectedValue={setSelectedParentsType}
          label={"Tipo de parente"}
        />

        <Input
          type={"text"}
          label={"Nome"}
          setSelectedValue={setName}
        />

        <Input
          type={"text"}
          label={"CPF"}
          setSelectedValue={setCpf}
        />

        <Input
          type={"date"}
          label={"Data de nascimento"}
          setSelectedValue={setBirthdate}
        />

        {
          selectedParentsType?.value == 3 && (
            <>
              <Input
                type={"text"}
                label={"Livros"}
                setSelectedValue={setBooks}
              />

              <Input
                type={"text"}
                label={"Folhas"}
                setSelectedValue={setPapers}
              />
            </>
          )
        }

        <div>
          <h4>Parentes</h4>
        </div>

        {
          workersParentsList?.map((parent) => (
            <>
              <hr style={{ borderTop: "2px dashed black" }} />

              <div className="mb-3">
                <label><b>Nome</b></label>

                <input className="form-control" value={parent?.name} disabled="true" />
              </div>

              <div className="mb-3">
                <label><b>CPF</b></label>

                <input className="form-control" value={parent?.cpf} disabled="true" />
              </div>

              <div className="mb-3">
                <label><b>Data de nascimento</b></label>

                <input className="form-control" value={moment(parent?.birthdate).format("DD-MM-YYYY")} disabled="true" />
              </div>

              {
                parent?.books && (
                  <>
                    <div className="mb-3">
                      <label><b>Livros</b></label>

                      <input className="form-control" value={parent?.books} disabled="true" />
                    </div>

                    <div className="mb-3">
                      <label><b>Folhas</b></label>

                      <input className="form-control" value={parent?.papers} disabled="true" />
                    </div>
                  </>
                )
              }
            </>
          ))
        }
      </Modal.Body >

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Concluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddWorkerParentsModal