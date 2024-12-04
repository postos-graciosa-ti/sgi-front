from sqlmodel import Session, select, text
from models.scale import Scale
from database.sqlite import engine
from models.workers import Workers


def is_valid_scale(workers_ids, proihbited_days):
    for worker_id in workers_ids:
        for day in proihbited_days:
            with Session(engine) as session:
                existing_scale = session.exec(
                    select(Scale).where(
                        Scale.date == day, Scale.workers_ids.contains(str(worker_id))
                    )
                ).first()
                if existing_scale:
                    worker_name = session.exec(
                        select(Workers.name).where(Workers.id == worker_id)
                    ).first()
                    return {
                        "success": False,
                        "message": f"O trabalhador {worker_name} já está escalado para o dia {day}.",
                    }
    return {
        "success": True,
        "message": "Nenhum trabalhador está escalado para os dias proibidos.",
    }
