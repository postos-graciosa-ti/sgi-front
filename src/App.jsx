import { useEffect, useState } from 'react'
import LoginModal from './LoginModal'
import RecoveryPasswordModal from './RecoveryPasswordModal'
import RegisterModal from './RegisterModal'
import axios from 'axios'

export function useOneSignalPlayerId() {
  const [playerId, setPlayerId] = useState("")

  useEffect(() => {
    if (!window.OneSignal) return

    window.OneSignal.push(() => {
      const init = async () => {
        const isSupported = await window.OneSignal.isPushNotificationsSupported()
        if (!isSupported) {
          console.warn("Notificações push não são suportadas.")
          return
        }

        const isEnabled = await window.OneSignal.isPushNotificationsEnabled()

        if (!isEnabled) {
          // Solicita permissão ao usuário
          await window.OneSignal.registerForPushNotifications()
        }

        const id = await window.OneSignal.getUserId()
        setPlayerId(id || "")
      }

      init()

      window.OneSignal.on('subscriptionChange', async (isSubscribed) => {
        if (isSubscribed) {
          const id = await window.OneSignal.getUserId()
          setPlayerId(id || "")
        }
      })
    })
  }, [])

  return playerId
}


function App() {
  const playerId = useOneSignalPlayerId()

  console.log(playerId)

  const [registerModalOpen, setRegisterModalOpen] = useState(false)

  const [loginModalOpen, setLoginModalOpen] = useState(false)

  const [recoveryPasswordModalOpen, setRecoveryPasswordModalOpen] = useState(false)

  useEffect(() => {
    OneSignal.getUserId().then(console.log)

    if (!window.OneSignal) return;

    window.OneSignal = window.OneSignal || [];

    window.OneSignal.push(function () {
      if (!window.OneSignalInitialized) {
        window.OneSignal.init({
          appId: "a884fea7-2f84-4b09-9815-7de82198616e",
          notifyButton: { enable: true },
          allowLocalhostAsSecureOrigin: true,
          "isAnyWebPushVisible": true
        });
        window.OneSignalInitialized = true;
      }

      window.OneSignal.on('subscriptionChange', async function (isSubscribed) {
        if (isSubscribed) {
          const userId = await window.OneSignal.getUserId();
          console.log("Player ID:", userId);
          setPlayerId(userId);
        }
      });
    });
  }, []);

  // const sendNotification = async () => {
  //   if (!playerId) return alert("ID não obtido ainda");
  //   await axios.post("http://localhost:8000/send-notification/", {
  //     player_id: playerId,
  //     title: "Notificação via OneSignal",
  //     message: "Olá! Essa veio do backend FastAPI.",
  //   });
  //   alert("Notificação enviada!");
  // };

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

        {/* <div className="mt-3 text-center">
          <button className="btn btn-success" onClick={sendNotification}>
            Enviar Notificação de Teste
          </button>
        </div> */}

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

// import { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [playerId, setPlayerId] = useState("");

//   useEffect(() => {
//     OneSignal.getUserId().then(console.log)

//     if (!window.OneSignal) return;

//     window.OneSignal = window.OneSignal || [];

//     window.OneSignal.push(function () {
//       if (!window.OneSignalInitialized) {
//         window.OneSignal.init({
//           appId: "a884fea7-2f84-4b09-9815-7de82198616e",
//           notifyButton: { enable: true },
//           allowLocalhostAsSecureOrigin: true,
//           "isAnyWebPushVisible": true
//         });
//         window.OneSignalInitialized = true;
//       }

//       window.OneSignal.on('subscriptionChange', async function (isSubscribed) {
//         if (isSubscribed) {
//           const userId = await window.OneSignal.getUserId();
//           console.log("Player ID:", userId);
//           setPlayerId(userId);
//         }
//       });
//     });
//   }, []);

//   const sendNotification = async () => {
//     if (!playerId) return alert("ID não obtido ainda");
//     await axios.post("http://localhost:8000/send-notification/", {
//       player_id: playerId,
//       title: "Notificação via OneSignal",
//       message: "Olá! Essa veio do backend FastAPI.",
//     });
//     alert("Notificação enviada!");
//   };

//   return (
//     <div>
//       <button onClick={async () => {
//         const isPushSupported = await window.OneSignal.isPushNotificationsSupported();
//         if (!isPushSupported) {
//           alert("Seu navegador não suporta notificações push.");
//           return;
//         }

//         const isSubscribed = await window.OneSignal.isPushNotificationsEnabled();
//         if (!isSubscribed) {
//           await window.OneSignal.registerForPushNotifications();
//           const userId = await window.OneSignal.getUserId();
//           console.log("Inscrito com ID:", userId);
//         } else {
//           console.log("Já está inscrito");
//         }
//       }}>
//         Ativar Notificações
//       </button>

//       <h1>Push Notification com OneSignal</h1>
//       <button onClick={sendNotification}>Enviar Notificação</button>
//     </div>
//   );
// }

// export default App;