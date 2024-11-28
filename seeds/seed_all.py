from sqlmodel import Session, select

from database.sqlite import engine
from models.role import Role
from models.subsidiarie import Subsidiarie


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
