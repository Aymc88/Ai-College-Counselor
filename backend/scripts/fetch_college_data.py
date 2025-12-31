import requests
import json
import os

# Use DEMO_KEY for testing, or replace with your own API key
API_KEY = os.getenv("COLLEGE_SCORECARD_API_KEY", "DEMO_KEY")
BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools"

def fetch_college_data():
    # Fields to fetch
    fields = [
        "id",
        "school.name",
        "school.city",
        "school.state",
        "latest.student.size",
        "latest.admissions.admission_rate.overall",
        "latest.cost.tuition.in_state",
        "latest.cost.tuition.out_of_state",
        "latest.earnings.10_yrs_after_entry.median"
    ]
    
    params = {
        "api_key": API_KEY,
        "fields": ",".join(fields),
        "per_page": 20,
        "page": 0,
        "school.degrees_awarded.predominant": 3, # Predominantly bachelor's-degree granting
    }
    
    print(f"Fetching data from {BASE_URL}...")
    response = requests.get(BASE_URL, params=params)
    
    if response.status_code == 200:
        data = response.json()
        print(f"Successfully fetched {len(data['results'])} schools.")
        
        # Save to file
        output_file = "college_data_sample.json"
        with open(output_file, "w") as f:
            json.dump(data, f, indent=2)
        print(f"Data saved to {output_file}")
        
        # Print first result as example
        if data['results']:
            print("\nSample School:")
            print(json.dumps(data['results'][0], indent=2))
    else:
        print(f"Error: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    fetch_college_data()
