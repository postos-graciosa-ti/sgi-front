import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import CreateWorkerModal from "./CreateWorkerModal"
import getWorkersBySubsidiarie from "../../requests/getWorkersBySubsidiarie"
import useUserSessionStore from "../../data/userSession"
import DefaultScaleModal from "./DefaultScaleModal"
import ScaleModal from "./ScaleModal"

const Workers = () => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [createWorkerModalOpen, setCreateWorkerModalOpen] = useState(false)

  const setWorkersList = useUserSessionStore((state) => state.setWorkersList)

  const workersList = useUserSessionStore((state) => state.workersList)

  const [defaultScaleModalOpen, setDefaultScaleModalOpen] = useState()

  // console.log(workers)

  const [scaleModalOpen, setScaleModalOpen] = useState()

  useEffect(() => {
    getWorkersBySubsidiarie(selectedSubsdiarie.value)
      .then((response) => setWorkersList(response.data))
  }, [])

  const handleRemoveWorker = () => {

  }

  const handleGenerateScale = (name) => {
    // api
    //   .get("/teste")
    //   .then((response) => {
    //     const items = response.data.filter(item => item.name === 'nome')
    //   })
  }

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Colaboradores da filial {selectedSubsdiarie.label}</h4>

        <button
          type="button"
          className="btn btn-sm btn-primary mt-3 me-2"
          onClick={() => setCreateWorkerModalOpen(true)}
        >
          Adicionar colaborador
        </button>

        {/* <button
          className="btn btn-sm btn-primary mt-3"
          onClick={() => setDefaultScaleModalOpen(true)}
        >
          Cadastrar escala padrão
        </button> */}

        <button className="btn btn-sm btn-primary mt-3" onClick={() => setScaleModalOpen(true)}>
          Gerar escala de trabalho
        </button>

        <div className="table-responsive mt-3">
          <table className="table">
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Ativo</th>
              <th></th>
            </tr>
            {
              workersList && workersList.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.name}</td>
                  <td>{worker.function_id == 1 && "Frentista"}</td>
                  <td>{worker.is_active == true && "Sim" || "Não"}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">
                      Ver escala de funcionário
                    </button>

                    <button className="btn btn-sm btn-primary me-2">
                      Editar
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveWorker(worker)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))
            }
          </table>
        </div>
      </div>

      <CreateWorkerModal
        createWorkerModalOpen={createWorkerModalOpen}
        setCreateWorkerModalOpen={setCreateWorkerModalOpen}
      />

      {/* <DefaultScaleModal
        defaultScaleModalOpen={defaultScaleModalOpen}
        setDefaultScaleModalOpen={setDefaultScaleModalOpen}
      />

      <ScaleModal
        scaleModalOpen={scaleModalOpen}
        setScaleModalOpen={setScaleModalOpen}
      /> */}
    </>
  )
}

export default Workers