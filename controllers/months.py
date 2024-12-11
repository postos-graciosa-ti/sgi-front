from repository.functions import find_all
from models.month import Month

def handle_get_months():
  months = find_all(Month)

  return months