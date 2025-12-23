from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "AI Course Builder Backend is running"}

@app.get("/course")
def generate_course(topic: str):
    return {
        "topic": topic.title(),
        "difficulty": "Beginner",
        "sections": [
            {
                "title": "What is Two Pointer Technique?",
                "concept": "Two pointer technique uses two indices to traverse a data structure efficiently.",
                "videos": [],
                "quiz": [
                    "What is the main use of two pointers?",
                    "When should we use two pointer technique?"
                ],
                "exercises": [
                    "Check if array has a pair with given sum",
                    "Reverse an array using two pointers"
                ]
            }
        ]
    }
