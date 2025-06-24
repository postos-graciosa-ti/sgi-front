import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import api from "../../services/api"

const checklistMap = {
  0: "foto_3x4",
  1: "conta_salario",
  2: "cartao_ideal",
  3: "cnh",
  4: "vacina_filhos",
  5: "rg",
  6: "certidao_casamento",
  7: "certidao_reservista",
  8: "certificado_nr20",
  9: "comprovante_endereco",
  10: "escolaridade",
  11: "escolaridade_filhos",
  12: "cpf",
  13: "cpf_dependentes",
  14: "ctps",
  15: "email_pessoal",
  16: "aso",
  17: "telefone_emergencia",
  18: "pensao",
  19: "pis",
  20: "uniforme",
  21: "cartao_banco_brasil",
  22: "titulo_eleitor"
}

const checklistItems = [
  "01. Foto 3x4",
  "02. Abertura de conta salário",
  "03. Cartão ideal",
  "04. Carteira de habilitação CNH",
  "05. Carteira de vacinação dos filhos menores de 05 anos (se houver)",
  "06. Cédula de identidade - RG - Cópia",
  "07. Certidão de casamento / União Estável (quando casado) - Cópia",
  "08. Certidão de reservista - Cópia",
  "09. Certificado NR20",
  "10. Comprovante de endereço",
  "11. Comprovante de escolaridade",
  "12. Comprovante de escolaridade de filhos entre 5 e 14 anos",
  "13. CPF",
  "14. CPF (filhos solteiros até 18 anos e esposa ou marido)",
  "15. CTPS - Carteira de Trabalho - Física ou Digital - Frente e Verso",
  "16. E-mail pessoal para recebimento de documentos",
  "17. Exame médico admissional – ASO original",
  "18. Nº de telefone de contato em caso de emergência",
  "19. Petição judicial para pensão alimentícia (se houver)",
  "20. PIS - Cópia",
  "21. Requerimento de uniforme (Ficha de EPI)",
  "22. Cópia do cartão do Banco do Brasil (se já possuir conta)",
  "23. Título de eleitor - Cópia"
]

const ChecklistModal = ({ checklistModalOpen, setChecklistModalOpen, workerId }) => {
  const [checkedItems, setCheckedItems] = useState({})
  const [originalCheckedItems, setOriginalCheckedItems] = useState({})
  const [checklistId, setChecklistId] = useState(null)

  // Carrega checklist do backend ao abrir modal
  useEffect(() => {
    if (!checklistModalOpen || !workerId) return

    const fetchChecklist = async () => {
      try {
        const res = await api.get(`/checklist/worker/${workerId}`)
        const checklist = res.data
        if (checklist) {
          const filledItems = {}
          Object.entries(checklistMap).forEach(([index, key]) => {
            filledItems[index] = !!checklist[key]
          })
          setCheckedItems(filledItems)
          setOriginalCheckedItems(filledItems) // salva estado original
          setChecklistId(checklist.id)
        }
      } catch (error) {
        console.error("Nenhum checklist encontrado, criando novo.")
        setCheckedItems({})
        setOriginalCheckedItems({})
        setChecklistId(null)
      }
    }

    fetchChecklist()
  }, [checklistModalOpen, workerId])

  const handleClose = () => {
    setCheckedItems({})
    setOriginalCheckedItems({})
    setChecklistId(null)
    setChecklistModalOpen(false)
  }

  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  // Compara o estado atual com o original e cria payload só com campos modificados
  const getModifiedFields = () => {
    const modified = {}

    Object.entries(checklistMap).forEach(([index, key]) => {
      const original = !!originalCheckedItems[index]
      const current = !!checkedItems[index]

      if (original !== current) {
        modified[key] = current
      }
    })

    return modified
  }

  const handleConfirm = async () => {
    const dataToSend = {
      worker_id: workerId,
      ...getModifiedFields()
    }

    try {
      if (checklistId) {
        // PATCH apenas os campos modificados
        await api.patch(`/checklist/${checklistId}`, dataToSend)
        console.log("Checklist atualizado com sucesso")
      } else {
        // cria novo checklist completo
        const fullData = { worker_id: workerId }
        Object.entries(checklistMap).forEach(([index, key]) => {
          fullData[key] = !!checkedItems[Number(index)]
        })
        await api.post("/checklist", fullData)
        console.log("Checklist criado com sucesso")
      }
    } catch (error) {
      console.error("Erro ao salvar checklist:", error)
    }

    handleClose()
  }

  return (
    <Modal show={checklistModalOpen} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Checklist de Admissão</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
        {checklistItems.map((item, index) => (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`check-${index}`}
              checked={!!checkedItems[index]}
              onChange={() => handleCheckboxChange(index)}
            />
            <label className="form-check-label" htmlFor={`check-${index}`}>
              {item}
            </label>
          </div>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>
        <Button variant="success" onClick={handleConfirm}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ChecklistModal
