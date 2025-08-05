from fastapi import APIRouter
import requests
import os
import json

alert_router = APIRouter()

@alert_router.post("/alert")
def send_strategy_alert():
    # load settings
    config_path = os.path.join("config", "user_config.json")
    if not os.path.exists(config_path):
        return {"success": False, "reason": "설정 파일 없음"}

    with open(config_path, "r", encoding="utf-8") as f:
        config = json.load(f)

    token = config.get("telegramToken")
    chat_id = config.get("chatId")

    if not token or not chat_id:
        return {"success": False, "reason": "토큰 또는 Chat ID 없음"}

    # 판단 결과 불러오기
    summary_path = os.path.join("summary_data.json")
    if not os.path.exists(summary_path):
        return {"success": False, "reason": "판단 요약 없음"}

    with open(summary_path, "r", encoding="utf-8") as f:
        summary = json.load(f)

    triggered = []
    for s in summary.get("strategies", []):
        if s.get("status") == "진입":
            triggered.append(s)

    if not triggered:
        return {"success": False, "reason": "진입 상태 전략 없음"}

    # 메시지 전송
    for s in triggered:
        text = f"""
📢 [전략 진입 알림]
전략명: {s['strategy']}
상태: {s['status']}
예상 수익률: {s['profit']}%
진입 시각: {s['entryTime']}
        """
        res = requests.post(
            f"https://api.telegram.org/bot{token}/sendMessage",
            headers={"Content-Type": "application/json"},
            data=json.dumps({"chat_id": chat_id, "text": text.strip()})
        )

    return {"success": True, "sent": len(triggered)}