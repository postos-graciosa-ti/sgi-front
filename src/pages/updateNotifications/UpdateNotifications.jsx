import Nav from "../../components/Nav"

const Notification = (props) => {
  const { date, updates } = props

  return (
    <>
      <h5>{date && date}</h5>

      {
        updates && updates.map((update, i) => (
          <div key={`${update}-${i}`} className="alert alert-secondary" role="alert">
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
          date={"04/06/2025"}
          updates={[
            "0. Padrão: Funcionalidade sendo alterada(Partes que estão sendo alteradas)",
            "1. Processo seletivo(Correção de e-mail na emissão de redirecionamento, Adição de experiências anteriores na entrevista de RH)",
          ]}
        />

        <Notification
          date={"19/05/2025"}
          updates={[
            "1. Atualização de credenciais de acesso para coordenador Nilson",
            "2. Remoção de acesso para ex-coordenadora Gizele (solicitou desligamento)",
            "3. Adição de endereço de filial em termo de responsabilidade de grupo de WhatsApp",
            "4. Adição de campo de data em Modal de emissão de documentos",
            "5. Funcionalidade para salvar provas em processos seletivos",
            "6. Tela toda na Modal de entrevista",
            "7. Correção no campo de data na Modal de emissão de documentos",
          ]}
        />

        <Notification
          date={"15/05/2025"}
          updates={[
            "1. Verificação de erros em produção: eventos na escala",
            "2. Verificação de erros em produção: visualização de eventos em dias marcados como folga",
            "3. Verificação de erros em produção: funcionalidade de escala coletiva",
          ]}
        />

        <Notification
          date={"13/05/2025"}
          updates={[
            "1. Adição de funcionalidade crachá com aparência básica",
            "2. Adição de funcionalidade de contrato de trabalho",
            "3. Melhorias na funcionalidade de processo seletivo",
          ]}
        />

        <Notification
          date={"09/05/2025"}
          updates={[
            "1. Funcionalidade de processos seletivos (ainda em desenvolvimento)",
            "2. Adição de corretor de provas em processos seletivos > entrevista com RH",
            "3. Adição de demais provas em processos seletivos > iniciar processo seletivo",
            "4. Adaptação para dispositivos móveis",
          ]}
        />

        <Notification
          date={"08/05/2025"}
          updates={[
            "1. Funcionalidade de processos seletivos (ainda em desenvolvimento)",
          ]}
        />

        <Notification
          date={"07/05/2025"}
          updates={[
            "1. Correção de erro em produção: Script da planilha do ponto",
            "2. Adaptação da tela inicial para dispositivos móveis",
            "3. Adaptação de tela de cadastro de turnos para dispositivos móveis",
            "4. Adaptação de tela de cadastro de colaboradores para dispositivos móveis",
            "5. Adaptação de tela de cadastro de centro de custos para dispositivos móveis",
            "6. Alteração visual da impressão de crachá",
            "7. Correção de erros: carregamento de PDF no cadastro de colaboradores em produção (testes Valéria)",
            "8. Correção de erros: permitir deixar campo vazio na hora de editar (testes Valéria)",
            "9. Correção de erros: aparecer cidades na hora de editar (testes Valéria)",
          ]}
        />

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