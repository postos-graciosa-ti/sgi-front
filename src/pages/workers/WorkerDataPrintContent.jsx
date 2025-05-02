import moment from "moment"

const WorkerDataPrintContent = ({ selectedWorker, selectedSubsdiarie }) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>

        <div style={{ marginLeft: '8px' }}>
          {selectedSubsdiarie?.label}
        </div>
      </div>

      <div>
        <h4>Dados pessoais</h4>
      </div>

      <div>
        <span><b>Nome</b>: {selectedWorker?.worker_name}</span>
      </div>

      <div>
        <span><b>Turno</b>: {selectedWorker?.turn_start_time} - {selectedWorker?.turn_end_time}</span>
      </div>

      <div>
        <span><b>Função</b>: {selectedWorker?.function_name}</span>
      </div>

      <div>
        <span><b>Data de admissão</b>: {moment(selectedWorker?.admission_date).format("DD-MM-YYYY")}</span>
      </div>

      <div>
        <span><b>Centro de custos</b>: {selectedWorker?.cost_center}</span>
      </div>

      <div>
        <span><b>Setor</b>: {selectedWorker?.department}</span>
      </div>
    </>
  )
}

export default WorkerDataPrintContent