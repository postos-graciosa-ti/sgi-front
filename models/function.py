from sqlmodel import Field, Session, SQLModel, create_engine, select

class Function(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: str = Field(index=True)