import printJS from 'print-js'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const InitSelectiveProcessModal = (props) => {
  const { initSelectiveProcessModalOpen, setInitSelectiveProcessModalOpen, setApplicantsList } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [applicantName, setApplicantName] = useState()

  const [functionsOptions, setFunctionsOptions] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

  const [seeExams, setSeeExams] = useState(false)

  const [exams, setExams] = useState()

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie?.value}/functions`)
      .then((response) => {
        console.log(response)

        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setFunctionsOptions(options)
      })
  }, [])

  useEffect(() => {
    if (selectedFunction) {
      if (selectedFunction.label == "Frentista I") {
        let object = { theoryExamPath: "\avaliacao_teorica_frentista.pdf", mathExamPath: "\avaliacao_matematica_frentista.pdf" }

        setExams(object)

        setSeeExams(true)
      } else {
        setExams()

        setSeeExams(false)
      }
    }
  }, [selectedFunction])

  const handleClose = () => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))

    setApplicantName()

    setSelectedFunction()

    setSeeExams(false)

    setExams()

    setInitSelectiveProcessModalOpen(false)
  }

  const handlePrint = (exam) => {
    printJS({
      printable: exam,
      type: 'pdf',
    })
  }

  const handleSubmit = () => {
    let formData = {
      name: applicantName,
      desired_function: selectedFunction.value,
    }

    api
      .post("/applicants", formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={initSelectiveProcessModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label><b>Nome completo</b></label>

          <input className="form-control" onChange={(e) => setApplicantName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label><b>Cargo pretendido</b></label>

          <ReactSelect
            placeholder={""}
            options={functionsOptions}
            onChange={(value) => setSelectedFunction(value)}
          />
        </div>

        {
          seeExams && (
            <>
              <div className="text-center mb-4 mt-5">
                <button className="btn btn-primary me-3" onClick={() => handlePrint(exams?.theoryExamPath)}>
                  Imprimir prova teórica
                </button>

                <button className="btn btn-primary" onClick={() => handlePrint(exams?.mathExamPath)}>
                  Imprimir prova de matemática
                </button>
              </div>
            </>
          )
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Concluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default InitSelectiveProcessModal