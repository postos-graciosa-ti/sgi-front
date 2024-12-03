from datetime import datetime

from sqlmodel import Field, Session, SQLModel, create_engine, select


class Scale(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    date: str = Field(index=True)
    workers_ids: str = Field(default="[]")
    subsidiarie_id: int = Field(default=None, foreign_key="subsidiarie.id")
