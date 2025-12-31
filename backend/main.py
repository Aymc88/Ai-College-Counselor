from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
import os

load_dotenv()

from services.matching_service import matching_service, StudentProfile, MatchResult
from services.essay_service import essay_service, EssayAnalysisResult
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EssayRequest(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"message": "Welcome to AI College Counselor API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/api/match", response_model=List[MatchResult])
def match_universities(profile: StudentProfile):
    """
    Accepts a student profile and returns a list of matched universities
    categorized by Safety, Match, and Reach.
    """
    try:
        matches = matching_service.calculate_match(profile)
        return matches
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/essay/analyze", response_model=EssayAnalysisResult)
def analyze_essay(request: EssayRequest):
    """
    Analyzes a college essay and returns feedback.
    """
    try:
        result = essay_service.analyze_essay(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class ChatRequest(BaseModel):
    message: str
    history: List[dict] = []

from services.chat_service import chat_service

@app.post("/api/chat")
def chat_endpoint(request: ChatRequest):
    """
    Chat with the AI College Counselor.
    """
    try:
        response = chat_service.chat(request.message, request.history)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
