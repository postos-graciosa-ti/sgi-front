import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlmodel import Session, select

from database.sqlite import create_db_and_tables, engine
from middlewares.cors_middleware import add_cors_middleware
from models.candidate import Candidate
from models.role import Role
from models.subsidiarie import Subsidiarie
from models.user import User
from models.user_subsidiaries import user_subsidiaries
from seeds.seed_all import seed_roles, seed_subsidiaries
from models.jobs import Jobs

load_dotenv()

app = FastAPI()

add_cors_middleware(app)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    seed_roles()
    seed_subsidiaries()


@app.get("/")
def docs():
    return {"docs": "acess /docs", "redocs": "access /redocs"}


# jobs routes


@app.get("/jobs")
def get_jobs():
    with Session(engine) as session:
        jobs = session.exec(select(Jobs)).all()
    return jobs


@app.get("/jobs/subsidiarie/{subsidiarie_id}")
def get_jobs_by_subsidiarie(subsidiarie_id: int):
    with Session(engine) as session:
        jobs = session.exec(
            select(Jobs).where(Jobs.subsidiarie_id == subsidiarie_id)
        ).all()
    return jobs


@app.post("/jobs")
def create_job(job: Jobs):
    with Session(engine) as session:
        session.add(job)
        session.commit()
        session.refresh(job)
    return job


# @app.get("/jobs/{job_id}")
# def get_job_by_id(job_id: int):
#     with Session(engine) as session:
#         job = session.get(Jobs, job_id)
#     return job


# @app.put("/jobs/{job_id}")
# def update_job(job_id: int, job: Jobs):
#     with Session(engine) as session:
#         db_job = session.get(Jobs, job_id)

#         if db_job:
#             db_job.name = job.name
#             db_job.description = job.description
#             db_job.subsidiarie_id = job.subsidiarie_id
#             session.commit()
#             session.refresh(db_job)
#     return db_job


@app.delete("/jobs/{job_id}")
def delete_job(job_id: int):
    with Session(engine) as session:
        job = session.get(Jobs, job_id)

        if job:
            session.delete(job)
            session.commit()
    return {"message": "Job deleted successfully"}


# auth routes


@app.post("/login")
def login(user: User):
    with Session(engine) as session:
        statement = (
            select(User)
            .where(User.email == user.email, User.password == user.password)
            .limit(1)
        )

        user_admin = session.exec(statement).first()

        if user_admin.password == user.password:
            return user_admin
        else:
            return {"error": "error"}


@app.post("/users")
def create_user(user: User):
    default_user_pwd = os.environ.get("DEFAULT_USER_PWD")

    user.password = default_user_pwd if user.password == "1" else user.password

    with Session(engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)
    return user


# user routes


@app.put("/users/{user_id}")
def update_user(user_id: int, user: User):
    default_user_pwd = os.environ.get("DEFAULT_USER_PWD")

    user.password = default_user_pwd if user.password == "1" else user.password

    with Session(engine) as session:
        db_user = session.get(User, user_id)

        if db_user:
            db_user.name = user.name
            db_user.email = user.email
            db_user.password = user.password
            db_user.role_id = user.role_id
            session.add(db_user)
            session.commit()
            session.refresh(db_user)
            return db_user
        return JSONResponse(status_code=404, content={"message": "User not found"})


@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    with Session(engine) as session:
        db_user = session.get(User, user_id)

        if db_user:
            session.delete(db_user)
            session.commit()
            return {"message": "User deleted"}

        return JSONResponse(status_code=404, content={"message": "User not found"})


@app.get("/users")
def get_all_users():
    with Session(engine) as session:
        users = session.exec(select(User)).all()
    return users


@app.get("/roles")
def get_all_users():
    with Session(engine) as session:
        roles = session.exec(select(Role)).all()
    return roles


class GetUserRoles(BaseModel):
    id: int
    name: str
    email: str
    role: str


@app.get("/users_roles")
def get_users_roles():
    with Session(engine) as session:
        statement = select(
            User.id,
            User.name,
            User.email,
            Role.name,
        ).join(Role, User.role_id == Role.id, isouter=True)

        results = session.exec(statement)

        users = [
            GetUserRoles(
                id=result[0],
                name=result[1],
                email=result[2],
                role=result[3],
            )
            for result in results
        ]

        return users


# /subsidiaries


@app.get("/subsidiaries")
def get_subsidiaries():
    with Session(engine) as session:
        subsidiaries = session.exec(select(Subsidiarie)).all()
    return subsidiaries


@app.get("/users/{user_id}")
def get_user_by_id(user_id: int):
    with Session(engine) as session:
        user = session.get(User, user_id)
    return user


class Test(BaseModel):
    arr: str


# @app.post("/test")
# def test(arr: Test):
#     user_subsidiaries = eval(arr.arr)
#     subsidiaries_array = []
#     for subsidiary_id in user_subsidiaries:
#         with Session(engine) as session:
#             statement = select(Subsidiarie).where(Subsidiarie.id == subsidiary_id)
#             subsidiary = session.exec(statement).all()
#         subsidiaries_array.append(subsidiary)
#     return subsidiaries_array


@app.post("/test")
def test(arr: Test):
    user_subsidiaries = eval(arr.arr)
    subsidiaries_array = []
    for subsidiary_id in user_subsidiaries:
        with Session(engine) as session:
            statement = select(Subsidiarie).where(Subsidiarie.id == subsidiary_id)
            subsidiary = session.exec(statement).first()
        subsidiaries_array.append(subsidiary)
    return subsidiaries_array
