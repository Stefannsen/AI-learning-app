from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .app_package.notes import get_notes
from .app_package.quiz import get_quiz


app = FastAPI()

# origins = [
#     "http://localhost:3000",
#     "localhost:3000",
#     "https://ai-learning-app-a673.vercel.app/",
#     "ai-learning-app-a673.vercel.app/"
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
