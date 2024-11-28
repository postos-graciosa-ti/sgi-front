from sqlmodel import Field, Session, SQLModel, create_engine, select

class user_subsidiaries(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(default=None, foreign_key="user.id")
    subsidiarie_id: int = Field(default=None, foreign_key="subsidiarie.id")