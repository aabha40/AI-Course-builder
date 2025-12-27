import os
from dotenv import load_dotenv
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json


from planner.course_template import get_course_template
from services.youtube_service import fetch_youtube_videos

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI Course Builder Backend is running"}

@app.get("/course")
def generate_course(topic: str):
    sections = get_course_template(topic)

    for section in sections:
        search_query = f"{topic} DSA tutorial {section['title']}"
        section["videos"] = fetch_youtube_videos(search_query)

    return {
        "topic": topic.title(),
        "difficulty": "Beginner",
        "sections": sections
    }
@app.get("/ai/generate")
def generate_ai_content(topic: str, section: str):
    prompt = f"""
Explain the DSA topic "{topic}" focusing ONLY on "{section}"

Rules:
- Beginner friendly
- Clear explanation
- No code
- No quizzes
- Short paragraphs
"""

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "phi3:mini",
                "prompt": prompt,
                "stream": False
            },
            timeout=180  # ⏱ allow slow machines
        )

        response.raise_for_status()
        data = response.json()

        content = data.get("response", "").strip()

        if not content:
            return {"content": "No content generated."}

        return {"content": content}

    except requests.exceptions.Timeout:
        return {"content": "AI is taking too long. Try again or use a smaller topic."}

    except Exception as e:
        return {"content": f"AI error: {str(e)}"}

