import os

from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlmodel import Session, select

from controllers.login_controller import handle_login
from database.sqlite import create_db_and_tables, engine
from middlewares.cors_middleware import add_cors_middleware
from models.candidate import Candidate
from models.role import Role
from models.subsidiarie import Subsidiarie
from models.user import User
from seeds.seed_all import seed_roles, seed_subsidiaries


# def handle_get_users():
#     with Session(engine) as session:
#         users = session.exec(select(User)).all()
#     return users


class GetUsers(BaseModel):
    id: int
    name: str
    email: str
    role: str


def handle_get_users():
    with Session(engine) as session:
        statement = select(
            User.id,
            User.name,
            User.email,
            Role.name,
        ).join(Role, User.role_id == Role.id, isouter=True)

        results = session.exec(statement)

        users = [
            GetUsers(
                id=result[0],
                name=result[1],
                email=result[2],
                role=result[3],
            )
            for result in results
        ]

        return users
