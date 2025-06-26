import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { XLg } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import useUserSessionStore from '../data/userSession';
import api from '../services/api';

export const MyNotificationsModal = (props) => {
  const { myNotificationModalOpen, setMyNotificationModalOpen } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const [notificationsList, setNotificationsList] = useState()

  useEffect(() => {
    if (myNotificationModalOpen) {
      api
        .get(`/users/${userSession?.id}/custom-notifications`)
        .then((response) => {
          setNotificationsList(response.data)
        })
    }
  }, [myNotificationModalOpen])

  const handleClose = () => {
    setMyNotificationModalOpen(false)
  }

  const handleDeleteNotification = (id) => {
    api
      .delete(`/custom-notification/${id}`)
      .then(() => {
        api
          .get(`/users/${userSession?.id}/custom-notifications`)
          .then((response) => {
            setNotificationsList(response.data)
          })
      })
  }

  return (
    <Modal
      show={myNotificationModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Minhas Notificações</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {
          notificationsList && notificationsList.map((notification) => (
            <div className="card mb-3" key={notification.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">{notification.title}</h5>

                  <button
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="btn btn-light btn-sm"
                  >
                    <XLg />
                  </button>
                </div>

                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {dayjs(notification.date).format("DD-MM-YYYY")}
                </h6>

                <p className="card-text">{notification.description}</p>
              </div>
            </div>
          ))
        }

        <div className="text-muted mt-3">
          <div>
            <span>
              Não se preocupe, uma notificação chegará ao seu e-mail também
            </span>
          </div>

          <div className="text-center">
            <span>
              =)
            </span>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const SideMenu = () => {
  const navigate = useNavigate();

  const setUserSession = useUserSessionStore(state => state.setUserSession);
  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie);

  const [show, setShow] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const touchStartX = useRef(null);

  const [myNotificationModalOpen, setMyNotificationModalOpen] = useState(false)

  const openMenu = () => setShow(true);

  const closeMenu = () => {
    setShow(false);
    setOpenDropdown(null);
  };

  const handleMouseMove = (e) => {
    if (e.clientX < 30 && !show) openMenu();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const diffX = currentX - touchStartX.current;
    if (touchStartX.current < 30 && diffX > 40 && !show) openMenu();
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [show]);

  useEffect(() => {
    const interval = setInterval(() => {
      const modalIsOpen = document.querySelector('.modal.show');
      if (modalIsOpen && show) {
        closeMenu();
      }
    }, 300);
    return () => clearInterval(interval);
  }, [show]);

  const handleAlterarSenha = () => {
    console.log('Alterar minha senha clicado');
    closeMenu();
    navigate('/alterar-senha');
  };

  const handleSair = () => {
    console.log('Sair clicado');
    closeMenu();
    setUserSession({});
    navigate('/');
  };

  const handleMinhasNotificacoes = () => {
    console.log('Minhas Notificações clicado')

    setMyNotificationModalOpen(true)

    closeMenu()
    // navigate('/'); // Altere para a rota real se for diferente
  }

  const menuItems = [
    { label: 'Início', link: '/home' },
    { label: 'Minhas Notificações', link: '/' },
    { label: 'Quadro de Vagas', link: '/positions-table' },
    { label: 'Processos Seletivos', link: '/applicants' },
    {
      label: 'Metas',
      children: [
        { label: 'Critérios', link: '/indicators-criteria' },
        { label: 'Indicadores', link: '/indicators' },
      ],
    },
    {
      label: 'Chamados',
      children: [
        { label: 'Abertos por mim', link: '/requesting' },
        { label: 'Atribuídos a mim', link: '/responsible' },
      ],
    },
    {
      label: 'Escalas',
      children: [
        { label: 'Mensal', link: '/scale' },
        { label: 'Feriados', link: '/hollidays-scale' },
      ],
    },
    {
      label: 'Cadastros',
      children: [
        { label: 'Histórico de Alterações', link: '/system-log' },
        { label: 'Colaboradores', link: '/workers' },
        { label: 'Turnos', link: '/turns' },
        { label: 'Centro de Custos', link: '/cost-center' },
        { label: 'Setores', link: '/departments' },
        { label: 'Filiais', link: '/subsidiaries' },
        { label: 'Usuários', link: '/users' },
        { label: 'Funções', link: '/functions' },
        { label: 'Nacionalidades', link: '/nationalities' },
        { label: 'Estados', link: '/states' },
        { label: 'Cidades', link: '/cities' },
        { label: 'Bairros', link: '/neighborhoods' },
      ],
    },
    {
      label: 'Mais',
      children: [
        { label: 'Alterar Filial', link: '/steps' },
        { label: 'Alterar Minha Senha', link: '/alterar-senha' },
      ],
    },
    { label: 'Sair', link: '/' },
  ];

  const toggleDropdown = (idx) => {
    setOpenDropdown(openDropdown === idx ? null : idx);
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={closeMenu}
        placement="start"
        backdrop={false}
        className="bg-light"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{selectedSubsidiarie?.label}</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="p-0">
          <ul className="list-group list-group-flush">
            {menuItems.map((item, idx) => (
              <li key={idx} className="list-group-item bg-light p-0">
                {item.children ? (
                  <div>
                    <button
                      className="w-100 text-start border-0 bg-light px-3 py-2"
                      onClick={() => toggleDropdown(idx)}
                    >
                      {item.label}
                    </button>
                    {openDropdown === idx && (
                      <ul className="list-group list-group-flush ps-3">
                        {item.children.map((child, cidx) => {
                          if (child.label === 'Alterar Minha Senha') {
                            return (
                              <li key={cidx} className="list-group-item bg-light">
                                <button
                                  className="btn btn-link p-0 text-decoration-none text-dark"
                                  onClick={handleAlterarSenha}
                                  type="button"
                                >
                                  {child.label}
                                </button>
                              </li>
                            );
                          }
                          return (
                            <li key={cidx} className="list-group-item bg-light">
                              <Link
                                to={child.link}
                                className="text-decoration-none text-dark"
                                onClick={closeMenu}
                              >
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ) : item.label === 'Sair' ? (
                  <button
                    className="d-block w-100 text-start border-0 bg-light px-3 py-2 text-dark"
                    onClick={handleSair}
                    type="button"
                  >
                    {item.label}
                  </button>
                ) : item.label === 'Minhas Notificações' ? (
                  <button
                    className="d-block w-100 text-start border-0 bg-light px-3 py-2 text-dark"
                    onClick={handleMinhasNotificacoes}
                    type="button"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.link}
                    className="d-block px-3 py-2 text-decoration-none text-dark"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      <MyNotificationsModal
        myNotificationModalOpen={myNotificationModalOpen}
        setMyNotificationModalOpen={setMyNotificationModalOpen}
      />
    </>
  );
};

export default SideMenu;
