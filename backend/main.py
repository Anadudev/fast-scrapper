from typing import Union
from fastapi import  FastAPI, HTTPException
from pydantic import BaseModel
from ai import model
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai

class AiChat(BaseModel):
    message: str
    token: int
    context: Union[str, None] = None
    title: bool = False

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
    try:
        # print(data)
        if isinstance(data.message, str):
            response = model.generate_content(
                f"using this context: {data.context} continue the conversation: {data.message} but never mention the context" if data.context else data.message,
                generation_config = genai.GenerationConfig(
                    max_output_tokens=data.token,
                    temperature=2.0,
                    )
                )
            if data.title:
                title = model.generate_content(
                    f"generate a concise and descriptive title for this: {data.message} just giv me the title and add nothing else just respond with the title only",
                    generation_config = genai.GenerationConfig(
                        max_output_tokens=100,
                        # temperature=2.0,
                        )
                    )
                return {"title": title.text,"chat":{"query": data.message, "response": response.text}}

            return {"title": "Chat bot","chat":{"query": data.message, "response": response.text}}

        raise HTTPException(status_code=400, detail="Invalid input")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal server error")
