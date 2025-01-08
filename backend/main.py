from typing import Union
from fastapi import  FastAPI, HTTPException
from pydantic import BaseModel
from ai import model

class AiChat(BaseModel):
    message: str

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello Godwin your fast api is running"}

@app.post("/ai-chat")
async def chat_AI(data: AiChat):
    if isinstance(data.message, str) and data.message not in ["", " "]:
        response = model.generate_content(data.message)
        # print(response.text)
        return {"response": response.text}

    raise HTTPException(status_code=400, detail="Invalid input")
