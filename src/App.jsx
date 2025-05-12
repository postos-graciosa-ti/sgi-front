import { useState } from 'react'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import UserManualModal from './UserManualModal'

function App() {
  const [userManualModalOpen, setUserManualModalOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)

  const handleOpenUserManual = () => {
    setUserManualModalOpen(true)
  }
  
  // test

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true)
  }

  const handleOpenRegisterModal = () => {
    setRegisterModalOpen(true)
  }

  return (
    <>
      <div className="container min-vh-100 d-flex flex-column">
        <div className="mt-3 mb-3 text-center">
          <h4>SGI</h4>
          <span className="text-muted">Sistema de Gestão Integrado</span>
        </div>

        <div className="px-2 px-md-0">
          <p className="text-justify">
            Bem-vindo ao Sistema de Gestão Integrado dos Postos Graciosa. Esta plataforma foi desenvolvida para tornar a administração de pessoas mais ágil e eficiente, com uma interface intuitiva que facilita o acesso a informações dos colaboradores, gestão de ponto, benefícios e férias. Nosso objetivo é simplificar processos e garantir suporte em todas as etapas da jornada profissional, incluindo acompanhamento de treinamentos, avaliações de desempenho e comunicação interna. Acreditamos que o crescimento começa pelas pessoas, por isso investimos em ferramentas que aprimoram a gestão e criam um ambiente de trabalho mais organizado e produtivo. Nossa equipe de RH está sempre disponível para oferecer o suporte necessário.
          </p>
        </div>

        <div className="row mt-auto mb-4">
          <div className="col-12 mb-3">
            <div className="d-grid gap-2 d-md-block text-center">
              <button
                onClick={handleOpenUserManual}
                className="btn btn-danger mx-1"
              >
                Manual do Usuário
              </button>
            </div>
          </div>
          
          <div className="col-12">
            <div className="d-grid gap-2 d-md-block text-center">
              <button
                className="btn btn-primary me-md-2 mb-2 mb-md-0"
                onClick={handleOpenLoginModal}
              >
                Entrar
              </button>

              <button
                className="btn btn-secondary"
                onClick={handleOpenRegisterModal}
              >
                Cadastrar senha
              </button>
            </div>
          </div>
        </div>

        <div className="mt-auto py-3 text-center fw-bold">
          <p className="m-0 small">
            &copy; <b>Copyright</b> 2025. Posto Graciosa Ltda. <b>CNPJ: 76.608.660/0001-11</b>.
          </p>
        </div>
      </div>

      <UserManualModal
        userManualModalOpen={userManualModalOpen}
        setUserManualModalOpen={setUserManualModalOpen}
      />

      <LoginModal
        loginModalOpen={loginModalOpen}
        setLoginModalOpen={setLoginModalOpen}
      />

      <RegisterModal
        registerModalOpen={registerModalOpen}
        setRegisterModalOpen={setRegisterModalOpen}
      />
    </>
  )
}

export default App