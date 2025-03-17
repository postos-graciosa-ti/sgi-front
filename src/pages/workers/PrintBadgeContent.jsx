const PrintBadgeContent = ({ worker, selectedSubsidiarie }) => {
  return (
    <>
      <div className="grid-container">
        <div className="grid-item">
          <div style={{ "textAlign": "center" }}>
            <img src="/logo.png" style={{ "width": "200px" }} />
          </div>

          <div style={{ "textAlign": "center" }}><b>{selectedSubsidiarie?.name}</b></div>

          <div className="trace"></div>

          <div style={{ "marginTop": "15px", "textAlign": "center" }}><b>Nome:</b></div>

          <div style={{ "textAlign": "center" }}>{worker?.worker_name}</div>

          <div style={{ "marginTop": "15px", "textAlign": "center" }}><b>Função:</b></div>

          <div style={{ "textAlign": "center" }}>{worker?.function_name}</div>
        </div>

        <div className="grid-item">
          <div style={{ "marginTop": "15px" }}><b>Filial:</b></div>

          <div>{selectedSubsidiarie?.name}</div>

          <div style={{ "marginTop": "15px" }}><b>CNPJ:</b></div>

          <div>{selectedSubsidiarie?.cnpj}</div>

          <div className="trace"></div>

          <div style={{ "marginTop": "15px" }}><b>Endereço:</b></div>

          <div>{selectedSubsidiarie?.adress}</div>

          <div style={{ "marginTop": "15px" }}><b>Telefone filial:</b></div>

          <div>{selectedSubsidiarie?.phone}</div>

          <div style={{ "marginTop": "15px" }}><b>Telefone RH:</b></div>

          <div>(47) 3436-2202</div>

          <div className="trace"></div>

          <div style={{ "marginTop": "15px" }}><b>{worker?.worker_name}</b></div>

          <div style={{ "marginTop": "15px" }}><b>{worker?.function_name}</b></div>

          <div style={{ "marginTop": "15px" }}><b>Cod. vendas: {worker?.worker_sales_code}</b></div>

          <div style={{ "marginTop": "15px" }}><b>Matrícula: {worker?.worker_enrolment}</b></div>
        </div>
      </div>

      <style>
        {
          `
            .trace {
              border-top: 2px dashed #000; /* Define a borda superior com linha tracejada */
              margin: 10px 0; /* Ajusta o espaçamento ao redor */
            }

            .grid-container {
              display: grid;
              grid-template-columns: 1fr 1fr; /* Define duas colunas de largura igual */
              gap: 20px; /* Espaçamento entre as colunas */
            }

            .grid-item {
              background-color: #f0f0f0; /* Cor de fundo para os itens */
              padding: 10px; /* Espaçamento interno */
              border: 1px solid #ccc; /* Borda para os itens */
            }
          `
        }
      </style>
    </>
  )
}

export default PrintBadgeContent