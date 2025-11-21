from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to AI College Counselor API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
