import requests
import json

# Sample essay text
essay_text = """
Growing up in a small town, I always dreamed of making a difference. 
My passion for computer science began when I built my first website at age 12.
Since then, I've dedicated myself to learning programming and helping my community
through technology. Last year, I created an app that helped local farmers track
their crop yields, which increased their productivity by 15%. This experience
taught me that technology isn't just about code—it's about improving people's lives.
"""

# Test the API
response = requests.post(
    "http://localhost:8000/api/essay/analyze",
    json={"text": essay_text},
    headers={"Content-Type": "application/json"}
)

print(f"Status Code: {response.status_code}")
print(f"\nResponse:")
print(json.dumps(response.json(), indent=2))
