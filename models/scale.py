from sqlmodel import Field, Session, SQLModel, create_engine, select


class Scale(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    date: str = Field(index=True)
    subsidiarie_id: int = Field(default=None, foreign_key="subsidiarie.id")
    workers: str = Field(default="[]")
