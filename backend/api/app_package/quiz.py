from langchain_core.pydantic_v1 import BaseModel, Field
import random
from .service import get_data


class Option(BaseModel):
    text: str = Field(description='Varianta de raspuns')
    is_correct: bool = Field(description='Is true if this is the correct answer')

class Question(BaseModel):
    question: str = Field(description='Intrebare')
    option_1: Option = Field(description='Optiunea 1')
    option_2: Option = Field(description='Optiunea 2')
    option_3: Option = Field(description='Optiunea 3')
    option_4: Option = Field(description='Optiunea 4')

class Quiz(BaseModel):
    data: list[Question] = Field(description='10 intrebari cu 4 variante de raspuns dintre care numai 1 corecta')

template = """
Scrie 10 intrebari si variante de raspuns pentru lectia cu titlul: {title}\n
Optiunea corecta trebuie alease la intamplare in una din cele 4 optiuni.
"""

def shuffle_options(response):
  for question in response['data']:
      options = [question['option_1'], question['option_2'], question['option_3'], question['option_4']]
      random.shuffle(options)
      question['option_1'], question['option_2'], question['option_3'], question['option_4'] = options
  return response

def get_quiz(text):
    response = get_data(text, template, Quiz)
    adapted_response = shuffle_options(response)
    return adapted_response