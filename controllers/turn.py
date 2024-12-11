from models.turn import Turn
from repository.functions import find_all

def handle_get_turns():
  turns = find_all(Turn)

  return turns
