import { useState } from 'react'
import LoginModal from './LoginModal'
import RecoveryPasswordModal from './RecoveryPasswordModal'
import RegisterModal from './RegisterModal'

function App() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false)

  const [loginModalOpen, setLoginModalOpen] = useState(false)

  const [recoveryPasswordModalOpen, setRecoveryPasswordModalOpen] = useState(false)

  const handleOpenRegisterModal = () => {
    setRegisterModalOpen(true)
  }

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true)
  }

  const handleOpenRecoveryPasswordModal = () => {
    setRecoveryPasswordModalOpen(true)
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

        <div>
          <button className="w-100 btn btn-light mb-3 mt-5" onClick={handleOpenRegisterModal}>
            Primeiro acesso
          </button>
        </div>

        <div>
          <button className="w-100 btn btn-primary mb-3" onClick={handleOpenLoginModal}>
            Entrar
          </button>
        </div>

        <div>
          <button className="w-100 btn btn-warning mb-3" onClick={handleOpenRecoveryPasswordModal}>
            Recuperar senha
          </button>
        </div>

        <div className="mt-auto py-3 text-center fw-bold">
          <p className="m-0 small">
            &copy; <b>Copyright</b> 2025. Posto Graciosa Ltda. <b>CNPJ: 76.608.660/0001-11</b>.
          </p>
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

      <RecoveryPasswordModal
        recoveryPasswordModalOpen={recoveryPasswordModalOpen}
        setRecoveryPasswordModalOpen={setRecoveryPasswordModalOpen}
      />
    </>
  )
}

export default App



// import React, { useEffect } from 'react';

// function App() {
//   useEffect(() => {
//     if (window && window.OneSignal) {
//       window.OneSignal = window.OneSignal || [];

//       window.OneSignal.push(() => {
//         window.OneSignal.init({
//           appId: 'a884fea7-2f84-4b09-9815-7de82198616e',
//           allowLocalhostAsSecureOrigin: true,
//         });

//         window.OneSignal.showSlidedownPrompt();

//         window.OneSignal.on('subscriptionChange', function (isSubscribed) {
//           if (isSubscribed) {
//             window.OneSignal.getUserId().then((userId) => {
//               console.log('✅ Player ID:', userId);

//               // Suponha que o user_id venha de um contexto de login
//               const user_id = 123;

//               fetch('http://localhost:8000/register-player-id', {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ user_id, player_id: userId }),
//               })
//                 .then(res => res.json())
//                 .then(data => console.log("🔄 Player ID registrado no backend", data))
//                 .catch(err => console.error("Erro ao registrar player ID", err));
//             });
//           }
//         });
//       });
//     }
//   }, []);


//   return <div>Meu App com OneSignal</div>;
// }

// export default App;
