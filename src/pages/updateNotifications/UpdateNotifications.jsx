import Nav from "../../components/Nav"

const Notification = (props) => {
  const { date, updates } = props

  return (
    <>
      <h5>{date && date}</h5>

      {
        updates && updates.map((update) => (
          <div className="alert alert-secondary" role="alert">
            {update}
          </div>
        ))
      }
    </>
  )
}

const UpdateNotifications = () => {
  return (
    <>
      <Nav />

      <div className="container">
        <div>
          <h3>Histórico de alterações</h3>
        </div>

        <div>
          <p>
            Com a finalidade de que o departamento de RH e a diretoria possa acompanhar mais de perto o desenvolvimento de novas funcionalidades do SGI, criamos esse espaço para registrar e comunicar as principais atualizações realizadas no sistema.
          </p>
        </div>

        <Notification
          date={"06/05/2025"}
          updates={[
            "1. Implementação de sistema de chamados (parte de chamados atribuídos ao usuário, funcionalidade experimental)",
            "2. Implementação de sistema de chamados (parte de notificações de chamados atribuídos ao usuário, funcionalidade experimental)",
            "3. Reestruturação da página de notificações",
            "4. Notificação de coordenador que realizou avaliação de experiência de colaborador",
            "5. Correção de erro de sistema em produção: não estava buscando usuários",
            "6. Correção de erro de sistema em produção: não estava criando chamados",
            "7. Ordenação de comentários de chamados",
            "8. Script para alteração de planilhas do RH para contabilidade (parte de API)",
          ]}
        />

        <Notification
          date={"05/05/2025"}
          updates={[
            "1. Implementação de histórico de atualizações de sistema",
            "2. Tratamento de erro ao cadastrar novo bairro dentro do cadastro de colaboradores",
            "3. Página para criar, editar e excluir cidades",
            "4. Implementação de sistema de chamados (parte de chamados abertos pelo usuário, funcionalidade experimental)",
          ]}
        />
      </div>
    </>
  )
}

export default UpdateNotifications