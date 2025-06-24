import { useEffect, useRef, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useUserSessionStore from '../data/userSession';

const SideMenu = () => {
  const navigate = useNavigate()

  const setUserSession = useUserSessionStore(state => state.setUserSession)

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [show, setShow] = useState(false)

  const [openDropdown, setOpenDropdown] = useState(null)

  const touchStartX = useRef(null)

  const openMenu = () => setShow(true)

  const closeMenu = () => {
    setShow(false)

    setOpenDropdown(null)
  }

  const handleMouseMove = (e) => {
    if (e.clientX < 30 && !show) openMenu()
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX

    const diffX = currentX - touchStartX.current

    if (touchStartX.current < 30 && diffX > 40 && !show) openMenu()
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    window.addEventListener('touchstart', handleTouchStart)

    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)

      window.removeEventListener('touchstart', handleTouchStart)

      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [show])

  const handleAlterarSenha = () => {
    console.log('Alterar minha senha clicado')

    closeMenu()
  }

  const handleSair = () => {
    console.log('Sair clicado')

    closeMenu()

    setUserSession({})

    navigate('/')
  }

  const menuItems = [
    { label: 'Início', link: '/home' },
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
  ]

  const toggleDropdown = (idx) => {
    setOpenDropdown(openDropdown === idx ? null : idx)
  }

  return (
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
                        // Interceptando clique "Alterar Minha Senha"
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
              ) : (
                // Interceptando clique "Sair"
                item.label === 'Sair' ? (
                  <button
                    className="d-block w-100 text-start border-0 bg-light px-3 py-2 text-dark"
                    onClick={handleSair}
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
                )
              )}
            </li>
          ))}
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default SideMenu
