from sqlmodel import Field, Session, SQLModel, create_engine, select

class Candidate(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    date_of_birth: str = Field(index=True)
    adress: str = Field(index=True)
    resume: str = Field(index=True)
    status: int = Field(foreign_key="candidatestatus.id", nullable=True)
    job_id: int = Field(default=None, foreign_key="jobs.id")