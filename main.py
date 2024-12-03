import os
import uuid
from datetime import datetime, timedelta

from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from passlib.hash import pbkdf2_sha256
from pydantic import BaseModel
from sqlmodel import Session, select, text

from database.sqlite import create_db_and_tables, engine
from middlewares.cors_middleware import add_cors_middleware
from models.candidate import Candidate
from models.candidate_status import CandidateStatus
from models.default_scale import DefaultScale
from models.function import Function
from models.jobs import Jobs
from models.role import Role
from models.scale import Scale
from models.subsidiarie import Subsidiarie
from models.turn import Turn
from models.user import User
from models.user_subsidiaries import user_subsidiaries
from models.workers import Workers
from seeds.seed_all import (
    seed_candidate_status,
    seed_database,
    seed_functions,
    seed_roles,
    seed_subsidiaries,
    seed_users,
)
from services.firebase import initialize_firebase

load_dotenv()

app = FastAPI()

bucket = initialize_firebase()

add_cors_middleware(app)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    seed_database()
    # seed_roles()
    # seed_subsidiaries()
    # seed_candidate_status()
    # seed_users()
    # seed_functions()


@app.get("/")
def docs():
    return {"docs": "acess /docs", "redocs": "access /redocs"}


# from datetime import date

# @app.get("/current_date")
# def get_current_date():
#     current_date = date.today()
#     return {"current_date": current_date}


@app.post("/default_scale")
def create_default_scale(default_scale: DefaultScale):
    with Session(engine) as session:
        session.add(default_scale)
        session.commit()
        session.refresh(default_scale)
    return default_scale


@app.get("/default_scale")
def get_default_scale():
    with Session(engine) as session:
        default_scale = session.exec(select(DefaultScale)).all()
    return default_scale


# from datetime import timedelta
# from typing import List


# @app.post("/generate_scale_6x1")
# def generate_scale_6x1():
#     with Session(engine) as session:
#         workers = session.exec(select(Workers)).all()
#         scales = []
#         for worker in workers:
#             scale = []
#             for i in range(6):
#                 day = (worker.id * 7 + i) % 7
#                 if day == 6:  # domingo
#                     scale.append(False)
#                 else:
#                     scale.append(True)
#             scales.append({"worker_id": worker.id, "scale": scale})
#         return scales


@app.get("/turns")
def get_turns():
    with Session(engine) as session:
        turns = session.exec(select(Turn)).all()
    return turns


@app.get("/workers/active/subsidiarie/{subsidiarie_id}/function/{function_id}")
def get_active_workers_by_subsidiarie_and_function(
    subsidiarie_id: int, function_id: int
):
    with Session(engine) as session:
        active_workers = session.exec(
            select(Workers).where(
                Workers.subsidiarie_id == subsidiarie_id,
                Workers.function_id == function_id,
                Workers.is_active == True,
            )
        ).all()
    return active_workers


@app.get("/functions")
def get_functions():
    with Session(engine) as session:
        functions = session.exec(select(Function)).all()
    return functions


@app.post("/workers")
def create_worker(worker: Workers):
    with Session(engine) as session:
        session.add(worker)
        session.commit()
        session.refresh(worker)
    return worker


@app.get("/workers/subsidiarie/{subsidiarie_id}")
def get_workers_by_subsidiarie(subsidiarie_id: int):
    with Session(engine) as session:
        workers = session.exec(
            select(Workers).where(Workers.subsidiarie_id == subsidiarie_id)
        ).all()
    return workers


# @app.get("/workers")
# def get_users_raw():
#     raw_query = "SELECT * FROM workers"

#     with Session(engine) as session:
#         result = session.execute(text(raw_query))
#         users = result.fetchall()
#     return users


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
        statement = select(User).where(User.email == user.email).limit(1)
        db_user = session.exec(statement).first()

        if not db_user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")

        if not pbkdf2_sha256.verify(user.password, db_user.password):
            raise HTTPException(status_code=400, detail="Senha incorreta")

        return db_user


@app.post("/users")
def create_user(user: User):
    # default_user_pwd = os.environ.get("DEFAULT_USER_PWD")

    # user.password = default_user_pwd if user.password == "1" else user.password

    with Session(engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)
    return user


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


class VerifyEmail(BaseModel):
    email: str


