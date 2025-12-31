import os
from openai import OpenAI
from pydantic import BaseModel
from typing import List

class EssayAnalysisResult(BaseModel):
    score: int
    strengths: List[str]
    improvements: List[str]
    general_feedback: str

class EssayService:
    def __init__(self):
        api_key = os.getenv("DEEPSEEK_API_KEY")
        if not api_key:
            raise ValueError("DEEPSEEK_API_KEY not found in environment variables. Please check your .env file.")
        
        self.client = OpenAI(
            api_key=api_key,
            base_url="https://api.deepseek.com"
        )

    def analyze_essay(self, text: str) -> EssayAnalysisResult:
        prompt = f"""
        You are an expert college admissions counselor. Analyze the following college application essay.
        Provide a score out of 100, a list of 3 key strengths, a list of 3 specific areas for improvement, and a brief general summary.
        
        Return the response in JSON format with the following keys:
        - score (integer)
        - strengths (list of strings)
        - improvements (list of strings)
        - general_feedback (string)

        Essay Text:
        {text}
        """

        try:
            response = self.client.chat.completions.create(
                model="deepseek-chat",  # DeepSeek's chat model
                messages=[
                    {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            
            content = response.choices[0].message.content
            import json
            data = json.loads(content)
            
            return EssayAnalysisResult(**data)
            
        except Exception as e:
            print(f"Error analyzing essay: {e}")
            # Return a fallback/error result or raise
            raise e

essay_service = EssayService()
