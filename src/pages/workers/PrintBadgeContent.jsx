const PrintBadgeContent = ({ worker, selectedSubsidiarie }) => {
  return (
    <>
      <div className="grid-container">
        <div className="grid-item">
          <div className="badge-wrapper">
            <div className="badge-slot"></div>

            <div className="badge-logo">
              <img src="/logo.png" alt="Petrobras Logo" />
            </div>

            <div className="badge-stripes"></div>

            <div className="badge-bottom">
              <div className="worker-name">
                {worker?.worker_name || "Nome"}
              </div>

              <div className="worker-role">
                {worker?.function_name || "Cargo"}
              </div>
            </div>
          </div>
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

          <div style={{ "marginTop": "15px" }}><b>Matrícula: {worker?.worker_enrolment}</b></div>

          <div style={{ "marginTop": "15px" }}><b>Cod. vendas: {worker?.worker_sales_code}</b></div>

          <div style={{ "marginTop": "15px" }}><b>Código de ponto: {worker?.timecode}</b></div>
        </div>
      </div>

      <style>
        {`
          .grid-container {
            display: grid;
            grid-template-columns: 1fr 1fr; /* Define duas colunas de largura igual */
            gap: 20px; /* Espaçamento entre as colunas */
          }

          .grid-item {
            padding: 10px; /* Espaçamento interno */
            border: 1px solid #ccc; /* Borda para os itens */
          }

          .trace {
            border-top: 2px dashed #000; /* Define a borda superior com linha tracejada */
            margin: 10px 0; /* Ajusta o espaçamento ao redor */
          }

          .badge-wrapper {
            width: 320px;
            height: 500px;
            border: 1px solid #ccc;
            border-radius: 12px;
            font-family: Arial, sans-serif;
            background-color: white;
            overflow: hidden;
            position: relative;
          }

          .badge-slot {
            width: 80px;
            height: 8px;
            background-color: #ccc;
            border-radius: 4px;
            position: absolute;
            top: 12px;
            left: 50%;
            transform: translateX(-50%);
          }

          .badge-logo {
            text-align: center;
            margin-top: 40px;
          }

          .badge-logo img {
            height: 32px;
          }

          .badge-stripes {
            position: relative;
            height: 120px;
            background-image: repeating-linear-gradient(
              to bottom,
              #ffffff 0px,
              #ffffff 5px,
              #fdd835 5px,
              #fdd835 10px,
              #388e3c 10px,
              #388e3c 15px
            );
          }

          .badge-photo {
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 100px;
            background-color: white;
            border: 4px solid white;
            box-shadow: 0 0 4px rgba(0,0,0,0.2);
          }

          .badge-photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .badge-bottom {
            background-color: #007f3e;
            color: white;
            text-align: center;
            padding: 40px 20px;
            height: 100%;
          }

          .worker-name {
            font-size: 20px;
            font-weight: bold;
            line-height: 1.4;
          }

          .worker-role {
            margin-top: 10px;
            font-style: italic;
            font-size: 14px;
          }
        `}
      </style>
    </>
  )
}

export default PrintBadgeContent