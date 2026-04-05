import os
from openai import OpenAI
from typing import List, Dict

class ChatService:
    def __init__(self):
        api_key = os.getenv("DEEPSEEK_API_KEY")
        if not api_key:
            # We'll allow initialization without key for now, but methods will fail or return mock
            print("Warning: DEEPSEEK_API_KEY not found. Chat service will not function correctly.")
            self.client = None
        else:
            self.client = OpenAI(
                api_key=api_key,
                base_url="https://api.deepseek.com"
            )

    def chat(self, message: str, history: List[Dict[str, str]] = []) -> str:
        if not self.client:
            return "Error: API key not configured. Please check backend logs."

        # Prepare messages: system prompt + history + current message
        system_prompt = {
            "role": "system",
            "content": "You are an expert AI College Counselor. You help high school students with college admissions, essay writing, finding scholarships, and career planning. Be encouraging, knowledgeable, and concise."
        }
        
        # Format history for the API
        # history is expected to be a list of {"role": "user"|"assistant", "content": "..."}
        # We limit history to last 10 messages to save context window if needed
        recent_history = history[-10:] if history else []
        
        messages = [system_prompt] + recent_history + [{"role": "user", "content": message}]

        try:
            response = self.client.chat.completions.create(
                model="deepseek-chat",
                messages=messages,
                stream=False
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Error in chat service: {e}")
            return "I apologize, but I'm having trouble connecting to my brain right now. Please try again later."

chat_service = ChatService()
