from fastapi import APIRouter
from pydantic import BaseModel
import json
import os

strategies_router = APIRouter()
STRATEGY_PATH = os.path.join("config", "strategies.json")

class StrategyItem(BaseModel):
    name: str
    condition: str
    winRate: float
    enabled: bool
    priority: int

@strategies_router.get("/strategies")
async def get_strategies():
    if not os.path.exists(STRATEGY_PATH):
        return [
            {
                "name": "추세선 돌파",
                "condition": "3번 터치 후 볼밴 확장",
                "winRate": 70.2,
                "enabled": True,
                "priority": 1
            },
            {
                "name": "RSI 다이버전스",
                "condition": "쌍바닥 + 캔들 반전",
                "winRate": 65.8,
                "enabled": False,
                "priority": 2
            }
        ]
    with open(STRATEGY_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

@strategies_router.post("/strategies/update")
async def update_strategy(item: StrategyItem):
    os.makedirs("config", exist_ok=True)
    strategies = []
    if os.path.exists(STRATEGY_PATH):
        with open(STRATEGY_PATH, "r", encoding="utf-8") as f:
            strategies = json.load(f)

    for i, s in enumerate(strategies):
        if s["name"] == item.name:
            strategies[i] = item.dict()
            break
    else:
        strategies.append(item.dict())

    with open(STRATEGY_PATH, "w", encoding="utf-8") as f:
        json.dump(strategies, f, indent=2, ensure_ascii=False)

    return {"success": True}