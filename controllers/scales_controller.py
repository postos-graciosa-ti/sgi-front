from pydantic import BaseModel
from database.sqlite import engine
from models.scale import Scale
from pyhints.scales import WeekScale
from sqlmodel import Session, select
from typing import List

def handle_get_week_scale(subsidiarie_id: int, request: WeekScale):
    # with Session(engine) as session:
    #     statement = select(Scale).where(Scale.subsidiarie_id == subsidiarie_id)

    #     all_scales = session.exec(statement).all()

    #     return all_scales

    return {"id": subsidiarie_id, "request": request}

def handle_get_scales_history(subsidiarie_id: int) -> List[Scale]:
    with Session(engine) as session:
        statement = select(Scale).where(Scale.subsidiarie_id)

        scales_history = session.exec(statement).all()

        return scales_history
