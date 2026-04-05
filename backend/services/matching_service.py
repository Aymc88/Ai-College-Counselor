import json
import os
from typing import List, Dict, Any
from pydantic import BaseModel

# Data Models
class StudentProfile(BaseModel):
    gpa: float
    sat_score: int | None = None
    act_score: int | None = None
    intended_major: str | None = None
    max_tuition: int | None = None

class University(BaseModel):
    id: int
    name: str
    city: str
    state: str
    admission_rate: float | None
    avg_sat: int | None = None # Not always available in simple sample
    in_state_tuition: int | None
    out_of_state_tuition: int | None
    median_earnings: int | None

class MatchResult(BaseModel):
    category: str # 'Safety', 'Match', 'Reach'
    university: University
    match_score: float # 0-100 confidence

class MatchingService:
    def __init__(self, data_path: str = "scripts/college_data_sample.json"):
        self.universities = self._load_data(data_path)

    def _load_data(self, path: str) -> List[Dict[str, Any]]:
        # In a real app, this would query the database
        try:
            # Adjust path relative to where main.py is run
            real_path = os.path.join(os.path.dirname(__file__), "..", path)
            with open(real_path, 'r') as f:
                data = json.load(f)
                return data.get('results', [])
        except FileNotFoundError:
            print(f"Warning: Data file not found at {path}")
            return []

    def calculate_match(self, profile: StudentProfile) -> List[MatchResult]:
        results = []
        
        for uni_data in self.universities:
            # Parse university data
            uni = University(
                id=uni_data.get('id'),
                name=uni_data.get('school.name'),
                city=uni_data.get('school.city'),
                state=uni_data.get('school.state'),
                admission_rate=uni_data.get('latest.admissions.admission_rate.overall'),
                in_state_tuition=uni_data.get('latest.cost.tuition.in_state'),
                out_of_state_tuition=uni_data.get('latest.cost.tuition.out_of_state'),
                median_earnings=uni_data.get('latest.earnings.10_yrs_after_entry.median')
            )

            # Filter by Tuition (if specified)
            # Assuming out-of-state for simplicity unless we add state logic
            cost = uni.out_of_state_tuition or 0
            if profile.max_tuition and cost > profile.max_tuition:
                continue

            # Determine Category
            category = self._determine_category(profile, uni)
            
            if category:
                results.append(MatchResult(
                    category=category,
                    university=uni,
                    match_score=0.0 # Placeholder
                ))
        
        return results

    def _determine_category(self, profile: StudentProfile, uni: University) -> str | None:
        if not uni.admission_rate:
            return None

        # Simple heuristic based on Admission Rate
        # In a real system, we would use SAT/GPA distribution of the school
        
        rate = uni.admission_rate
        
        # Heuristic:
        # High GPA (>3.8) + High Admit Rate (>50%) -> Safety
        # High GPA (>3.8) + Low Admit Rate (<10%) -> Reach
        
        # Simplified Logic for Demo:
        if rate > 0.60:
            return "Safety"
        elif rate > 0.30:
            if profile.gpa >= 3.5:
                return "Safety"
            else:
                return "Match"
        elif rate > 0.15:
            if profile.gpa >= 3.8:
                return "Match"
            else:
                return "Reach"
        else: # Highly selective (<15%)
            return "Reach"

# Singleton instance
matching_service = MatchingService()
