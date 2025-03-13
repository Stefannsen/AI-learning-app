import os
from fastapi import HTTPException
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI


def get_data(text, template, parser):
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    prompt_template = PromptTemplate.from_template(template)

    try: 
        model = ChatOpenAI(model="gpt-4o-mini", temperature=0, openai_api_key=OPENAI_API_KEY)
        structured_llm = model.with_structured_output(parser)
        chain = prompt_template | structured_llm
        response = chain.invoke({'title': text})
        return response.dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
