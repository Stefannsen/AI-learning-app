from langchain_core.pydantic_v1 import BaseModel, Field
from .service import get_data


class SummaryCard(BaseModel):
    title: str = Field(description='Ttilul ideii principale')
    description: str = Field(description='Descrierea ideii principale')

class Summary(BaseModel):
    data: list[SummaryCard] = Field(description='10 idei principale')

template = """
Scrie 15 informatii principale si explica-le pe scurt pentru o lectie intitulate: {title}
"""

def get_notes(text):
    return get_data(text, template, Summary)
    