@app.post("/verify-email")
def verify_email(userData: VerifyEmail):
    with Session(engine) as session:
        user = session.exec(select(User).where(User.email == userData.email)).first()

    if user:
        return {"status": "true", "message": "Email existe no banco de dados."}
    else:
        return {"status": "false", "message": "Email não encontrado no banco de dados."}


class ConfirmPassword(BaseModel):
    email: str
    password: str


@app.post("/confirm-password")
def confirm_password(userData: ConfirmPassword):
    with Session(engine) as session:
        statement = select(User).where(User.email == userData.email)

        results = session.exec(statement)

        user = results.one()

        user.password = pbkdf2_sha256.hash(userData.password)

        # user.password = userData.password

        session.add(user)

        session.commit()

        session.refresh(user)

        return user


# class GetUsersBySubsidiarieId(BaseModel):
#     subsidiarie_id: int

# @app.post("/get-users-by-subsidiarie-id")
# def get_users_by_subsidiarie_id(data: GetUsersBySubsidiarieId):
#     with Session(engine) as session:
#         statement = select(User).where(User.subsidiaries_id.contains(str(data.subsidiarie_id)))

#         results = session.exec(statement)

#         users = results.all()

#     return users


class PostCandidate(BaseModel):
    name: str
    date_of_birth: str
    adress: str
    resume: str
    job_id: int


@app.post("/candidates")
def post_candidate(candidate: Candidate):
    with Session(engine) as session:
        new_candidate = Candidate(
            name=candidate.name,
            date_of_birth=candidate.date_of_birth,
            adress="candidate.adress",
            resume=candidate.resume,
            job_id=candidate.job_id,
            status=2,
        )
        session.add(new_candidate)
        session.commit()
        session.refresh(new_candidate)

    return new_candidate


class GetCandidatesByStatus(BaseModel):
    status: int


@app.get("/candidates/status/{id}")
def get_candidates_by_status(id: int):
    with Session(engine) as session:
        candidates = session.exec(select(Candidate).where(Candidate.status == id)).all()
    return candidates


def calculate_day_off(mes: int, ano: int):
    # Obter o número total de dias no mês
    dias_no_mes = (datetime(ano, mes % 12 + 1, 1) - timedelta(days=1)).day

    # Lista de todos os dias do mês
    dias_do_mes = [datetime(ano, mes, dia) for dia in range(1, dias_no_mes + 1)]

    # Identificar todos os domingos no mês
    domingos = [dia.day for dia in dias_do_mes if dia.weekday() == 6]

    # Contar as folgas regulares (a cada 6 dias)
    folgas_regulares = list(range(1, dias_no_mes + 1, 6))

    # Verificar se algum domingo já está incluído nas folgas regulares
    domingos_nao_incluidos = [
        domingo for domingo in domingos if domingo not in folgas_regulares
    ]

    # Total de folgas
    total_folgas = len(folgas_regulares) + len(domingos_nao_incluidos)

    return {
        "dias_no_mês": dias_no_mes,
        "folgas_regulares": folgas_regulares,
        "domingos": domingos,
        "domingos_não_incluidos": domingos_nao_incluidos,
        "total_de_folgas": total_folgas,
    }


# # Exemplo de uso
# mes = 12  # Dezembro
# ano = 2024
# resultado = calcular_folgas(mes, ano)

# print("Cálculo de folgas para", mes, "/", ano)
# for chave, valor in resultado.items():
#     print(f"{chave}: {valor}")


class Timedata(BaseModel):
    month: int
    year: int


@app.post("/generate-day-off")
def generate_day_off(timedata: Timedata):
    result = calculate_day_off(timedata.month, timedata.year)
    return result


@app.get("/scale/{date}")
def get_scale(date: str):
    with Session(engine) as session:
        scale = session.exec(select(Scale).where(Scale.date == date)).first()
    return scale


@app.post("/scale")
def create_scale(scale: Scale):
    with Session(engine) as session:
        session.add(scale)
        session.commit()
        session.refresh(scale)
    return scale


class WorkersInArray(BaseModel):
    arr: str


@app.post("/workers-in-array")
def workers_in_array(arr: WorkersInArray):
    user_subsidiaries = eval(arr.arr)

    subsidiaries_array = []

    for subsidiary_id in user_subsidiaries:
        with Session(engine) as session:
            statement = select(Workers).where(Workers.id == subsidiary_id)
            subsidiary = session.exec(statement).first()
        subsidiaries_array.append(subsidiary)
    return subsidiaries_array
