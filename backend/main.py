from typing import Union
from fastapi import  FastAPI, HTTPException
from pydantic import BaseModel
from ai import model
from fastapi.middleware.cors import CORSMiddleware


class AiChat(BaseModel):
    message: str

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello Godwin your fast api is running"}

@app.post("/ai-chat")
async def chat_AI(data: AiChat):
    if isinstance(data.message, str) and data.message not in ["", " "]:
        response = model.generate_content(data.message)

        return {"query": data.message, "response": response.text}

    raise HTTPException(status_code=400, detail="Invalid input")
