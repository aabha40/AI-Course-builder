import requests

YOUTUBE_API_KEY = "AIzaSyAIZg5OP_IC4uipRsDMrmSihVIHn2L6CcY"
YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"

def fetch_youtube_videos(query: str, max_results: int = 2):
    params = {
        "part": "snippet",
        "q": query,
        "type": "video",
        "maxResults": max_results,
        "key": YOUTUBE_API_KEY
    }

    response = requests.get(YOUTUBE_SEARCH_URL, params=params)
    data = response.json()

    videos = []
    for item in data.get("items", []):
        video_id = item["id"]["videoId"]
        video_url = f"https://www.youtube.com/watch?v={video_id}"
        videos.append(video_url)

    return videos
