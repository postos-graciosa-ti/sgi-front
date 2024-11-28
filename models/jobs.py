from sqlmodel import Field, SQLModel


class Jobs(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: str = Field(index=True)
    subsidiarie_id: int = Field(default=None, foreign_key="subsidiarie.id")
