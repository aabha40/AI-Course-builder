def get_course_template(topic: str):
    return [
        {
            "title": f"Introduction to {topic.title()}",
            "concept": f"Overview of {topic} and why it is used in DSA.",
            "videos": [],
            "quiz": [
                f"What problem does {topic} solve?",
                f"When should {topic} be used?"
            ],
            "exercises": []
        },
        {
            "title": "Core Concept",
            "concept": f"Detailed explanation of how {topic} works.",
            "videos": [],
            "quiz": [
                "What are pointers or indices?",
                "How does pointer movement work?"
            ],
            "exercises": [
                "Implement basic two pointer traversal"
            ]
        },
        {
            "title": "Common Patterns",
            "concept": f"Recognizing patterns where {topic} is applicable.",
            "videos": [],
            "quiz": [
                "How to identify a two pointer problem?"
            ],
            "exercises": [
                "Find pair with target sum",
                "Remove duplicates from sorted array"
            ]
        },
        {
            "title": "Classic Problems",
            "concept": "Frequently asked interview problems.",
            "videos": [],
            "quiz": [],
            "exercises": [
                "Container with most water",
                "Trapping rain water"
            ]
        },
        {
            "title": "Interview Mistakes",
            "concept": "Common mistakes candidates make during interviews.",
            "videos": [],
            "quiz": [
                "What is the biggest mistake in pointer movement?"
            ],
            "exercises": []
        }
    ]
