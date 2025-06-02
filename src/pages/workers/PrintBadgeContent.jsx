const PrintBadgeContent = ({ worker, selectedSubsidiarie }) => {
  const safeUpper = (text) => (text ? text.toString().toUpperCase() : "");

  return (
    <>
      <div className="grid-container">
        <div className="grid-item">
          <div className="text-center">
            <img src="/logo.png" style={{ width: "200px" }} />
          </div>

          <div className="text-center">
            <b>{safeUpper(selectedSubsidiarie?.name)}</b>
          </div>

          <div className="center-flex">
            {/* Pode manter essa área vazia se desejar */}
          </div>

          <div className="worker-info-bottom">
            <div><b>{safeUpper(worker?.worker_name?.split(" ")[0])}</b></div>
            <div><b>{safeUpper(worker?.function_name)}</b></div>
          </div>
        </div>

        <div className="grid-item">
          <div style={{ marginTop: "15px" }}><b>FILIAL:</b></div>
          <div>{safeUpper(selectedSubsidiarie?.name)}</div>

          <div style={{ marginTop: "15px" }}><b>CNPJ:</b></div>
          <div>{safeUpper(selectedSubsidiarie?.cnpj)}</div>

          <div className="trace"></div>

          <div style={{ marginTop: "15px" }}><b>ENDEREÇO:</b></div>
          <div>{safeUpper(selectedSubsidiarie?.adress)}</div>

          <div style={{ marginTop: "15px" }}><b>TELEFONE FILIAL:</b></div>
          <div>{safeUpper(selectedSubsidiarie?.phone)}</div>

          <div style={{ marginTop: "15px" }}><b>TELEFONE RH:</b></div>
          <div>(47) 3436-2202</div>

          <div className="trace"></div>

          <div style={{ marginTop: "15px" }}><b>{safeUpper(worker?.worker_name)}</b></div>
          <div style={{ marginTop: "15px" }}><b>{safeUpper(worker?.function_name)}</b></div>
          <div style={{ marginTop: "15px" }}><b>{`MATRÍCULA: ${safeUpper(worker?.worker_enrolment)}`}</b></div>
          <div style={{ marginTop: "15px" }}><b>{`COD. VENDAS: ${safeUpper(worker?.worker_sales_code)}`}</b></div>
          <div style={{ marginTop: "15px" }}><b>{`CÓDIGO DE PONTO: ${safeUpper(worker?.timecode)}`}</b></div>
        </div>
      </div>

      <style>
        {`
          .trace {
            border-top: 2px dashed #000;
            margin: 10px 0;
          }

          .grid-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          .grid-item {
            padding: 30px;
            border: 1px solid #ccc;
            position: relative;
          }
          
          .text-center {
            text-align: center;
          }

          .center-flex {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
            text-align: center;
            flex-direction: column;
          }

          .worker-info-bottom {
            position: absolute;
            bottom: 10px;
            width: 100%;
            text-align: center;
            font-size: 1.4rem;
          }
        `}
      </style>
    </>
  );
};

export default PrintBadgeContent;
