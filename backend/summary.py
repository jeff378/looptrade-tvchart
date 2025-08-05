from fastapi import APIRouter
from datetime import datetime
import json
import os

summary_router = APIRouter()

@summary_router.get("/summary")
async def get_summary():
    return {
        "todayProfit": 123.45,
        "position": {
            "entryPrice": 29000,
            "side": "LONG",
            "entryTime": datetime.utcnow().isoformat()
        },
        "strategies": [
            {"strategy": "추세선 돌파", "status": "진입", "profit": 1.8, "entryTime": "2025-08-02T12:00:00"},
            {"strategy": "RSI 다이버전스", "status": "대기", "profit": 0.2, "entryTime": "2025-08-02T09:30:00"}
        ]
    }

def load_summary_data():
    file_path = os.path.join(os.path.dirname(__file__), "summary_data.json")
    if not os.path.exists(file_path):
        return []
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f).get("strategies", [])
