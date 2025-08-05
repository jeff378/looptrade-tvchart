from fastapi import APIRouter
from pydantic import BaseModel
import json
import os

settings_router = APIRouter()
CONFIG_PATH = os.path.join("config", "user_config.json")

class SettingsData(BaseModel):
    telegramToken: str
    chatId: str
    bybitKey: str
    bybitSecret: str

@settings_router.get("/settings")
async def get_settings():
    if not os.path.exists(CONFIG_PATH):
        return {}
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

@settings_router.post("/settings")
async def save_settings(data: SettingsData):
    os.makedirs("config", exist_ok=True)
    with open(CONFIG_PATH, "w", encoding="utf-8") as f:
        json.dump(data.dict(), f, indent=2, ensure_ascii=False)
    return {"success": True}