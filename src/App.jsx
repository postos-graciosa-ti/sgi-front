import { useState } from 'react'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

function App() {
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  const [registerModalOpen, setRegisterModalOpen] = useState(false)

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true)
  }

  const handleOpenRegisterModal = () => {
    setRegisterModalOpen(true)
  }

  return (
    <>
      <div className="container">
        <div className="mt-3">
          <h3>Sistema de gestão integrado (SGI) Postos Graciosa</h3>
        </div>

        <div>
          <p>Aqui, você encontra uma plataforma completa para tornar a administração de pessoas mais ágil e eficiente. Com uma interface intuitiva, nosso sistema facilita o acesso a informações dos colaboradores, gestão de ponto, benefícios, férias e muito mais.</p>
          <p>Nosso objetivo é simplificar processos e garantir que a equipe tenha suporte em todas as etapas da jornada profissional. Além do gerenciamento operacional, o sistema também permite acompanhamento de treinamentos, avaliações de desempenho e comunicação interna, fortalecendo o desenvolvimento e a integração dos times.</p>
          <p>Os Postos Graciosa acreditam que o crescimento começa pelas pessoas. Por isso, investimos em ferramentas que aprimoram a gestão e proporcionam um ambiente de trabalho mais organizado e produtivo. Se precisar de suporte, nossa equipe de RH está sempre à disposição para ajudar.</p>
        </div>

        <div className="text-center mt-5">
          <button
            className="btn btn-primary me-2"
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

        <div className="fixed-bottom text-center fw-bold">
          <p>&copy; 2025 Postos Graciosa. Todos os direitos reservados.</p>
        </div>

        <LoginModal
          loginModalOpen={loginModalOpen}
          setLoginModalOpen={setLoginModalOpen}
        />

        <RegisterModal
          registerModalOpen={registerModalOpen}
          setRegisterModalOpen={setRegisterModalOpen}
        />
      </div>
    </>
  )
}

export default App