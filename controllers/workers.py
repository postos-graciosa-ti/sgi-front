from models.workers import Workers
from sqlmodel import Session, select
from database.sqlite import engine

def handle_get_workers_by_turn_and_subsidiarie(turn_id: int, subsidiarie_id: int):
  with Session(engine) as session:
    statement = select(Workers).where(
      Workers.turn_id == turn_id,
      Workers.subsidiarie_id == subsidiarie_id
    )

    workers = session.exec(statement).all()

  return workers