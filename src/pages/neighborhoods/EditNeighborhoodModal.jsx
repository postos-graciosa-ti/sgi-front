import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from "../../services/api"
import StateManagedSelect from "react-select"

const EditNeighborhoodModal = (props) => {
  const { editNeighborhoodModalOpen, setEditNeighborhoodModalOpen, selectedNeighborhood, setSelectedNeighborhood, setNeighborhoods } = props

  const [citiesOptions, setCitiesOptions] = useState()

  const [selectedCity, setSelectedCity] = useState()

  const [name, setName] = useState()

  useEffect(() => {
    api
      .get("/cities")
      .then((response) => {
        let options = response.data.map((city) => ({ value: city.id, label: city.name }))

        setCitiesOptions(options)
      })
  }, [])

  const handleClose = () => {
    api
      .get("/neighborhoods")
      .then((response) => setNeighborhoods(response.data))

    setSelectedNeighborhood()

    setName()

    setSelectedCity()

    setEditNeighborhoodModalOpen(false)
  }

  console.log(selectedNeighborhood)

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      "name": name || selectedNeighborhood?.name,
      "city_id": selectedCity?.value || selectedNeighborhood?.state_id
    }

    api
      .put(`/neighborhoods/${selectedNeighborhood?.id}`, formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={editNeighborhoodModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar bairro</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <label><b>Nome</b></label>

            <input
              type="text"
              className="form-control"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
              defaultValue={selectedNeighborhood?.name}
              required
            />
          </div>

          <div className="mb-3">
            <label><b>Cidade</b></label>

            <StateManagedSelect
              options={citiesOptions}
              placeholder="Cidade"
              onChange={(value) => setSelectedCity(value)}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Fechar</Button>

          <Button type="submit" variant="success">Confirmar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default EditNeighborhoodModal