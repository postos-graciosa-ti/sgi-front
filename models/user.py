from sqlmodel import Field, Session, SQLModel, create_engine, select, Relationship
from typing import List
from models.subsidiarie import Subsidiarie

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(index=True, nullable=False)
    password: str = Field(index=True, nullable=True)
    name: str = Field(index=True)
    role_id: int = Field(default=None, foreign_key="role.id")
    subsidiaries_id: str = Field(default="[]")