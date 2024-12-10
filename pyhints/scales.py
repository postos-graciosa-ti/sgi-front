from pydantic import BaseModel

class WeekScale(BaseModel):
  initialDate: str
  finalDate: str
