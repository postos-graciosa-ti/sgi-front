from sqlmodel import Session, select, text
from database.sqlite import engine

def find_all(Model: dict):
  with Session(engine) as session:
    statement = select(Model)
    
    rows = session.exec(statement).all()

  return rows
