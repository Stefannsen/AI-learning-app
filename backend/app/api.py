from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from .notes import get_notes
from .quiz import get_quiz


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"data": 'Home'}

@app.post("/notes")
async def notes(request: Request) -> dict:
    body = await request.json()
    return get_notes(body['data']['text'])

@app.post("/quiz")
async def quiz(request: Request) -> dict:
    body = await request.json()
    return get_quiz(body['data']['text'])
