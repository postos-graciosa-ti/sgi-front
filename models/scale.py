from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import date

class Scale(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    date: date
    worker_id: Optional[int] = Field(default=None, foreign_key="worker.id")
    month_id: Optional[int] = Field(default=None, foreign_key="month.id")
