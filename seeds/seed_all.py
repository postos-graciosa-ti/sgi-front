from passlib.hash import pbkdf2_sha256
from sqlmodel import Session, select

from database.sqlite import engine
from models.candidate_status import CandidateStatus
from models.function import Function
from models.role import Role
from models.subsidiarie import Subsidiarie
from models.turn import Turn
from models.user import User


def seed_roles():
    with Session(engine) as session:
        existing_roles = session.exec(select(Role)).all()
        if not existing_roles:
            roles = [Role(name="Admin"), Role(name="User")]
            session.add_all(roles)
            session.commit()


def seed_subsidiaries():
    with Session(engine) as session:
        existing_subsidiaries = session.exec(select(Subsidiarie)).all()
        if not existing_subsidiaries:
            subsidiaries = [
                Subsidiarie(
                    name="Posto Graciosa - Matriz",
                    adress="R. Florianópolis, 510 – Itaum, Joinville – SC, 89207-000",
                    phone="(47) 3436-0030",
                    email="matriz@postosgraciosa.com.br",
                ),
                Subsidiarie(
                    name="Auto Posto Fátima",
                    adress="R. Fátima, 1730 – Fátima, Joinville – SC, 89229-102",
                    phone="(47) 3466-0248",
                    email="fatima@postosgraciosa.com.br",
                ),
                Subsidiarie(
                    name="Posto Bemer",
                    adress="R. Boehmerwald, 675 – Boehmerwald, Joinville – SC, 89232-485",
                    phone="(47) 3465-0328",
                    email="bemer@postosgraciosa.com.br",
                ),
                Subsidiarie(
                    name="Posto Jariva",
                    adress="R. Monsenhor Gercino, 5085 – Jarivatuba, Joinville – SC, 89230-290",
                    phone="(47) 3466-4665",
                    email="jariva@postosgraciosa.com.br",
                ),
                Subsidiarie(
                    name="Posto Graciosa V",
                    adress="R. Santa Catarina, 1870 – Floresta, Joinville – SC, 89212-000",
                    phone="(47) 3436-1763",
                    email="graciosav@postosgraciosa.com.br",
                ),
                Subsidiarie(
                    name="Auto Posto Piraí",
                    adress="R. Quinze de Novembro, 5031 – Vila Nova, Joinville – SC, 89237-000",
                    phone="(47) 3422-9676",
                    email="pirai@postosgraciosa.com.br",
                ),
            ]
            session.add_all(subsidiaries)
            session.commit()


def seed_candidate_status():
    with Session(engine) as session:
        existing_candidate_status = session.exec(select(CandidateStatus)).all()
        if not existing_candidate_status:
            candidate_status = [
                CandidateStatus(name="Cadastrado"),
                CandidateStatus(name="Primeira Entrevista"),
                CandidateStatus(name="Segunda Entrevista"),
                CandidateStatus(name="Aguardando Exame Médico"),
                CandidateStatus(name="Contratado"),
            ]
            session.add_all(candidate_status)
            session.commit()


def seed_users():
    with Session(engine) as session:
        existing_users = session.exec(select(User)).all()
        if not existing_users:
            users = [
                User(
                    email="administrador@gmail.com",
                    password=pbkdf2_sha256.hash("teste"),
                    name="Administrador",
                    role_id=1,
                    subsidiaries_id="[1,2,3]",
                ),
                User(
                    email="analistaderh@gmail.com",
                    password=pbkdf2_sha256.hash("teste"),
                    name="Analista de RH",
                    role_id=2,
                    subsidiaries_id="[1,2,3]",
                ),
            ]
            session.add_all(users)
            session.commit()


def seed_functions():
    with Session(engine) as session:
        existing_functions = session.exec(select(Function)).all()
        if not existing_functions:
            functions = [
                Function(
                    name="Frentista",
                    description="Atendimento ao cliente no posto de combustível",
                ),
                Function(
                    name="Caixa",
                    description="Responsável por realizar transações financeiras no caixa",
                ),
            ]
            session.add_all(functions)
            session.commit()


def seed_turns():
    with Session(engine) as session:
        existing_turns = session.exec(select(Turn)).all()
        if not existing_turns:
            turns = [
                Turn(name="Manhã", time="08:00-12:00"),
                Turn(name="Noite", time="14:00-18:00"),
            ]
            session.add_all(turns)
            session.commit()


def seed_database():
    seed_roles()
    seed_subsidiaries()
    seed_candidate_status()
    seed_users()
    seed_functions()
    seed_turns()