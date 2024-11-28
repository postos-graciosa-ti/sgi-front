import os
from dotenv import load_dotenv
from models.user import User
from sqlmodel import Field, Session, SQLModel, create_engine, select
from database.sqlite import engine

load_dotenv()


def handle_login(user: User):
    with Session(engine) as session:
        statement = (
            select(User).where(User.email == user.email, User.password == user.password).limit(1)
        )

        user_admin = session.exec(statement).first()

        if(user_admin.password == user.password):
            return user_admin
        else:
            return {"error": "error"}


def handle_register(user: User):
    with Session(engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)
    return user
