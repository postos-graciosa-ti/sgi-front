from sqlmodel import Field, Session, SQLModel, create_engine, select

class DefaultScale(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    quantity: int = Field(default=None)
    function_id: int = Field(default=None, foreign_key="function.id")
    subsidiarie_id: int = Field(default=None, foreign_key="subsidiarie.id")
    turn_id: int = Field(default=None, foreign_key="turn.id")