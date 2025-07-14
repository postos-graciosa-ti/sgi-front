import { useState } from 'react'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

const App = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState(false)

  const [loginModalOpen, setLoginModalOpen] = useState(false)

  const handleOpenRegisterModal = () => {
    setRegisterModalOpen(true)
  }

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true)
  }

  return (
    <>
      <div className="container">
        <div className="text-center mt-5">
          <h4>SGI</h4>

          <p className="text-muted">Sistema de Gestão Integrado</p>
        </div>

        <div className="mt-5 mb-3">
          <a
            href="/sgi-docs.html"
            className="btn btn-primary w-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            Manual do usuário
          </a>
        </div>

        <div className="mb-3">
          <button className="btn btn-primary w-100" onClick={handleOpenRegisterModal}>
            Primeiro acesso
          </button>
        </div>

        <div>
          <button className="btn btn-primary w-100" onClick={handleOpenLoginModal}>
            Entrar
          </button>
        </div>
      </div>

      <RegisterModal
        registerModalOpen={registerModalOpen}
        setRegisterModalOpen={setRegisterModalOpen}
      />

      <LoginModal
        loginModalOpen={loginModalOpen}
        setLoginModalOpen={setLoginModalOpen}
      />
    </>
  )
}

export default App