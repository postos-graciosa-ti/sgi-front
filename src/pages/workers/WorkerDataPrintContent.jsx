import dayjs from "dayjs"

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

      <div style={{ "margin": "20px" }}>
        <h4>Ficha de colaborador</h4>
      </div>

      <div style={{ "margin": "20px" }}>
        <span><b>Nome</b>: {selectedWorker?.worker_name}</span>
      </div>

      <div style={{ "margin": "20px" }}>
        <span><b>Data de nascimento</b>: {dayjs(selectedWorker?.birthdate).format("DD/MM/YYYY")}</span>
      </div>

      <div style={{ "margin": "20px" }}>
        <span><b>Data de admissão</b>: {dayjs(selectedWorker?.admission_date).format("DD/MM/YYYY")}</span>
      </div>

      <div style={{ "margin": "20px" }}>
        <span><b>RG</b>: {selectedWorker?.rg}</span>
      </div>

      <div style={{ "margin": "20px" }}>
        <span><b>CTPS</b>: {selectedWorker?.ctps}</span>
      </div>

      <div style={{ "margin": "20px" }}>
        <span><b>PIS</b>: {selectedWorker?.pis}</span>
      </div>

      <div style={{ "margin": "20px" }}>
        <span><b>CPF</b>: {selectedWorker?.cpf}</span>
      </div>

      <div style={{ "margin": "20px" }}>
        <span><b>E-social</b>: {selectedWorker?.esocial}</span>
      </div>

      {/* <div>
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
      </div> */}
    </>
  )
}

export default WorkerDataPrintContent